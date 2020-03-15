import { Component, ChangeDetectionStrategy, HostBinding } from '@angular/core';

import { loadingAppearanceAnimation } from './loading.animations';

@Component({
  selector: 'ci-build-loading',
  template: `<img src="/assets/branches_loader_v3.gif" alt="branches_loader_v3.gif" />`,
  styles: [`
    :host { display: block; }
    img { display: block; max-width: 225px; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [loadingAppearanceAnimation],
})
export class LoadingComponent {
  @HostBinding('@loadingAppearanceAnimation') loadingAppearanceAnimation = true;
}
