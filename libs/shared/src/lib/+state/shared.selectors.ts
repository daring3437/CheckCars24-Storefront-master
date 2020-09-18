import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SHARED_FEATURE_KEY,
  State,
  SharedPartialState,
  sharedAdapter,
} from './shared.reducer';

// Lookup the 'Shared' feature state managed by NgRx
export const getSharedState = createFeatureSelector<SharedPartialState, State>(
  SHARED_FEATURE_KEY
);

const { selectAll, selectEntities } = sharedAdapter.getSelectors();

export const getSharedLoaded = createSelector(
  getSharedState,
  (state: State) => state.loaded
);

export const getSharedError = createSelector(
  getSharedState,
  (state: State) => state.error
);
export const getVatRate = createSelector(
  getSharedState,
  (state: State) => state.vatRate
);

export const paymnetType = createSelector(
  getSharedState,
  (state: State) => state.paymentType
);
export const lastViewdVehicles = createSelector(
  getSharedState,
  (state: State) => state.lastViewed
);
export const favoriteVehicles = createSelector(
  getSharedState,
  (state: State) => state.favoriteVehicles
);
export const language = createSelector(
  getSharedState,
  (state: State) => state.langIso
);

export const getAllShared = createSelector(getSharedState, (state: State) =>
  selectAll(state)
);

export const getSharedEntities = createSelector(
  getSharedState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSharedState,
  (state: State) => state.selectedId
);
export const getParameters = createSelector(
  getSharedState,
  (state: State) => state.parameters
);

export const getSelected = createSelector(
  getSharedEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
