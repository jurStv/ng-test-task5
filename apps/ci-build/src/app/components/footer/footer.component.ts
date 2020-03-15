import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import { footerAnimation } from './footer.animations';

@Component({
  selector: 'ci-build-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [footerAnimation],
})
export class FooterComponent  {
  @HostBinding('@footerAnimation') animation = true;
}
