import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[ciBuildFooterItem]'
})
export class FooterItemDirective {
  @HostBinding('class.ci-build-footer__item') className = true;

  @HostBinding('class.ci-build-footer__item--active')
  @Input() active = false;
}
