import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ciBuildStatLabel]'
})
export class StatLabelDirective {
  @HostBinding('class.build-stat__label') className = true;
}
