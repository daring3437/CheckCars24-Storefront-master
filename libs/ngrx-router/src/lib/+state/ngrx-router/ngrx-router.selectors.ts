import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ngrxRouterFeatureKey } from './router.interfaces';
import { MergedRouteReducerState } from './router.interfaces';

export const getRouterReducerState = createFeatureSelector<
  MergedRouteReducerState
>(ngrxRouterFeatureKey);

export const getMergedRoute = createSelector(
  getRouterReducerState,
  (routerReducerState) => routerReducerState.state
);
export const getqueryParams = createSelector(
  getMergedRoute,
  (state) => state.queryParams
);
