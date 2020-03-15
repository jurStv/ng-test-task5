import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObserversModule } from '@angular/cdk/observers';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BuildStepsContainerComponent } from './build-steps-container/build-steps-container.component';
import { BuildStepComponent } from './build-step/build-step.component';
import { BuildStepTitleDirective } from './directives/build-step-title.directive';
import { BuildStepInfoDirective } from './directives/build-step-info.directive';
import { BuildStepIconDirective } from './directives/build-step-icon.directive';
import { BuildStepDurationDirective } from './directives/build-step-duration.directive';
import { BuildStepStatusIconComponent } from './build-step-status-icon/build-step-status-icon.component';

@NgModule({
  declarations: [BuildStepsContainerComponent, BuildStepComponent, BuildStepTitleDirective, BuildStepInfoDirective, BuildStepIconDirective, BuildStepDurationDirective, BuildStepStatusIconComponent],
  imports: [CommonModule, FontAwesomeModule, ObserversModule],
  exports: [BuildStepsContainerComponent, BuildStepComponent, BuildStepTitleDirective, BuildStepInfoDirective, BuildStepIconDirective, BuildStepDurationDirective, BuildStepStatusIconComponent]
})
export class BuildStepsModule { }
