import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ciBuildDetailsTitle]'
})
export class BuildDetailsTitleDirective {
  @HostBinding('class.build-details__title') className = true;
}
