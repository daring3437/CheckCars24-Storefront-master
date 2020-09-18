import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromSearch from './search.reducer';
import * as SearchSelectors from './search.selectors';
import * as fromActions from './search.actions';

@Injectable()
export class SearchFacade {
  parameters$ = this.store.pipe(select(SearchSelectors.getParameters));
  vehicles$ = this.store.pipe(select(SearchSelectors.getAllVehicles));
  /*   filterState$ = this.store.pipe(select(SearchSelectors.getFilterState));
  queryState$ = this.store.pipe(select(SearchSelectors.getQueryState)); */
  /*   pageState$ = this.store.pipe(select(SearchSelectors.getPager));
  pagerCount$ = this.store.pipe(select(SearchSelectors.getPagerCount)); */
  sState$ = this.store.pipe(select(SearchSelectors.getSState));
  paramsWithQueryParams$ = this.store.pipe(
    select(SearchSelectors.getParamsWithQueryParams)
  );
  constructor(private store: Store<fromSearch.SearchPartialState>) {}

  loadParameters() {
    this.store.dispatch(fromActions.loadParameters());
  }
  pageChage({ pager }) {
    this.store.dispatch(fromActions.pageChange({ pager }));
  }
  loadVehicles(searchState) {
    this.store.dispatch(fromActions.loadVehicles(searchState));
  }
  setFilters(filters) {
    this.store.dispatch(fromActions.setFilters(filters));
  }
}
