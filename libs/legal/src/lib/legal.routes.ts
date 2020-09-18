import { Routes } from '@angular/router';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { ImprintComponent } from './components/imprint/imprint.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { RevocationComponent } from './components/revocation/revocation.component';
import { TermsAndCondtionsComponent } from './components/terms-and-condtions/terms-and-condtions.component';
import { WorkshopConditionsComponent } from './components/workshop-conditions/workshop-conditions.component';

export const LegalRoutes: Routes = [
  {
    path: 'conditions',
    component: ConditionsComponent,
  },
  {
    path: 'imprint',
    component: ImprintComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'revocation',
    component: RevocationComponent,
  },
  {
    path: 'terms',
    component: TermsAndCondtionsComponent,
  },
  {
    path: 'shop',
    component: WorkshopConditionsComponent,
  },
];
