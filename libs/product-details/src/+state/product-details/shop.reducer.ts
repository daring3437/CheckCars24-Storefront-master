import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ShopActions from './shop.actions';
import { ProductsEntity } from '../../utils/models/products.models';
import { SearchState } from '../../utils/models/SearchState.interface';
import { Offer } from '../../utils/models/offer.model';

export const SHOP_FEATURE_KEY = 'shop';

export interface State extends EntityState<ProductsEntity> {
  selectedId?: string | number;
  offers: Offer[];
  selectedProduct: any; // which Shop record has been selected
  loaded: boolean; // has the Shop list been loaded
  error?: string | null; // last none error (if any)
  searchState: SearchState;
}

export interface ShopPartialState {
  readonly [SHOP_FEATURE_KEY]: State;
}
export function selectProductId(a: ProductsEntity): string {
  return a.urlId;
}
export const shopAdapter: EntityAdapter<ProductsEntity> = createEntityAdapter<
  ProductsEntity
>({
  selectId: selectProductId,
});

export const initialState: State = shopAdapter.getInitialState({
  // set initial required properties
  selectedProduct: null,
  offers: [],
  loaded: false,
  searchState: {
    count: null,
    skip: 0,
    top: 40,
    searchForm: {},
  },
});

const shopReducer = createReducer(
  initialState,
  on(ShopActions.loadProducts, (state, { searchState }) => ({
    ...state,
    loaded: false,
    error: null,
    searchState: { ...state.searchState, ...searchState },
  })),

  on(
    ShopActions.loadProductsSuccess,
    (state, { products, searchState, count }) => {
      return shopAdapter.setAll(products, {
        ...state,
        loaded: true,
        searchState: {
          ...state.searchState,
          count: count,
        },
      });
    }
  ),

  on(ShopActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(ShopActions.selectProduct, (state, { productId }) => {
    return {
      ...state,
      selectedId: productId,
    };
  }),
  on(ShopActions.loadProduct, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),

  on(ShopActions.loadProductSuccess, (state, { product }) => {
    return { ...state, selectedProduct: product };
  }),

  on(ShopActions.loadProductFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  on(ShopActions.loadOffersSuccess, (state, { offers }) => {
    return { ...state, offers: offers };
  }),

  on(ShopActions.loadOffersFailure, (state, { error }) => {
    return {
      ...state,
      error: error,
    };
  }),
  on(ShopActions.getCloseDealerOffersSuccess, (state, { offers }) => {
    return {
      ...state,
      offers: offers,
    };
  }),
  on(ShopActions.flushDetails, (state) => {
    return {
      ...state,
      selectedProduct: null,
      offers: [],
    };
  })
);

export function reducer(state: State | undefined, action: Action) {
  return shopReducer(state, action);
}
