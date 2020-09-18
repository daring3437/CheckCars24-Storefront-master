import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SharedActions from './shared.actions';
import { SharedEntity } from './shared.models';

export const SHARED_FEATURE_KEY = 'shared';

/* export enum PaymentType {
  'BUSINESS',
  'PRIVATE',
} */

export interface State extends EntityState<SharedEntity> {
  selectedId?: string | number; // which Shared record has been selected
  loaded: boolean; // has the Shared list been loaded
  error?: string | null; // last none error (if any)
  paymentType: any;
  lastViewed: Array<any>;
  vatRate?: number;
  favoriteVehicles: any;
  langIso: any;
  parameters;
}

export interface SharedPartialState {
  readonly [SHARED_FEATURE_KEY]: State;
}

export const sharedAdapter: EntityAdapter<SharedEntity> = createEntityAdapter<
  SharedEntity
>();

export const initialState: State = sharedAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  paymentType: 1,
  lastViewed: [],
  vatRate: null,
  favoriteVehicles: {},
  langIso: null,
  parameters: [],
});

const sharedReducer = createReducer(
  initialState,
  on(SharedActions.togglePaymentType, (state) => ({
    ...state,
    paymentType: state.paymentType === 1 ? 2 : 1,
  })),
  on(SharedActions.loadVatKeySuccess, (state, { vatRate }) => ({
    ...state,
    vatRate: vatRate,
  })),

  on(SharedActions.addToLastViewed, (state, { vehicle }) => ({
    ...state,
    lastViewed:
      state.lastViewed.length > 6
        ? [vehicle, ...state.lastViewed.splice(0, 5)]
        : [...state.lastViewed, vehicle],
  })),
  on(SharedActions.setLanguage, (state, { langIso }) => ({
    ...state,
    langIso,
  })),

  //todo:should ceheck last viewd
  on(SharedActions.addFavorite, (state, { vehicle }) => {
    const favVehicle = { [vehicle.vehicleId]: vehicle };
    return {
      ...state,
      favoriteVehicles: {
        ...state.favoriteVehicles,
        ...favVehicle,
      },
    };
  }),

  //todo:should ceheck last viewd
  on(SharedActions.removeFavorite, (state, { vehicleId }) => {
    const { [vehicleId]: value, ...remainingFavorite } = state.favoriteVehicles;

    return {
      ...state,
      favoriteVehicles: remainingFavorite,
    };
  }),
  on(SharedActions.loadParametersSuccess, (state, { parameters }) => {
    return {
      ...state,
      parameters: parameters,
    };
  }),

  on(SharedActions.loadParametersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sharedReducer(state, action);
}
