import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map, switchMap } from 'rxjs/operators';

import * as ShopActions from './shop.actions';
import { ProductsService } from '../../services/products.service';
import { ProductRequest } from '../../utils/models/ProductsRequest.interface';
import { AlgoliaService } from '@duofrontend/shared-services';
import { ShopFacade } from './shop.facade';

@Injectable()
export class ShopEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.loadProducts),
      fetch({
        run: action => {
          // pass the query params action.queryParams
          return this.productsService.getProducts(action.searchState).pipe(
            map((res: ProductRequest) => {
              return ShopActions.loadProductsSuccess({
                products: res.value,
                searchState: action.searchState,
                count: res['@odata.count']
              });
            })
          );
        },
        onError: (action, error) => {
          return ShopActions.loadProductsFailure({ error });
        }
      })
    )
  );

  loadProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.loadProduct),
      fetch({
        run: action => {
          return this.productsService.getProduct(action.productId).pipe(
            map((res: any) => {
              return ShopActions.loadProductSuccess({
                product: res
              });
            })
          );
        },
        onError: (action, error) => {
          return ShopActions.loadProductsFailure({ error });
        }
      })
    )
  );

  loadOffers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.loadOffers),
      fetch({
        run: action => {
          return this.productsService.getOffers(action.productUrlId).pipe(
            map((res: any) => {
              return ShopActions.loadOffersSuccess({
                offers: res.value
              });
            })
          );
        },
        onError: (action, error) => {
          return ShopActions.loadOffersFailure({ error });
        }
      })
    )
  );
  loadCloseDealers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ShopActions.getCloseDealerOffers),
      fetch({
        run: action => {
          return this.algoliaService.getCloseDealers(action.coordinates).pipe(
            switchMap(res => {
              const appIdArray = res.hits
                .map(dealer => dealer['applicationId'])
                .filter(appid => appid);
              return this.productsService.getOffersForDealerIds({
                productUrlId: action.urlId,
                applicationIds: appIdArray
              });
            }),
            map((res: any) => {
              return ShopActions.getCloseDealerOffersSuccess({
                offers: res.value
              });
            })
          );
        },
        onError: error => {
          return ShopActions.loadOffersFailure({ error });
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private algoliaService: AlgoliaService
  ) {}
}
