import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import { headerAnimation } from './header.animations';

@Component({
  selector: 'ci-build-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [headerAnimation],
})
export class HeaderComponent {
  @HostBinding('@headerAnimation') animation = true;
}
