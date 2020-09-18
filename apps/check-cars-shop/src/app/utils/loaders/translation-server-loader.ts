import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as dp from 'deepmerge';
import { TransferState } from '@angular/platform-browser';

const fs = require('fs');
const join = require('path').join;
const parseUrl = require('url').parse;
const baseName = require('path').basename;

export interface ITranslationResource {
  prefix: string;
  suffix: string;
}

export class MultiTranslateHttpLoader implements TranslateLoader {
  constructor(
    private transferState: TransferState,
    private resources: ITranslationResource[]
  ) {}

  public getTranslation(lang: string): Observable<any> {
    const distFolder = join(
      process.cwd(),
      'dist/check-cars-shop/browser/assets/i18n'
    );

    let translationArray = [];
    this.resources.map((resource) => {
      const path = distFolder + resource.prefix + lang + resource.suffix;
      const data = JSON.parse(fs.readFileSync(path, 'utf8'));
      translationArray.push(data);
    });

    return new Observable((observer) => {
      // Here we save the translations in the transfer-state
      /*       const key: StateKey<number> = makeStateKey<number>('transfer-img:' + translationArray);
      this.transferState.set(key, svgData); */

      observer.next(dp.all(translationArray));
      observer.complete();
    });

    //return forkJoin(requests).pipe(map((response) => merge.all(response)));
  }
}
