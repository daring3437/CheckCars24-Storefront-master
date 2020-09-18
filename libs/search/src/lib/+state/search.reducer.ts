import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SearchActions from './search.actions';
import { SearchEntity } from './search.models';

export const SEARCH_FEATURE_KEY = 'search';

export interface State extends EntityState<SearchEntity> {
  selectedId?: string | number; // which Search record has been selected
  loaded: boolean; // has the Search list been loaded
  error?: string | null; // last none error (if any)
  parameters: Array<any>;
  searchState: SearchSate;
}
export interface SearchSate {
  top: number;
  count: number;
  skip: number;
  searchForm: any;
}
export interface Pager {
  skip: number;
  top: number;
}
export interface SearchPartialState {
  readonly [SEARCH_FEATURE_KEY]: State;
}

export const searchAdapter: EntityAdapter<SearchEntity> = createEntityAdapter<
  SearchEntity
>();

export const initialState: State = searchAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  parameters: [],

  searchState: {
    count: null,
    skip: 0,
    top: 40,
    searchForm: {},
  },
});

const searchReducer = createReducer(
  initialState,
  on(SearchActions.loadSearch, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(SearchActions.loadSearchSuccess, (state, { search }) =>
    searchAdapter.addAll(search, { ...state, loaded: true })
  ),
  on(SearchActions.loadSearchFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  //new

  on(SearchActions.loadParametersSuccess, (state, { parameters }) => {
    return {
      ...state,
      parameters: parameters,
    };
  }),

  on(SearchActions.loadParametersFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(SearchActions.loadVehiclesSuccess, (state, { vehicles, count }) => {
    return searchAdapter.setAll(vehicles, {
      ...state,
      loaded: true,
      searchState: {
        ...state.searchState,
        count: count,
      },
    });
  }),
  on(SearchActions.loadVehiclesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  on(SearchActions.setFilters, (state, { filters }) => ({
    ...state,
    searchState: {
      ...state.searchState,
      filters: { ...filters },
    },
  })),
  on(SearchActions.pageChange, (state, { pager }) => ({
    ...state,
    pager: pager,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return searchReducer(state, action);
}
