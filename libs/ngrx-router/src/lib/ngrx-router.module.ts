import { NgModule, Optional, Self } from '@angular/core';
import {
  routerReducer,
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { MergedRouterStateSerializer } from './+state/ngrx-router/custom-serializer';
import { Router } from '@angular/router';
import { ngrxRouterFeatureKey } from './+state/ngrx-router/router.interfaces';
@NgModule({
  imports: [
    StoreModule.forFeature(ngrxRouterFeatureKey, routerReducer),
    StoreRouterConnectingModule.forRoot({ stateKey: ngrxRouterFeatureKey }),
  ],
  exports: [StoreModule, StoreRouterConnectingModule],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: MergedRouterStateSerializer,
    },
  ],
})
export class NgrxRouterStoreModule {
  constructor(router: Router) {
    if (router) {
      console.log('All good, NgrxRouterStoreModule');
    } else {
      console.error(
        'NgrxRouterStoreModule must be imported in the same same level as RouterModule'
      );
    }
  }
}
