import { createAction, props } from '@ngrx/store';
import { SearchEntity } from './search.models';

export const loadSearch = createAction('[Search] Load Search');

export const loadSearchSuccess = createAction(
  '[Search] Load Search Success',
  props<{ search: SearchEntity[] }>()
);

export const loadSearchFailure = createAction(
  '[Search] Load Search Failure',
  props<{ error: any }>()
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

export const loadVehicles = createAction(
  '[Search page] Load Vehicles',
  props<{ searchState }>()
);

export const loadVehiclesSuccess = createAction(
  '[Search page] Load Vehicles Success',
  props<{ vehicles; searchState; count }>()
);

export const loadVehiclesFailure = createAction(
  '[Search page] Load Vehicles Failure',
  props<{ error: any }>()
);

export const pageChange = createAction(
  '[Search page] Page change',
  props<{ pager }>()
);

export const pageChangeSuccess = createAction(
  '[Search page] Page change Success',
  props<{ vehicles; count }>()
);

export const pageChangeFailure = createAction(
  '[Search page] Page change Failure',
  props<{ error: any }>()
);
export const setFilters = createAction(
  '[Search page] Sets new Filers ',
  props<{ filters }>()
);
