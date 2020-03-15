import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ci-build-stat',
  templateUrl: './build-stat.component.html',
  styleUrls: ['./build-stat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildStatComponent {}
