import { Pipe, PipeTransform } from '@angular/core';

import { BuildStep } from '@ci-build/models';

@Pipe({
  name: 'initialStep'
})
export class InitialStepPipe implements PipeTransform {

  transform([initialStep, ...buildSteps]: BuildStep[]): BuildStep {
    return initialStep;
  }

}
