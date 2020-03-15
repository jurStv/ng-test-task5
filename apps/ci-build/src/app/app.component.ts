import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BuildStage, BuildStep } from '@ci-build/models';
import { compose, concat, isNil, not, pathOr } from 'ramda';
import { BehaviorSubject, combineLatest, interval, Observable, of, Subject } from 'rxjs';
import { delay, distinctUntilChanged, filter, map, mapTo, scan, shareReplay, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { animateBuildSteps, initialStepAnimation } from './app.animations';
import { HeaderComponent } from './components/header/header.component';
import { BuildProgressService, IconsService } from './services';
import { ViewportSizeService } from './viewport-size';
import { defined, toTimePeriod } from './utils';

type detailsContentType = 'output';

@Component({
  selector: 'ci-build-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [animateBuildSteps, initialStepAnimation],
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  buildChange$: Observable<BuildStage>;
  buildLog$: Observable<string[]>;
  selectedStep$: Observable<BuildStep>;
  selectedStepLog$: Observable<string[]>;
  loading$: Observable<boolean>;
  startTimePeriod$: Observable<number>;
  selectedStepIndex: number;
  topOffset = '0px';
  // Defines the type of content for build details pane
  detailsOpened: detailsContentType | null = null;
  restartingBuild = false;
  stoppingBuild = false;
  private selectedStepIndex$ = new BehaviorSubject<number>(null);
  private _destroys$ = new Subject<void>();
  @ViewChild(HeaderComponent, { read: ElementRef }) private headerEl: ElementRef<HTMLElement>;

  // Defines if build details pane is shown
  get detailsShown() {
    return Boolean(this.detailsOpened) || defined(this.selectedStepIndex);
  }

  // Defines whether selected step logs or overall build logs
  // should be shown on build details output pane
  get buildDetailsOutput$() {
    return defined(this.selectedStepIndex) ? this.selectedStepLog$
      : this.detailsOpened === 'output' ? this.buildLog$
      : of([]);
  }

  constructor(
    private readonly buildProgress: BuildProgressService,
    private readonly viewport: ViewportSizeService,
    private readonly cd: ChangeDetectorRef,
    readonly icons: IconsService,
  ) {}

  ngOnInit() {
    // Stream of build events that happens
    this.buildChange$ = this.buildProgress.stageStatusChanges();
    // Stream of time periods, used by interval$ pipe
    this.startTimePeriod$ = this.buildChange$.pipe(
      switchMap(({data: {started}}) => interval(1000).pipe(
        mapTo(started),
      )),
      filter(defined),
      map(toTimePeriod(3)),
      distinctUntilChanged(),
      shareReplay(1),
    );
    // Stream of selected step logs
    this.selectedStepLog$ = this.selectedStepIndex$.asObservable().pipe(
      distinctUntilChanged(),
      filter(defined),
      switchMap((stepIndex) => this.buildProgress.stepLogsReceives(stepIndex).pipe(
        scan<string[], string[]>(concat, []),
      )),
    );
    // Stream of selected steps
    this.selectedStep$ = combineLatest([this.buildChange$, this.selectedStepIndex$.asObservable()]).pipe(
      map(([{steps}, index]) => steps[index] || null),
      distinctUntilChanged(),
    );
    // Stream of loading events
    this.loading$ = this.buildChange$.pipe(
      map(compose(not)),
      startWith(true),
      distinctUntilChanged(),
    );
    this.createAllBuildLogsStream();

    // Starts the build
    this.buildProgress.initialize();
    this.buildChange$.pipe(
      takeUntil(this._destroys$),
      tap((build) => {
        if (this.restartingBuild && build.data.started) {
          this.restartingBuild = false;
          // Build logs should be refreshed after build restart
          this.createAllBuildLogsStream();
        }
        if (this.stoppingBuild && build.data.finished) {
          this.stoppingBuild = false;
        }
      })
    ).subscribe();
  }

  ngAfterViewInit() {
    // Reset top offset on each scrreen size change
    this.viewport.viewportSize$.pipe(
      takeUntil(this._destroys$),
      delay(300),
      tap(() => this.updateTopOffest()),
    ).subscribe();
  }

  ngOnDestroy() {
    this._destroys$.next();
  }

  private createAllBuildLogsStream() {
    // Stream of overall build logs
    this.buildLog$ = this.buildProgress.buildLogsReceives().pipe(
      scan<string[], string[]>(concat, []),
      shareReplay(1),
    );
  }

  /* Reset padding top of content container */
  private updateTopOffest() {
    const height = pathOr(0, ['nativeElement', 'clientHeight'], this.headerEl);
    this.topOffset = `${height}px`;

    this.cd.detectChanges();
  }

  /* Utility method used by *ngFor */
  trackByIndex(index) {
    return index;
  }

  /* Trigger selected step */
  selectStep(index: number | null) {
    this.selectedStepIndex = index;
    this.openOutputDetails();
    this.selectedStepIndex$.next(index);
  }

  /* Stop build */
  stopBuild() {
    if (this.stoppingBuild) {
      return;
    }
    this.buildProgress.stopBuild();
    this.stoppingBuild = true;
  }

  /* Restart build */
  restartBuild() {
    if (this.restartingBuild) {
      return;
    }
    this.closeDetails();
    this.buildProgress.restartBuild();
    this.restartingBuild = true;
  }

  /* Closes build details */
  closeDetails() {
    this.detailsOpened = null;
    this.selectedStepIndex = null;
    this.selectedStepIndex$.next(null);
  }

  /* Opens build details output pane */
  openOutputDetails() {
    this.detailsOpened = 'output';
  }
}
