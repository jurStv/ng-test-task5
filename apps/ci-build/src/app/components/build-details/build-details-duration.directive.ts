import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ciBuildDetailsDuration]'
})
export class BuildDetailsDurationDirective {
  @HostBinding('class.build-details__duration') className = true;
}
