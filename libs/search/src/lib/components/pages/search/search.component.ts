import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchFacade } from '../../../+state/search.facade';
import {
  map,
  takeUntil,
  take,
  skipUntil,
  skipWhile,
  tap,
} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService, SharedFacade } from '@checkcars/shared';
import { ReplaySubject, combineLatest } from 'rxjs';
import { SearchBarComponent } from '../../presentational/search-bar/search-bar.component';
import { NgrxRouterFacade } from '@checkcars/ngrx-router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'checkcars-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  @ViewChild(SearchBarComponent) searchBarComponent: SearchBarComponent;
  sortControl = new FormControl('topDealScore desc');
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  filters;
  showSidebar = false;
  parameters;
  vehicles;
  favoriteVehicles;

  searchState;
  queryParams = {
    skip: 0,
    top: 3,
  };

  count = null;
  top = 3;
  priceType: 1;

  routerAndParam;
  constructor(
    private searchFacade: SearchFacade,
    private router: Router,
    private localStorageService: LocalStorageService,
    private route: ActivatedRoute,
    private sharedFacade: SharedFacade,
    private ngrxRouterFacade: NgrxRouterFacade
  ) {}

  ngOnInit() {
    this.searchFacade.loadParameters();
    this.initFavouriteSubscription();
    this.initPriceTypeSubscription();
    this.initVehiclesSubscription();
    this.loadRouterAndParms();

    this.ngrxRouterFacade.queryParams$.pipe(take(1)).subscribe((res) => {
      this.searchFacade.loadVehicles({ searchState: res });
    });

    this.searchFacade.sState$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((searchState) => {
        this.count = searchState.count;
      });

    // this.getParameters();

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  loadRouterAndParms() {
    const req1 = this.ngrxRouterFacade.queryParams$.pipe(take(1));
    const req2 = this.sharedFacade.parameters$.pipe(
      skipWhile((val) => val.length === 0),
      take(1)
    );

    combineLatest([req1, req2])
      .pipe(take(1))
      .subscribe((res) => {
        this.routerAndParam = res;
      });
    /* this.ngrxRouterFacade.queryParams$
    .pipe(takeUntil(this.destroyed$))
    .subscribe((res) => {
      console.log(res);
    }); */
  }
  initPriceTypeSubscription() {
    this.sharedFacade.paymentTypeToggle$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.priceType = res;
      });
  }
  initFavouriteSubscription() {
    this.sharedFacade.favoriteVehicles$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.favoriteVehicles = res;
      });
  }
  initVehiclesSubscription() {
    this.searchFacade.vehicles$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.vehicles = res;
      });
  }
  pageChange(pageNumber: number): void {
    const searchState = {
      top: this.top,
      skip: this.top * (pageNumber - 1),
      filter: this.queryParams['filter'],
    };

    this.reload(searchState, pageNumber);
  }

  reload(searchState, page) {
    //todo:query build should be moved to serach bar
    /*    this.localStorageService.setSavedState(
      searchState,
      '__check_query_storage__'
    ); */
    let queryParam = '';

    const { filters } = searchState;

    //Converstions to queryParams
    Object.keys(filters).forEach((key) => {
      if (
        key === 'bodyTypeTag' ||
        key === 'transmissionType' ||
        key === 'fuelTypes'
      ) {
        let paramNameCollection = '';
        filters[key].forEach((param) => {
          if (!param.value) return;
          if (paramNameCollection === '') {
            paramNameCollection += `${param.key}`;
          } else {
            paramNameCollection += `,${param.key}`;
          }
        });
        if (paramNameCollection !== '') {
          queryParam += `&${key}=${paramNameCollection}`;
        }
      }

      if (key === 'minValue' || key === 'maxValue' || key === 'type') {
        queryParam += `&${key}=${filters[key]}`;
      }

      if (key === 'engine') {
        if (filters[key]['enginePower']) {
          queryParam += `&enginePower=${filters[key]['enginePower']}`;
        }
        if (filters[key]['enginePowerType']) {
          queryParam += `&enginePowerType=${filters[key]['enginePowerType']}`;
        }
      }

      if (key === 'manufacturers') {
        let mfs = `&${key}=`;

        let selectedMfandModel = '';
        filters[key].forEach((manufacturer) => {
          mfs += `${manufacturer['Key']}:`;
          manufacturer.Values.forEach((model) => {
            if (model.selected) {
              selectedMfandModel += `${model.name}-`;
            }
          });
          mfs += `${selectedMfandModel},`;
          selectedMfandModel = '';
        });

        queryParam += mfs;
      }
    });
    const sortOption = this.sortControl.value;
    if (sortOption !== null || sortOption !== 'topDealScore desc') {
      queryParam += `&sort=${sortOption}`;
    }
    this.router.navigateByUrl(`/search?${queryParam.substring(1)}`);
  }

  getParameters() {
    this.searchFacade.parameters$
      .pipe(
        map((parameter) => {
          return parameter;
        })
      )
      .subscribe((res) => {
        this.parameters = res;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  removeFilter(e) {
    this.searchBarComponent.removeManufacturer(e);
  }

  filterChange(filters) {
    //If we are on mobile close sidebar
    if (this.showSidebar) this.showSidebar = false;
    const searchState = {
      ...this.queryParams,
      filters,
    };
    this.reload(searchState, null);
  }

  opentFilter() {
    this.showSidebar = !this.showSidebar;
  }
}
