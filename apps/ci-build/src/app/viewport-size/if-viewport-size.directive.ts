import { Directive, ViewContainerRef, TemplateRef, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

import { ViewportSizeService } from './viewport-size.service';
import { ViewportSize } from './interfaces';

@Directive({
  selector: '[ciBuildIfViewportSize]',
})
export class IfViewportSizeDirective implements OnInit, OnDestroy {
  private sizeSetting: ViewportSize[];
  private currentSize: ViewportSize;
  private dirSubscriptions: Subscription[] = [];

  @Input()
  set ciBuildIfViewportSize(size: string) {
    this.sizeSetting = size.split(',') as ViewportSize[];

    this.updateView();
  }

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private viewportSizeService: ViewportSizeService,
  ) {}

  ngOnInit() {
    const subscription = this.viewportSizeService.viewportSize$.pipe(
      tap((viewportSize) => {
        this.currentSize = viewportSize;
        this.updateView();
      }),
    ).subscribe();
    this.dirSubscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.dirSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private updateView() {
    if (!this.sizeSetting || !this.currentSize) {
      return;
    }
    const sizeMatched = this.sizeSetting.includes(this.currentSize);

    this.viewContainer.clear();
    if (sizeMatched) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
