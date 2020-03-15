import * as R from 'ramda';
import { Injectable } from '@nestjs/common';
import { BuildStage, BuildStep, BuildStatusTypes } from '@ci-build/models';

let rawData = require('./build-data.json');
rawData = { ...rawData, steps: rawData.steps.map((step) => ({ ...step, logs: R.take(700, step.logs) })) };

const currentDate = Date.now();
const BUILD_DATA: BuildStage = {
  ...rawData,
  data: { created: currentDate },
  lastUpdate: currentDate,
  status: BuildStatusTypes.INITIAL,
  steps: rawData.steps.map((step) => ({
    ...step,
    creationTimeStamp: currentDate,
    finishTimeStamp: null,
    startTimeStamp: null,
    status: BuildStatusTypes.INITIAL,
    logs: [],
  })),
};

@Injectable()
export class BuildProgressService {
  private data = BUILD_DATA;

  prepareBuild() {
    return this.data;
  }

  startBuild(): BuildStage {
    const stage = R.compose(
      R.assocPath<number, BuildStage>(['data', 'started'], Date.now()),
      R.assoc('status', BuildStatusTypes.IN_PROGRESS)
    )(this.data);
    this.data = stage;

    return stage;
  }

  finishBuild(): BuildStage {
    const unfinishedStepIndex = this.data.steps.findIndex((step) => step.status === BuildStatusTypes.IN_PROGRESS);
    const stage = R.compose(
      R.assocPath<number, BuildStage>(['data', 'finished'], Date.now()),
      R.assoc('status', unfinishedStepIndex >= 0 ?  BuildStatusTypes.FAIL : BuildStatusTypes.SUCCESS)
    )(this.data);
    if (unfinishedStepIndex >= 0) {
      stage.steps = stage.steps.map((step, i) => i !== unfinishedStepIndex ? step : {...step,  status: BuildStatusTypes.FAIL, finishTimeStamp: Date.now()});
    }
    this.data = BUILD_DATA;

    return stage;
  }

  startStep(index: number) {
    const step: BuildStep = R.path(['steps', index], this.data);
    const updatedStep: BuildStep = { ...step, status: BuildStatusTypes.IN_PROGRESS, startTimeStamp: Date.now() };
    this.data = R.assocPath(['steps', index], updatedStep, this.data);

    return updatedStep;
  }

  finishStep(index: number) {
    const step: BuildStep = R.path(['steps', index], this.data);
    const logs = this.getStepLogs(index);
    const updatedStep: BuildStep = { ...step, status: BuildStatusTypes.SUCCESS, finishTimeStamp: Date.now(), logs };
    this.data = R.assocPath(['steps', index], updatedStep, this.data);

    return updatedStep;
  }

  getStepLogs(index: number): string[] {
    return R.path(['steps', index, 'logs'], rawData);
  }
}
