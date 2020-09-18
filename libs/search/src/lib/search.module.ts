import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { searchRoutes } from './search.routes';

import {
  ProductCardModule,
  CollapseModule,
  AdvertisementModule,
  SidebarModule,
} from '@checkcars/widgets';

import { SearchComponent } from './components/pages/search/search.component';
import { SearchBarComponent } from './components/presentational/search-bar/search-bar.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromSearch from './+state/search.reducer';
import { SearchEffects } from './+state/search.effects';
import { SearchFacade } from './+state/search.facade';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { LocalStorageService, storageMetaReducer } from '@checkcars/shared';
import {
  SEARCH_LOCAL_STORAGE_KEY,
  SEARCH_STORAGE_KEYS,
  SEARCH_CONFIG_TOKEN,
} from './util/search-metareducer.token';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

export function getCoursesConfig(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService
) {
  return {
    metaReducers: [
      storageMetaReducer(saveKeys, localStorageKey, storageService),
    ],
  };
}

@NgModule({
  declarations: [SearchComponent, SearchBarComponent],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(searchRoutes),
    ProductCardModule,
    CollapseModule,
    NgxSliderModule,
    AdvertisementModule,
    FormsModule,
    AutocompleteLibModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromSearch.SEARCH_FEATURE_KEY, fromSearch.reducer),
    EffectsModule.forFeature([SearchEffects]),
    NgxPaginationModule,
    SidebarModule,
    TranslateModule,
    AngularSvgIconModule,
  ],
  providers: [SearchFacade],
})
export class SearchModule {}
