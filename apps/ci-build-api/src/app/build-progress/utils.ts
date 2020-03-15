import * as R from 'ramda';

export const random = R.curry((min, max) => {
  const range = max - min;

  return Math.floor(Math.random() * range + min);
});
