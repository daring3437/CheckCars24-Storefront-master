import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainShellComponent } from './components/main-shell/main-shell.component';
import { PrimaryFooterModule, PrimaryHeaderModule } from '@checkcars/widgets';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    PrimaryFooterModule,
    PrimaryHeaderModule,
    RouterModule,
  ],
  declarations: [MainShellComponent],
})
export class LayoutModule {}
