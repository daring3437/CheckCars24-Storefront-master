import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  SharedFacade,
  ParameterService,
  LocalStorageService,
} from '@checkcars/shared';
import { Observable, ReplaySubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { takeUntil, pluck } from 'rxjs/operators';
import { HomeService } from '../../../utils/home.service';

@Component({
  selector: 'checkcars-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  //Last viewed Carousel
  lastViewedVehicle$: Observable<any> = this.sharedFacade.lastViewdVehicles$;
  //Premium Carousel
  premiumCars = [];
  //Car Categories component
  categories = [];
  categoryParameters = [];

  features = [];

  favorites = [];
  premiumVehicles$: Observable<any>;
  translations;
  constructor(
    private sharedFacade: SharedFacade,
    private translateService: TranslateService,
    private parameterService: ParameterService,
    private router: Router,
    private localstorageService: LocalStorageService,
    private homeService: HomeService
  ) {}

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  searchForCategory(queryParam: string): void {
    this.localstorageService.setSavedState(
      {
        filters: {
          bodyTypeTagName: this.categoryParameters.map((category) => {
            if (category.queryParam === queryParam)
              return { ...category, value: true };

            return category;
          }),
        },
      },
      '__check_query_storage__'
    );
    this.router.navigate(['/search/'], {
      queryParams: { bodyTypeTag: queryParam },
    });
  }

  ngOnInit() {
    this.loadTranslations();
    this.loadBodyTypeTags();
    this.loadFavourites();
    this.loadPremiumVehicles();
  }

  loadPremiumVehicles() {
    this.premiumVehicles$ = this.homeService
      .getPremiumVehicles()
      .pipe(pluck('value'));
  }
  loadFavourites() {
    this.sharedFacade.favoriteVehicles$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.favorites = res;
      });
  }
  loadBodyTypeTags() {
    this.parameterService.getParameters('BodyTypeTag').subscribe((res) => {
      this.categoryParameters = res['Values'].map((category) => ({
        name: category,
        selected: false,
      }));
    });
  }
  loadTranslations() {
    this.translateService.get('categories').subscribe((res) => {
      this.categories = [
        { name: res.l_cabrio, src: 'cabrio', queryParam: 'Cabrio' },
        { name: res.l_elektro, src: 'elektro', queryParam: 'Elektro-Hybrid' },
        { name: res.l_smallcar, src: 'kleinwagen', queryParam: 'Kleinwagen' },
        { name: res.l_combi, src: 'kombi', queryParam: 'Combi' },
        { name: res.l_compact, src: 'kompakt', queryParam: 'Kompakt' },
        { name: res.l_limusine, src: 'limousine', queryParam: 'Limousine' },
        { name: res.l_suv, src: 'suv', queryParam: 'SUV' },
        { name: res.l_van, src: 'van', queryParam: 'Kleinwagen' },
      ];
    });
    this.translateService.get('features').subscribe((res) => {
      this.features = [
        { name: res.l_tested, src: 'feature-1.svg', navigateTo: '' },
        { name: res.l_financing, src: 'feature-2.svg', navigateTo: '' },
        { name: res.l_delivery, src: 'feature-3.svg', navigateTo: '' },
        { name: res.l_guarantee, src: 'feature-4.svg', navigateTo: '' },
        { name: res.l_refund, src: 'feature-5.svg', navigateTo: '' },
      ];
    });
  }
}
