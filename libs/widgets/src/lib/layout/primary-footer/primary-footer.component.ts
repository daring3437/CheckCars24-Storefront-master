import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService, SharedFacade } from '@checkcars/shared';
import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@checkcars/environment/environment';
@Component({
  selector: 'checkcars-primary-footer',
  templateUrl: './primary-footer.component.html',
  styleUrls: ['./primary-footer.component.scss'],
})
export class PrimaryFooterComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  version: string = environment.version;
  type: string = environment.type;

  translationsArray = [
    { value: 0, iso: 'de', label: 'German' },
    { value: 1, iso: 'en', label: 'English' },
    { value: 2, iso: 'ru', label: 'Russian' },
    { value: 3, iso: 'ar', label: 'Arabic' },
    { value: 4, iso: 'fr', label: 'French' },
  ];
  selectedLanguage = null;

  constructor(
    private translateService: TranslateService,
    private sharedFacade: SharedFacade,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.sharedFacade.language$.pipe(take(1)).subscribe((res) => {
      this.selectedLanguage = res;
    });
  }

  languageChange() {
    this.sharedFacade.setLanguage(this.selectedLanguage);
    this.translateService.use(this.selectedLanguage);
    this.localStorageService.removeCookie('__check_query_storage__');
    this.router.navigateByUrl(this.router.url);
  }
  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
