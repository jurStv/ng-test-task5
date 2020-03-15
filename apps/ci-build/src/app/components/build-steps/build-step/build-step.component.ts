import { Component, ChangeDetectionStrategy, Input, HostBinding, Output, EventEmitter } from '@angular/core';

import { BuildStatusTypes } from '@ci-build/models';

import { BuildColors } from '../../../constants';
import { stepAnimation, stepStatusIconAnimation } from './build-step.animations';

@Component({
  selector: 'ci-build-step',
  templateUrl: './build-step.component.html',
  styleUrls: ['./build-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [stepAnimation, stepStatusIconAnimation],
})
export class BuildStepComponent {
  @HostBinding('class.build-step') className = true;
  @Input() status: BuildStatusTypes = BuildStatusTypes.INITIAL;
  @Input() active = false;
  @Input() mini = false;

  @Output() activate = new EventEmitter<void>();

  get success() {
    return this.status === BuildStatusTypes.SUCCESS;
  }

  get running() {
    return this.status === BuildStatusTypes.IN_PROGRESS;
  }

  get fail() {
    return this.status === BuildStatusTypes.FAIL;
  }

  get disabled() {
    return this.status === BuildStatusTypes.INITIAL;
  }

  @HostBinding('class.build-step--not-allowed') get classNameModifier() {
    return this.status === BuildStatusTypes.INITIAL;
  }

  get color() {
    return BuildColors.get(this.status);
  }

  handleClick() {
    if (this.disabled) {
      return;
    }
    this.activate.emit();
  }
}
