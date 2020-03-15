import { Component, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { faExclamation, faCheck } from '@fortawesome/free-solid-svg-icons';

import { BuildStatusTypes } from '@ci-build/models';

import { BuildColors } from '../../../constants';

@Component({
  selector: 'ci-build-step-status-icon',
  template: `<fa-icon *ngIf="icon" [icon]="icon"></fa-icon>`,
  styles: [`
    :host {
      display: block;
      width: 24px;
      min-width: 24px;
      height: 24px;
      border-radius: 15px;

      color: #fff;
      line-height: 24px;
      text-align: center;
      transition: background-color .3s ease-in;
      cursor: pointer;
    }

    :host(.build-step-status-icon--pulsating) {
      animation: pulse-blue infinite 1.5s;
      animation-delay: 1s;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildStepStatusIconComponent {
  @Input() status: BuildStatusTypes = BuildStatusTypes.INITIAL;

  @HostBinding('style.background-color')
  get backgroundColor() {
    return BuildColors.get(this.status)
  }

  @HostBinding('class.build-step-status-icon--pulsating')
  get pulsating() {
    return this.status === BuildStatusTypes.IN_PROGRESS;
  }

  get icon() {
    return this.status === BuildStatusTypes.SUCCESS ? faCheck
      : this.status === BuildStatusTypes.FAIL ? faExclamation
      : null;
  }
}
