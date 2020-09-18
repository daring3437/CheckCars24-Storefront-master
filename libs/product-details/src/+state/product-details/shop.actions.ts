import { createAction, props } from '@ngrx/store';
import { ProductsEntity } from '../../utils/models/products.models';
import { SearchState } from '../../utils/models/SearchState.interface';
import { Offer } from '../../utils/models/offer.model';

export const loadProducts = createAction(
  '[Product Search] Load Products',
  props<{ searchState: any }>()
);
export const loadProductsSuccess = createAction(
  '[Product Search] Load Products Success',
  props<{
    products: ProductsEntity[];
    searchState: SearchState;
    count: number;
  }>()
);

export const loadProductsFailure = createAction(
  '[Product Search] Load Products Failure',
  props<{ error: any }>()
);

export const selectProduct = createAction(
  '[Product Details] Select Product Id',
  props<{ productId: any }>()
);

export const loadProduct = createAction(
  '[Product Details] Load Single Product ',
  props<{ productId: any }>()
);
export const loadProductSuccess = createAction(
  '[Product Details] Load Single Product Success',
  props<{ product: any }>()
);
export const loadProductFailure = createAction(
  '[Product Details] Load Single Product Failure',
  props<{ error: any }>()
);
export const loadOffers = createAction(
  '[Product Details] Load Offers ',
  props<{ productUrlId: string }>()
);
export const loadOffersSuccess = createAction(
  '[Product Details] Load Offers Success',
  props<{ offers: Offer[] }>()
);
export const loadOffersFailure = createAction(
  '[Product Details] Load Offers Failure',
  props<{ error: any }>()
);
export const flushDetails = createAction(
  '[Product Details] Flush selectedProduct and selectedOffers'
);
export const getCloseDealers = createAction(
  '[Product Details] Load Close dealers',
  props<{ coordinates: Array<string> }>()
);
export const getCloseDealerOffers = createAction(
  "[Product Details] Load Close dealer's offers",
  props<CloseReqData>()
);
export const getCloseDealerOffersSuccess = createAction(
  "[Product Details] Load Close dealer's offers success",
  props<{ offers: Offer[] }>()
);
export interface CloseReqData {
  coordinates: string[];
  urlId: string;
}
