import { BuildStatusTypes } from '@ci-build/models';

export const BuildColors: Map<BuildStatusTypes, string> =
  new Map()
    .set(BuildStatusTypes.INITIAL, '#ccc')
    .set(BuildStatusTypes.IN_PROGRESS, '#83aff8')
    .set(BuildStatusTypes.SUCCESS, '#11B5A4')
    .set(BuildStatusTypes.FAIL, '#e83f43');


export const BuildTexts: Map<BuildStatusTypes, string> =
  new Map()
    .set(BuildStatusTypes.INITIAL, 'PENDING')
    .set(BuildStatusTypes.IN_PROGRESS, 'RUNNING')
    .set(BuildStatusTypes.SUCCESS, 'COMPLETED')
    .set(BuildStatusTypes.FAIL, 'FAILED');

export enum Time {
  SECOND = 1000,
  MINUTE = 60 * SECOND,
  HOUR = 60 * MINUTE,
  DAY = 24 * HOUR,
}
