import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ciBuildStatInfo]'
})
export class StatInfoDirective {
  @HostBinding('class.build-stat__info') className = true;
}
