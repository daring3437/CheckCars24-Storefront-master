import { InjectionToken } from '@angular/core';
import { StoreConfig } from '@ngrx/store/src/store_module';
import * as fromReducer from '../+state/search.reducer';

export const SEARCH_STORAGE_KEYS = new InjectionToken<
  keyof fromReducer.State[]
>('SearchStorageKeys');

export const SEARCH_LOCAL_STORAGE_KEY = new InjectionToken<string[]>(
  'SearchStorage'
);
export const SEARCH_CONFIG_TOKEN = new InjectionToken<
  StoreConfig<fromReducer.State, any>
>('SearchConfigToken');
