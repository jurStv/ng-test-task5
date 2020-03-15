import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[ciBuildHeaderSectionContentRight]'
})
export class HeaderSectionContentRightDirective {
  @HostBinding('class.header-section__content') classNameContent = true;
  @HostBinding('class.header-section__content--right') classNameContentRight = true;
}
