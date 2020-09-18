import {
  Component,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '@checkcars/search';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'checkcars-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  manufacturerSub: Subscription;
  selectedManufacturer;
  searchForm: FormGroup;
  parameters;
  modell;
  minValue: number = 0;
  maxValue: number = 1000;

  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `<b>Min price:</b> ${value} €`;
        case LabelType.High:
          return `<b>Max price:</b> ${value} €`;
        default:
          return `${value} €`;
      }
    },
  };
  serverSide: boolean = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private searchService: SearchService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngOnDestroy(): void {
    this.manufacturerSub.unsubscribe();
  }
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.serverSide = false;
    }
    this.getManufacturers();
    this.ctorSearchForm();
    this.setUpValueChagnes();
  }
  ctorSearchForm() {
    this.searchForm = this.fb.group({
      manufacturerName: [null, Validators.required],
      modell: [{ value: null, disabled: true }, Validators.required],
      type: ['Finanzierung', Validators.required],
      minValue: ['', Validators.required],
      maxValue: ['', Validators.required],
    });
  }
  getManufacturers() {
    this.searchService.getManufacturers().subscribe((res) => {
      this.parameters = res['Values'].map((parameter) => parameter.value);
    });
  }

  setUpValueChagnes() {
    let manufacturerName;

    this.manufacturerSub = this.searchForm
      .get('manufacturerName')
      .valueChanges.pipe(
        switchMap((res) => {
          manufacturerName = res;
          this.searchForm.get('modell').enable();
          this.searchForm.get('modell').setValue(null);
          return this.searchService.getVehicleModells(res);
        })
      )
      .subscribe((res) => {
        this.searchForm.get('modell').reset();
        if (res['Values'] === null) {
          this.modell = [];
        } else {
          this.modell = [...res['Values']];
        }
        this.selectedManufacturer = { ...res, Key: manufacturerName };
        if (!this.selectedManufacturer['Values']) {
          this.selectedManufacturer['Values'] = [];
          return;
        }
        this.selectedManufacturer['Values'] = this.selectedManufacturer[
          'Values'
        ].map((value) => {
          return { selected: false, name: value };
        });
      });
  }

  get selectedType() {
    return this.searchForm.get('type').value;
  }

  search() {
    this.searchForm.patchValue({
      minValue: this.minValue,
      maxValue: this.maxValue,
    });

    let {
      manufacturerName,
      modell,
      ...validParams
    } = this.searchForm.getRawValue();

    if (!this.isNull(manufacturerName) && this.isNull(modell)) {
      validParams = { ...validParams, manufacturers: `${manufacturerName}:,` };
    }
    if (!this.isNull(manufacturerName) && !this.isNull(modell)) {
      validParams = {
        ...validParams,
        manufacturers: `${manufacturerName}:${modell}-,`,
      };
    }
    this.router.navigate(['/search/'], {
      queryParams: validParams,
    });

    /*     this.router.navigate(['/search/'], {
      queryParams: queryparamMap,
    }); */
  }
  //Does not consider 0
  isNull(toCheck) {
    return !toCheck || toCheck === 'null' ? true : false;
  }
  setType(type: string) {
    this.searchForm.get('type').patchValue(type);
  }
}
