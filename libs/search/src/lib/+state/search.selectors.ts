import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getqueryParams } from '@checkcars/ngrx-router';
import {
  SEARCH_FEATURE_KEY,
  State,
  SearchPartialState,
  searchAdapter,
} from './search.reducer';
import { RouterState } from '@angular/router';

// Lookup the 'Search' feature state managed by NgRx
export const getSearchState = createFeatureSelector<SearchPartialState, State>(
  SEARCH_FEATURE_KEY
);

const { selectAll, selectEntities } = searchAdapter.getSelectors();

export const getSearchLoaded = createSelector(
  getSearchState,
  (state: State) => state.loaded
);

export const getSearchError = createSelector(
  getSearchState,
  (state: State) => state.error
);

export const getAllVehicles = createSelector(getSearchState, (state: State) =>
  selectAll(state)
);

export const getSearchEntities = createSelector(
  getSearchState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getSearchState,
  (state: State) => state.selectedId
);

export const getParameters = createSelector(
  getSearchState,
  (state: State) => state.parameters
);
export const getParamsWithQueryParams = createSelector(
  getParameters,
  getqueryParams
);

/* export const getFilterState = createSelector(
  getSearchState,
  (state: State) => state.searchState.filters
);
export const getQueryState = createSelector(
  getSearchState,
  (state: State) => state.searchState
); */
export const getSState = createSelector(
  getSearchState,
  (state: State) => state.searchState
);
/* export const getPager = createSelector(
  getSearchState,
  (state: State) => state.pager
);
export const getPagerCount = createSelector(
  getSearchState,
  (state: State) => state.count
); */

export const getSelected = createSelector(
  getSearchEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);
