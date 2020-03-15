import { Directive, ContentChild, HostBinding, Input } from '@angular/core';

import { HeaderSectionContentLeftDirective } from './header-section-content-left.directive';
import { HeaderSectionContentRightDirective } from './header-section-content-right.directive';

const MIN_HEIGHT = '57px';

@Directive({
  selector: '[ciBuildHeaderSection]'
})
export class HeaderSectionDirective {
  @ContentChild(HeaderSectionContentLeftDirective) headerSectionLeft: HeaderSectionContentLeftDirective;
  @ContentChild(HeaderSectionContentRightDirective) headerSectionRight: HeaderSectionContentRightDirective;

  @HostBinding('class.header-section') className = true;
  @HostBinding('class.header-section--container') get classNameContainer() {
    return Boolean(this.headerSectionLeft || this.headerSectionRight);
  };

  @Input()
  @HostBinding('style.min-height') minHeight = MIN_HEIGHT;
}
