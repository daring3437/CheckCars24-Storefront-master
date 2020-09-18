import { NgModule } from '@angular/core';
import {
  ServerModule,
  ServerTransferStateModule,
} from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { AngularSvgIconModule, SvgLoader } from 'angular-svg-icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TransferState } from '@angular/platform-browser';
import { SvgServerLoader } from './utils/loaders/svg-server-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from './utils/loaders/translation-server-loader';
/* SVG start */
export function svgLoaderFactory(
  http: HttpClient,
  transferState: TransferState
) {
  return new SvgServerLoader('assets/icons/svg', transferState);
}
/* SVG end */
/* Tranaslation start */
export function HttpLoaderFactory(trf: TransferState) {
  return new MultiTranslateHttpLoader(trf, [
    { prefix: '/home/', suffix: '.json' },
    { prefix: '/widgets/', suffix: '.json' },
    { prefix: '/search/', suffix: '.json' },
    { prefix: '/details/', suffix: '.json' },
  ]);
}
/* Tranaslation end */
@NgModule({
  imports: [
    AppModule,
    ServerModule,
    HttpClientModule,
    ServerTransferStateModule,
    AngularSvgIconModule.forRoot({
      loader: {
        provide: SvgLoader,
        useFactory: svgLoaderFactory,
        deps: [HttpClient, TransferState],
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [TransferState],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
