import { isNil } from 'ramda';
import { Pipe, PipeTransform, NgZone } from '@angular/core';
import { Observable, of, NEVER } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Pipe({
  name: 'interval$'
})
export class Interval$Pipe implements PipeTransform {
  constructor(private readonly zone: NgZone) {}

  transform(timestamp: number, period$ = of(1000)): Observable<number> {
    const that = this;
    return period$.pipe(
      switchMap((period) => isNil(period) ? NEVER : new Observable<number>((observer) => {
        const createInterval = () => setInterval(() => {
          observer.next(Date.now() - timestamp);
        }, period);
        const intervalId = that.zone.runOutsideAngular(createInterval);
        observer.next(Date.now() - timestamp);

        return {
          unsubscribe() {
            clearInterval(intervalId);
          }
        };
      }))
    );
  }

}
