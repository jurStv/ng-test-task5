import { Interval$Pipe } from './interval$.pipe';

describe('Interval$Pipe', () => {
  it('create an instance', () => {
    const pipe = new Interval$Pipe();
    expect(pipe).toBeTruthy();
  });
});
