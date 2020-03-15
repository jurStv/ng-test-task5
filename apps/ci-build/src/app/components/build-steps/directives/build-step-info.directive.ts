import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ciBuildStepInfo]'
})
export class BuildStepInfoDirective {
  @HostBinding('class.build-step__info') className = true;
}
