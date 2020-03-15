import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ciBuildStepDuration]'
})
export class BuildStepDurationDirective {
  @HostBinding('class.build-step__duration') className = true;
}
