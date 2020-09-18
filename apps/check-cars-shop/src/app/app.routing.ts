import { Routes } from '@angular/router';
import { MainShellComponent } from './layout/components/main-shell/main-shell.component';

// Routes
export const mainRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: '',
    component: MainShellComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('@checkcars/home').then((m) => m.HomeModule),
      },
      {
        path: 'search',
        loadChildren: () =>
          import('@checkcars/search').then((m) => m.SearchModule),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('@checkcars/favorite').then((m) => m.FavoriteModule),
      },
      {
        path: 'legal',
        loadChildren: () =>
          import('@checkcars/legal').then((m) => m.LegalModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('@checkcars/contact').then((m) => m.ContactModule),
      },
      {
        path: '',
        loadChildren: () =>
          import('@checkcars/product-details').then(
            (m) => m.ProductDetailsModule
          ),
      },
    ],
  },

  /*
Routes on another routing shell
{
    path: 'checkout',
    loadChildren: () =>
      import('@duofrontend/checkout').then(m => m.CheckoutModule)
  },
 loadChildren: () => import('@duofrontend/auth').then(m => m.AuthModule)
  } */
];
