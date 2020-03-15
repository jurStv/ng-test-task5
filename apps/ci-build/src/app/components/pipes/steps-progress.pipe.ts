import { Pipe, PipeTransform } from '@angular/core';
import { BuildStage, BuildStatusTypes } from '@ci-build/models';

@Pipe({
  name: 'stepsProgress',
})
export class StepsProgressPipe implements PipeTransform {

  transform(stage: BuildStage): string {
    const [ initialStep, ...otherSteps ] = stage.steps;
    const doneSteps = otherSteps.filter(({status}) => status === BuildStatusTypes.SUCCESS).length;
    const totalSteps = otherSteps.length;

    return `${doneSteps}/${totalSteps}`;
  }

}
