import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ciBuildStepTitle]'
})
export class BuildStepTitleDirective {
  @HostBinding('class.build-step__title') className = true;
}
