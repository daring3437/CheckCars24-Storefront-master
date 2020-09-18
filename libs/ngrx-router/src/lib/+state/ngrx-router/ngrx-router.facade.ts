import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromSelectors from './ngrx-router.selectors';

@Injectable({
  providedIn: 'root',
})
export class NgrxRouterFacade {
  queryParams$ = this.store.pipe(select(fromSelectors.getqueryParams));

  constructor(private store: Store<any>) {}
}
