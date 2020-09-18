import {
  BrowserModule,
  TransferState,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mainRoutes } from './app.routing';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { RouterModule } from '@angular/router';

/* NGRX */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

/* Application modules */
import { LayoutModule } from './layout/layout.module';
import { environment } from '../environments/environment';

/* Components */
import { AppComponent } from './app.component';

/* Third party */
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { AngularSvgIconModule, SvgLoader } from 'angular-svg-icon';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SvgBrowserLoader } from './utils/loaders/svg-brwser-loader';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { NgrxRouterStoreModule } from '@checkcars/ngrx-router';

/* SVG Loader start */
export function svgLoaderFactory(
  http: HttpClient,
  transferState: TransferState
) {
  return new SvgBrowserLoader(transferState, http);
}
/* SVGLoader end */

/* Translation loader start */
export function HttpLoaderFactory(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    { prefix: './assets/i18n/home/', suffix: '.json' },
    { prefix: './assets/i18n/widgets/', suffix: '.json' },
    { prefix: './assets/i18n/search/', suffix: '.json' },
    { prefix: './assets/i18n/details/', suffix: '.json' },
    { prefix: './assets/i18n/contact/', suffix: '.json' },
    { prefix: './assets/i18n/favorite/', suffix: '.json' },
  ]);
}
/* Translation loader end */
@NgModule({
  declarations: [AppComponent],
  imports: [
    NgrxRouterStoreModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    RouterModule.forRoot(mainRoutes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
      initialNavigation: 'enabled',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AngularSvgIconModule.forRoot({
      loader: {
        provide: SvgLoader,
        useFactory: svgLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
    TransferHttpCacheModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
