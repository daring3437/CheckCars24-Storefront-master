import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SHOP_FEATURE_KEY,
  State,
  ShopPartialState,
  shopAdapter,
} from './shop.reducer';

// Lookup the 'Shop' feature state managed by NgRx
export const getShopState = createFeatureSelector<ShopPartialState, State>(
  SHOP_FEATURE_KEY
);

const { selectAll, selectEntities } = shopAdapter.getSelectors();

export const getShopLoaded = createSelector(
  getShopState,
  (state: State) => state.loaded
);

export const getSearchState = createSelector(
  getShopState,
  (state: State) => state.searchState
);

export const getShopError = createSelector(
  getShopState,
  (state: State) => state.error
);

export const getAllProducts = createSelector(getShopState, (state: State) =>
  selectAll(state)
);

export const getProductEntities = createSelector(getShopState, (state: State) =>
  selectEntities(state)
);

export const getSelectedId = createSelector(
  getShopState,
  (state: State) => state.selectedId
);
export const getSelectedProduct = createSelector(
  getShopState,
  (state: State) => state.selectedProduct
);

export const getOfferFromMemory = createSelector(
  getProductEntities,
  (products, props) => {
    return products[props] ? products[props] : null;
  }
);

export const getSelectedOffers = createSelector(
  getShopState,
  (state: State) => state.offers
);

export const getSelected = createSelector(
  getProductEntities,
  getSelectedId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);
