import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryFooterComponent } from './primary-footer.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SharedModule } from '@checkcars/shared';

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, RouterModule],
  declarations: [PrimaryFooterComponent],
  exports: [PrimaryFooterComponent],
})
export class PrimaryFooterModule {}
