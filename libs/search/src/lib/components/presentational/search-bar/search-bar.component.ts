import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  EventEmitter,
  Output,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Options, LabelType } from 'ng5-slider';
import {
  FormControl,
  FormBuilder,
  FormArray,
  Validators,
  FormGroup,
} from '@angular/forms';
import { SearchService } from '../../../services/search.service';
import { SearchFacade } from '../../../+state/search.facade';
import { LocalStorageService } from '@checkcars/shared';
import { isPlatformBrowser } from '@angular/common';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'checkcars-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnChanges, OnChanges {
  @ViewChild('auto') auto;
  @Output() filterChange = new EventEmitter(null);
  @Input() parameters = [];
  @Input() routerAndParam;

  isBrowser = false;

  filters;

  selectedManufactures = [];

  selectedType = 'Finanzierung';
  minValue = 0;
  maxValue = 1000;

  options: Options = {
    floor: 0,
    ceil: 1000,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return `${value} €`;
        case LabelType.High:
          return `${value} €`;
        default:
          return `${value} €`;
      }
    },
  };
  searchForm;
  constructor(
    private searchService: SearchService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    @Inject(PLATFORM_ID) private platformId
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  patchManufacturers() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.initSearchForm();

    if (changes['routerAndParam'] && changes['routerAndParam'].currentValue) {
      this.parameters = changes['routerAndParam'].currentValue[1];
      const query = changes['routerAndParam'].currentValue[0];

      /*       if (this.localStorageService.getSavedState('__check_query_storage__')) {
        this.filters = this.localStorageService.getSavedState(
          '__check_query_storage__'
        ).filters;
      } */

      //Default scenario topDealerScore search
      if (Object.keys(query).length === 0) {
        this.addCheckboxes('fuelTypes', this.parameters[1]['Values']);
        this.addCheckboxes('BodyTypeTag', this.parameters[2]['Values']);
        this.addCheckboxes('TransmissionType', this.parameters[3]['Values']);
        this.selectedManufactures = [];
        return;
      }

      //Handle conversin
      this.selectedManufactures = [];

      if (query.manufacturers) {
        let mf;
        if (query.manufacturers.slice(-1) === ',') {
          mf = query.manufacturers.slice(0, query.manufacturers.length - 1);
        }
        const mfRq = [];
        const mfandModels = mf.split(',').map((manufacturerAndModel) => {
          const splitted = manufacturerAndModel.split(':');
          const manufacturer = splitted[0];
          const models = splitted[1]
            .substring(0, splitted[1].length - 1)
            .split('-');
          mfRq.push(this.searchService.getVehicleModells(manufacturer));
          return {
            mf: manufacturer,
            models: models,
          };
        });
        forkJoin(mfRq).subscribe((res) => {
          res.forEach((res, index) => {
            const modellFormsArray = {
              Key: mfandModels[index].mf,
              Icon: this.parameters[0].Values.find(
                (manfuacturer) => manfuacturer.value === mfandModels[index].mf
              ).icon,
              Values: !res['Values']
                ? []
                : res['Values'].map((modellName) => {
                    return {
                      name: modellName,
                      selected: mfandModels[index].models.includes(modellName),
                    };
                  }),
            };

            this.selectedManufactures = [
              ...this.selectedManufactures,
              { ...modellFormsArray },
            ];
          });
        });
      }

      if (query.fuelTypes) {
        this.patchFormArray('fuelTypes', query.fuelTypes, this.parameters[1]);
      } else {
        this.addCheckboxes('fuelTypes', this.parameters[1]['Values']);
      }

      if (query.bodyTypeTag) {
        this.patchFormArray(
          'bodyTypeTag',
          query.bodyTypeTag,
          this.parameters[2]
        );
      } else {
        this.addCheckboxes('bodyTypeTag', this.parameters[2]['Values']);
      }

      if (query.transmissionType) {
        this.patchFormArray(
          'transmissionType',
          query.transmissionType,
          this.parameters[3]
        );
      } else {
        this.addCheckboxes('transmissionType', this.parameters[3]['Values']);
      }

      if (query.maxValue && query.minValue) {
        this.maxValue = query.maxValue;
        this.minValue = query.minValue;
      }
      if (query.type) {
        this.selectedType = query.type;
      }
      if (query.enginePower) {
        (this.searchForm
          .get('engine')
          .get('enginePower') as FormGroup).patchValue(query.enginePower);
      }
      if (query.enginePowerType) {
        (this.searchForm
          .get('engine')
          .get('enginePowerType') as FormGroup).patchValue(
          query.enginePowerType
        );
      }
    }
  }

  /*   ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    this.initSearchForm();

    if (changes['parameters'].currentValue.length !== 0) {
      if (this.localStorageService.getSavedState('__check_query_storage__')) {
        this.filters = this.localStorageService.getSavedState(
          '__check_query_storage__'
        ).filters;
      }
      console.log(this.filters);
      //No saved Satate
      console.log('!this.filters');
      console.log(!this.filters);

      if (!this.filters) {
        this.addCheckboxes('fuelTypes', this.parameters[1]['Values']);
        this.addCheckboxes('BodyTypeTag', this.parameters[2]['Values']);
        this.addCheckboxes('TransmissionType', this.parameters[3]['Values']);
        return;
      }

      this.selectedManufactures = this.filters.manufacturers || [];
      console.log(this.filters.fuelTypes);
      if (this.filters.fuelTypes) {
        this.patchFormArray('fuelTypes', this.filters.fuelTypes);
      } else {
        this.addCheckboxes('fuelTypes', this.parameters[1]['Values']);
      }
      console.log(this.filters.BodyTypeTag);
      if (this.filters.BodyTypeTag) {
        this.patchFormArray('BodyTypeTag', this.filters.BodyTypeTag);
      } else {
        this.addCheckboxes('BodyTypeTag', this.parameters[2]['Values']);
      }

      if (this.filters.TransmissionType) {
        this.patchFormArray('TransmissionType', this.filters.TransmissionType);
      } else {
        this.addCheckboxes('TransmissionType', this.parameters[3]['Values']);
      }

      this.maxValue = this.filters.maxValue;
      this.minValue = this.filters.minValue;

      this.selectedType = this.filters.type;

      if (this.filters.engine) {
        (this.searchForm.get('engine') as FormGroup).patchValue(
          this.filters.engine
        );
      }
    }
  } */

  ngOnInit() {
    //Patch form
  }
  patchFormArray(formArrayName, valueArray, parameters) {
    //Can be immuatable with an assignment insted of pushing elements
    const a = valueArray.split(',');

    parameters['Values'].forEach(({ Key, Value }) => {
      this.searchForm.get(formArrayName).push(
        this.fb.group({
          name: [Value],
          value: [a.includes(Key)],
          key: [Key],
        })
      );
    });
  }

  initSearchForm() {
    this.searchForm = this.fb.group({
      fuelTypes: this.fb.array([]),
      bodyTypeTag: this.fb.array([]),
      transmissionType: this.fb.array([]),
      engine: this.fb.group({
        enginePower: [null, [Validators.max(500), Validators.min(100)]],
        enginePowerType: ['ps'],
      }),
    });
  }

  //Manufacturer model start

  selectEvent(manufacturer, type = null) {
    if (type === 'autocomplete') {
      this.auto.clear();
    }

    //If manufacturer is normalised could save this step
    const contains = this.selectedManufactures.findIndex(
      (manufact) => manufact.Key === manufacturer.value
    );

    if (contains !== -1) return;

    this.searchService
      .getVehicleModells(manufacturer.value)
      .subscribe((res: { Key: string; Values: Array<string> }) => {
        const modellFormsArray = {
          Key: manufacturer.value,
          Icon: manufacturer.icon,
          Values: res['Values'].map((modellName) => {
            return { name: modellName, selected: false };
          }),
        };

        this.selectedManufactures = [
          ...this.selectedManufactures,
          { ...modellFormsArray },
        ];
      });
  }

  public removeManufacturer(manufacturerKey) {
    this.selectedManufactures = this.selectedManufactures.filter(
      (manufact) => manufact.Key !== manufacturerKey
    );
  }
  //Manufacturer model end
  get fuelTypesFormArray() {
    return this.searchForm.controls.fuelTypes as FormArray;
  }
  get bodyTypeTagFormArray() {
    return this.searchForm.controls.bodyTypeTag as FormArray;
  }
  get transmissionTypesFormArray() {
    return this.searchForm.controls.transmissionType as FormArray;
  }

  //Manufacturer fuel types start

  private addCheckboxes(formArray: string, valueArray: Array<string>) {
    valueArray.forEach((parameter) =>
      this.searchForm.get(lowercaseFirstLetter(formArray)).push(
        this.fb.group({
          name: [parameter['Value']],
          value: [false],
          key: [parameter['Key']],
        })
      )
    );
  }

  setPrice(e) {
    this.minValue = e.minValue;
    this.maxValue = e.maxValue;
  }
  setType(type: string) {
    this.selectedType = type;
  }
  search() {
    this.filterChange.emit({
      manufacturers: this.selectedManufactures,
      ...this.searchForm.value,
      minValue: this.minValue,
      maxValue: this.maxValue,
      type: this.selectedType,
    });
  }
}
//capitalize only the first letter of the string.
function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
