import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { BuildStatusTypes } from '@ci-build/models';

import { buildDetailsAnimation } from './build-details.animations';

@Component({
  selector: 'ci-build-details',
  templateUrl: './build-details.component.html',
  styleUrls: ['./build-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [buildDetailsAnimation],
})
export class BuildDetailsComponent {
  @HostBinding('@buildDetailsAnimation') animation = true;
  @Input() status: BuildStatusTypes = BuildStatusTypes.INITIAL;
  @Output() closeDetails = new EventEmitter<void>();

  icon = faTimes;

  handleClick() {
    this.closeDetails.emit();
  }
}
