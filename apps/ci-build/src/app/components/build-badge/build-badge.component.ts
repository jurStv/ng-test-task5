import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { BuildStatusTypes } from '@ci-build/models';
import { BuildColors, BuildTexts } from '../../constants';

@Component({
  selector: 'ci-build-badge',
  templateUrl: './build-badge.component.html',
  styleUrls: ['./build-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildBadgeComponent {
  @Input() buildStatus: BuildStatusTypes = BuildStatusTypes.INITIAL;

  @HostBinding('style.background-color')
  get badgeColor() {
    return BuildColors.get(this.buildStatus);
  }

  get badgeText() {
    return BuildTexts.get(this.buildStatus);
  }

  get pulsationShown() {
    return this.buildStatus === BuildStatusTypes.INITIAL || this.buildStatus === BuildStatusTypes.IN_PROGRESS;
  }
}
