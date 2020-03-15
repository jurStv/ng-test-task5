import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IfViewportSizeDirective } from './if-viewport-size.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [IfViewportSizeDirective],
  providers: [],
  exports: [IfViewportSizeDirective],
})
export class ViewportSizeModule { }
