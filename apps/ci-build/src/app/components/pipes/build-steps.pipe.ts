import { Pipe, PipeTransform } from '@angular/core';

import { BuildStep } from '@ci-build/models';

@Pipe({
  name: 'buildSteps'
})
export class BuildStepsPipe implements PipeTransform {

  transform([_, ...buildSteps]: BuildStep[]): BuildStep[] {
    return buildSteps;
  }

}
