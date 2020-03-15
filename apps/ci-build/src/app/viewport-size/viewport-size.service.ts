import { Injectable, Inject } from '@angular/core';
import { Observable, BehaviorSubject, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { broadcastTo } from '../utils';
import { ViewportSize, IViewportConfig } from './interfaces';
import { calculateViewportSize } from './utils';
import { VIEWPORT_CONFIG_TOKEN, WINDOW_RESIZE_DEBOUNCE_TIME } from './constants';

const nativeWindow: Window = window;
const getWindowWidth = () => nativeWindow.innerWidth;

@Injectable({
  providedIn: 'root',
})
export class ViewportSizeService {
  viewportSize$: Observable<ViewportSize>;

  constructor(@Inject(VIEWPORT_CONFIG_TOKEN) private config: IViewportConfig) {
    // partial application of calculateViewportSize function
    const _calculateViewportSize: (viewportWidth: number) => ViewportSize =
      calculateViewportSize.bind(null, config);
    const currentWindowSize = getWindowWidth();
    const currentViewportSize = _calculateViewportSize(currentWindowSize);
    const viewportSizeChange$ = new BehaviorSubject(currentViewportSize);
    this.viewportSize$ = viewportSizeChange$;

    // Subscribe to window dimensions change and use it to trigger viewportSizeChange$ subject
    fromEvent(nativeWindow, 'resize').pipe(
      debounceTime(WINDOW_RESIZE_DEBOUNCE_TIME),
      map(getWindowWidth),
      map(_calculateViewportSize),
      distinctUntilChanged(),
      broadcastTo(viewportSizeChange$),
    ).subscribe();
  }
}
