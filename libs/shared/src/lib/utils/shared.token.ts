import { InjectionToken } from '@angular/core';
import { StoreConfig } from '@ngrx/store/src/store_module';
import * as fromReducer from '../+state/shared.reducer';

export const SHARED_STORAGE_KEYS = new InjectionToken<
  keyof fromReducer.State[]
>('SharedStorageKeys');

export const SHARED_LOCAL_STORAGE_KEY = new InjectionToken<string[]>(
  'SharedStorage'
);
export const SHARED_CONFIG_TOKEN = new InjectionToken<
  StoreConfig<fromReducer.State, any>
>('SharedConfigToken');
