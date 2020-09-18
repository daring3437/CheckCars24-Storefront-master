import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryHeaderComponent } from './primary-header.component';
import { ToggleModule } from '../../widgets/toggle/toggle.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@checkcars/shared';

@NgModule({
  imports: [CommonModule, ToggleModule, RouterModule, SharedModule],
  declarations: [PrimaryHeaderComponent],
  exports: [PrimaryHeaderComponent],
})
export class PrimaryHeaderModule {}
