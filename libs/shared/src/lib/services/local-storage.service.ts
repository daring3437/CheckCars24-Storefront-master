import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private cookieService: CookieService
  ) {}

  setSavedState(state: any, localStorageKey: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    }
    /*     console.log(state);
    console.log(localStorageKey, JSON.stringify(state));
    console.log('removing cookie');
    this.removeCookie(localStorageKey);
    this.getSavedState('__checkcars_shared_storage__');
    console.log('setting cookie');
    this.cookieService.set(localStorageKey, JSON.stringify(state));
    this.getSavedState('__checkcars_shared_storage__'); */
  }
  removeCookie(cookieName: string): void {
    this.cookieService.delete(cookieName);
  }
  getSavedState(localStorageKey: string): any {
    console.log('getting state');
    if (isPlatformBrowser(this.platformId)) {
      let lc = JSON.parse(localStorage.getItem(localStorageKey));
      if (lc) {
        return lc;
      }
      return {};
    }

    /* const cookieString = this.cookieService.get(localStorageKey);
    console.log(cookieString);
    if (cookieString) {
      return JSON.parse(cookieString);
    }
    return {}; */
  }
}
