import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ciBuildHeaderSectionContentLeft]'
})
export class HeaderSectionContentLeftDirective {
  @HostBinding('class.header-section__content') classNameContent = true;
  @HostBinding('class.header-section__content--left') classNameContentLeft = true;
}
