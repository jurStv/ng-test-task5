export enum BuildStatusTypes {
  SUCCESS = 'success',
  FAIL = 'fail',
  IN_PROGRESS = 'in_progress',
  INITIAL = 'initial'
  // ...
}

export enum BuildVisibilityTypes {
  PRIVATE = 'private',
  // ...
}

export type TimeStamp = number;

export interface StageTimeStamps {
  created: TimeStamp;
  finished?: TimeStamp;
  started?: TimeStamp;
}

export interface BuildStep {
  creationTimeStamp: TimeStamp;
  startTimeStamp?: TimeStamp;
  finishTimeStamp?: TimeStamp;
  name: string;
  status: BuildStatusTypes;
  logs: string[];
}

export interface BuildStage {
  id: string;
  accountId: string;
  data: StageTimeStamps;
  lastUpdate: TimeStamp;
  status: BuildStatusTypes;
  visibility: BuildVisibilityTypes;
  steps: BuildStep[];
}
