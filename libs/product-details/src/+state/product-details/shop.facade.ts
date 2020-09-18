import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ShopActions from './shop.actions';
import * as shopSelector from './shop.selectors';
import { selectProductId } from './shop.reducer';
import { tap } from 'rxjs/operators';

@Injectable()
export class ShopFacade {
  products$ = this.store.select(shopSelector.getAllProducts);
  searchState$ = this.store.select(shopSelector.getSearchState);

  selectedOffers$ = this.store
    .select(shopSelector.getSelectedOffers)
    .pipe(tap((res) => {}));

  selectedProduct$ = this.store
    .select(shopSelector.getSelectedProduct)
    .pipe(tap((res) => {}));
  /* selectedProduct$ = this.store.select(shopSelector.getSelected).pipe(
    tap(res => {
      console.log(res);
    })
  ); */
  getOfferFromMemory(urlId) {
    return this.store.select(shopSelector.getOfferFromMemory, urlId);
  }

  constructor(private store: Store<any>) {}
  loadProducts({ searchState }) {
    this.store.dispatch(ShopActions.loadProducts({ searchState }));
  }

  loadProduct(productId) {
    this.store.dispatch(ShopActions.loadProduct({ productId: productId }));
  }

  loadOffers(productUrlId) {
    this.store.dispatch(ShopActions.loadOffers({ productUrlId }));
  }
  selectProduct(selectedId) {
    this.store.dispatch(ShopActions.selectProduct({ productId: selectedId }));
  }
  flushDetails() {
    this.store.dispatch(ShopActions.flushDetails());
  }

  getCloseDealerOffers(data) {
    //TODO: remove log
    this.store.dispatch(ShopActions.getCloseDealerOffers(data));
  }
}
