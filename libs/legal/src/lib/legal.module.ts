import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImprintComponent } from './components/imprint/imprint.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { RevocationComponent } from './components/revocation/revocation.component';
import { TermsAndCondtionsComponent } from './components/terms-and-condtions/terms-and-condtions.component';
import { WorkshopConditionsComponent } from './components/workshop-conditions/workshop-conditions.component';
import { RouterModule } from '@angular/router';
import { LegalRoutes } from './legal.routes';
import { AngularSvgIconModule, SvgLoader } from 'angular-svg-icon';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LegalRoutes),
    AngularSvgIconModule,
  ],
  declarations: [
    ConditionsComponent,
    ImprintComponent,
    PrivacyComponent,
    RevocationComponent,
    TermsAndCondtionsComponent,
    WorkshopConditionsComponent,
  ],
})
export class LegalModule {}
