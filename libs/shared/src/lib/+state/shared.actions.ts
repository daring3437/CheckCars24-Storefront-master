import { createAction, props } from '@ngrx/store';
import { SharedEntity } from './shared.models';

export const loadShared = createAction('[Shared] Load Shared');

export const loadSharedSuccess = createAction(
  '[Shared] Load Shared Success',
  props<{ shared: SharedEntity[] }>()
);

export const loadSharedFailure = createAction(
  '[Shared] Load Shared Failure',
  props<{ error: any }>()
);

export const setLanguage = createAction(
  '[Shared] Set app language',
  props<{ langIso: string }>()
);

export const loadVatKey = createAction('[Shared] Load vat key');

export const loadVatKeySuccess = createAction(
  '[Shared] Load vat key success',
  props<{ vatRate: number }>()
);

export const addFavorite = createAction(
  '[Shared] Add vehicle to favourite list',
  props<{ vehicle: any }>()
);
export const removeFavorite = createAction(
  '[Shared] Remove vehicle from favourite list',
  props<{ vehicleId: string }>()
);

export const togglePaymentType = createAction('[Shared] Changes payment type');

export const addToLastViewed = createAction(
  '[Shared] Add to last viewed',
  props<{ vehicle }>()
);
export const loadParameters = createAction('[Search page] Load Parameters');

export const loadParametersSuccess = createAction(
  '[Search page] Load parameters Success',
  props<{ parameters: any }>()
);

export const loadParametersFailure = createAction(
  '[Search page] Load parameters Failure',
  props<{ error: any }>()
);
