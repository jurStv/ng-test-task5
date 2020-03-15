import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ciBuildStepIcon]'
})
export class BuildStepIconDirective {
  @HostBinding('class.build-step__icon') className = true;
}
