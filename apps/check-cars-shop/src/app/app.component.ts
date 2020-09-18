import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { SharedFacade, LocalStorageService } from '@checkcars/shared';

@Component({
  selector: 'checkcars-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   *
   */
  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private sharedFacade: SharedFacade,
    private localStorageService: LocalStorageService
  ) {
    //todo should be moved into a initzialization effect ngrx
    this.sharedFacade.loadVatKey();
    this.sharedFacade.loadParameters();

    this.translate.addLangs(['en', 'de', 'ru', 'ar', 'fr']);
    this.translate.setDefaultLang('de');

    const sharedCookie = this.localStorageService.getSavedState(
      '__checkcars_shared_storage__'
    );

    //Code not working
    //If there is a language set in the  cookies
    this.sharedFacade.setLanguage('de');
    /*     if (sharedCookie.langIso) {
      this.translate.use(sharedCookie.langIso);
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      //This part is not functional causes a glitch
      const browserLang = this.translate.getBrowserLang();
      const hasTranslation = browserLang.match(/en|de|ru|ar|fr/);
      this.translate.use(hasTranslation ? browserLang : 'de');
    } else {
      this.translate.use('de');
      this.sharedFacade.setLanguage('de');
    } */
  }
}
