import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { DurationPipe } from './pipes/duration.pipe';
import { BuildStatComponent } from './build-stat/build-stat.component';
import { StatLabelDirective } from './build-stat/stat-label.directive';
import { StatInfoDirective } from './build-stat/stat-info.directive';
import { HeaderSectionDirective } from './header/header-section.directive';
import { HeaderSectionContentRightDirective } from './header/header-section-content-right.directive';
import { HeaderSectionContentLeftDirective } from './header/header-section-content-left.directive';
import { BuildBadgeComponent } from './build-badge/build-badge.component';
import { LetDirective } from './directives/let.directive';
import { StepsProgressPipe } from './pipes/steps-progress.pipe';
import { Interval$Pipe } from './pipes/interval$.pipe';
import { BuildStepsModule } from './build-steps/build-steps.module';
import { BuildStepsPipe } from './pipes/build-steps.pipe';
import { InitialStepPipe } from './pipes/initial-step.pipe';
import { FooterItemDirective } from './footer/footer-item.directive';
import { BuildDetailsComponent } from './build-details/build-details.component';
import { BuildDetailsTitleDirective } from './build-details/build-details-title.directive';
import { BuildDetailsContentDirective } from './build-details/build-details-content.directive';
import { BuildDetailsDurationDirective } from './build-details/build-details-duration.directive';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LoadingComponent, DurationPipe, BuildStatComponent, StatLabelDirective, StatInfoDirective, HeaderSectionDirective, HeaderSectionContentRightDirective, HeaderSectionContentLeftDirective, BuildBadgeComponent, LetDirective, StepsProgressPipe, Interval$Pipe, BuildStepsPipe, InitialStepPipe, FooterItemDirective, BuildDetailsComponent, BuildDetailsTitleDirective, BuildDetailsContentDirective, BuildDetailsDurationDirective],
  imports: [CommonModule, BrowserAnimationsModule, BuildStepsModule, FontAwesomeModule],
  exports: [BuildStepsModule, HeaderComponent, FooterComponent, LoadingComponent, DurationPipe, BuildStatComponent, StatLabelDirective, StatInfoDirective, HeaderSectionDirective, HeaderSectionContentRightDirective, HeaderSectionContentLeftDirective, BuildBadgeComponent, LetDirective, StepsProgressPipe, Interval$Pipe, BuildStepsPipe, InitialStepPipe, FooterItemDirective, BuildDetailsComponent, BuildDetailsTitleDirective, BuildDetailsContentDirective, BuildDetailsDurationDirective]
})
export class ComponentsModule { }
