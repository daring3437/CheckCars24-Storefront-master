import { Injectable } from '@angular/core';
import {
  createEffect,
  Actions,
  ofType,
  ROOT_EFFECTS_INIT,
  OnInitEffects,
} from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromShared from './shared.reducer';
import * as SharedActions from './shared.actions';
import { INIT } from '@ngrx/store';
import { ParameterService } from '../services';
import { map } from 'rxjs/operators';
@Injectable()
export class SharedEffects {
  loadParameters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.loadParameters),
      fetch({
        run: (action) => {
          return this.parameterService.getSearchParameters().pipe(
            map((res) => {
              return SharedActions.loadParametersSuccess({ parameters: res });
            })
          );

          // Your custom service 'load' logic goes here. For now just return a success action...
        },

        onError: (action, error) => {
          return SharedActions.loadParametersFailure({ error });
        },
      })
    )
  );
  vatKey$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.loadVatKey),
      fetch({
        run: (action) => {
          return this.parameterService.getVatKey(10).pipe(
            map((res) => {
              return SharedActions.loadVatKeySuccess({
                vatRate: res.Rate,
              });
            })
          );
        },
        onError: (action, error) => {
          return SharedActions.loadSharedFailure({ error });
        },
      })
    )
  );

  loadShared$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.loadShared),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return SharedActions.loadSharedSuccess({ shared: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return SharedActions.loadSharedFailure({ error });
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private parameterService: ParameterService
  ) {}
}
