import { Subject, OperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Time } from './constants';
import { compose, not, isNil, curry } from 'ramda';

// Pipe operator function which broadcasts emitted value to given Subject
export function broadcastTo<T = any>(subject: Subject<T>): OperatorFunction<T, T> {
  return tap((value: T) => subject.next(value));
}

export function deepClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export function cloneArray<T>(data: T[]): T[] {
  return data.slice(0);
}

export const toTimePeriod = curry((delta: number, timestamp: number) => {
  const passed = Date.now() - timestamp;

  return passed < (Time.MINUTE + delta * Time.SECOND) ? Time.SECOND
          : passed < (Time.HOUR + delta* Time.MINUTE ) ? Time.MINUTE
          : passed < (Time.DAY + delta* Time.HOUR ) ? Time.HOUR
          : Time.DAY;
});

export const defined = compose(not, isNil);
