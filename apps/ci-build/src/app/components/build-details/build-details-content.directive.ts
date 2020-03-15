import { Directive, HostBinding, ElementRef, HostListener, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { ContentObserver } from '@angular/cdk/observers';
import { Subject } from 'rxjs';
import { debounceTime, tap, takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[ciBuildDetailsContent]'
})
export class BuildDetailsContentDirective implements AfterViewInit, OnDestroy {
  @HostBinding('class.build-details__content') className = true;
  @Input() disableAutoscroll = false;
  private _destroy$ = new Subject();
  private sticky = true;

  get scrollBottomOffset() {
    const { scrollHeight, scrollTop, clientHeight } = this.elRef.nativeElement;
    return scrollHeight - scrollTop - clientHeight;
  }

  constructor(
    private readonly elRef: ElementRef<HTMLElement>,
    private readonly contentObserver: ContentObserver,
  ) {}

  ngAfterViewInit() {
    this.scrollToBottom();
    this.contentObserver.observe(this.elRef).pipe(
      debounceTime(100),
      tap(() => this.scrollToBottom()),
      takeUntil(this._destroy$),
    ).subscribe();
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

  @HostListener('scroll')
  onScroll() {
    this.sticky = this.scrollBottomOffset === 0;
  }

  scrollToBottom() {
    if (!this.sticky || this.disableAutoscroll) {
      return;
    }
    const { scrollHeight } = this.elRef.nativeElement;
    this.elRef.nativeElement.scrollTo({ top: scrollHeight });
  }
}
