import { NgModule } from '@angular/core';

import { CollapseDirective } from './collapse.directive';
import { CollapseConatinerComponent } from './components/collapse-conatiner/collapse-conatiner.component';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  imports: [CommonModule, AngularSvgIconModule],
  declarations: [CollapseDirective, CollapseConatinerComponent],
  exports: [CollapseDirective, CollapseConatinerComponent],
})
export class CollapseModule {}
