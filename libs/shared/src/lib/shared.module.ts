import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromShared from './+state/shared.reducer';
import { SharedEffects } from './+state/shared.effects';
import { SharedFacade } from './+state/shared.facade';
import { LocalStorageService } from './services';
import { sharedMetaReducer } from './meta-reducers/shared-metareducer';
import { TranslateModule } from '@ngx-translate/core';
import {
  SHARED_LOCAL_STORAGE_KEY,
  SHARED_STORAGE_KEYS,
  SHARED_CONFIG_TOKEN,
} from './utils/shared.token';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ImgFallbackModule } from 'ngx-img-fallback';
export function getCoursesConfig(
  saveKeys: string[],
  localStorageKey: string,
  storageService: LocalStorageService
) {
  return {
    metaReducers: [
      sharedMetaReducer(saveKeys, localStorageKey, storageService),
    ],
  };
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(
      fromShared.SHARED_FEATURE_KEY,
      fromShared.reducer,
      SHARED_CONFIG_TOKEN
    ),
    EffectsModule.forFeature([SharedEffects]),
    TranslateModule,
    AngularSvgIconModule,
    ImgFallbackModule,
  ],
  providers: [
    {
      provide: SHARED_LOCAL_STORAGE_KEY,
      useValue: '__checkcars_shared_storage__',
    },
    {
      provide: SHARED_STORAGE_KEYS,
      useValue: [
        'paymentType',
        'lastViewed',
        'vatKey',
        'langIso',
        'favoriteVehicles',
        'parameters',
      ],
    },
    {
      provide: SHARED_CONFIG_TOKEN,
      deps: [
        SHARED_STORAGE_KEYS,
        SHARED_LOCAL_STORAGE_KEY,
        LocalStorageService,
      ],
      useFactory: getCoursesConfig,
    },
  ],
  exports: [TranslateModule, AngularSvgIconModule, ImgFallbackModule],
})
export class SharedModule {
  constructor() {
    console.log('Shared module created');
  }
}
