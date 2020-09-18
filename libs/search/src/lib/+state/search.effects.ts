import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType, act } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';
import * as fromSearch from './search.reducer';
import * as SearchActions from './search.actions';
import { SearchService } from '../services/search.service';

@Injectable()
export class SearchEffects {
  /*   loadParameters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadParameters),
      fetch({
        run: (action) => {
          return this.searchService.getSearchParameters().pipe(
            map((res) => {
              console.log({ parameters: res });
              return SearchActions.loadParametersSuccess({ parameters: res });
            })
          );

          // Your custom service 'load' logic goes here. For now just return a success action...
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SearchActions.loadParametersFailure({ error });
        },
      })
    )
  ); */

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadVehicles),
      fetch({
        run: (action) => {
          // pass the query params action.queryParams
          return this.searchService.getVehicles(action.searchState).pipe(
            map((res: any) => {
              return SearchActions.loadVehiclesSuccess({
                vehicles: res.value,
                searchState: action.searchState,
                count: res['@odata.count'],
              });
            })
          );
        },
        onError: (action, error) => {
          return SearchActions.loadVehiclesFailure({ error });
        },
      })
    )
  );
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}
}
