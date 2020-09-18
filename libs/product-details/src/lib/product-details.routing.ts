import { Routes } from '@angular/router';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';

export const productDetailsRoutes: Routes = [
  {
    path: 'vehicle/:id',
    component: ProductDetailsComponent,
  },
  /*   {
    path: 'preview',
    component: ProductDetailsComponent,
  }, */
];
