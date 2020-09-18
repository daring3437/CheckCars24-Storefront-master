import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@checkcars/environment/environment';
import { forkJoin } from 'rxjs';
import buildQuery from 'odata-query';
import { LocalStorageService } from '@checkcars/shared';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private url_paramaters: string = environment.parameters;
  private url_models: string = environment.models;
  private search_vehicles_url: string = environment.vehicle;
  private buildQuery = buildQuery;

  constructor(
    private http: HttpClient,
    private localstorageService: LocalStorageService
  ) {}

  //TODO: should be moved to the shared parameter service
  getManufacturers() {
    return this.http.get(`${this.url_paramaters}`, {
      params: {
        key: 'ManufacturerName',
      },
    });
  }

  getVehicleModells(manufacturer) {
    return this.http.get(`${this.url_models}`, {
      params: {
        key: manufacturer,
      },
    });
  }

  getVehicles(searchState) {
    const { top, skip } = searchState;

    const type = 'creditCondition';

    const select = [...odataSelection, type] as Array<any>;
    const orderBy = [searchState.sort ? searchState.sort : 'topDealScore desc'];

    const filter = this.buildFilterNew(searchState);

    // orderBy:"topDealScore desc",
    const odataQuery = this.buildQuery({
      select,
      count: true,
      top,
      skip,
      filter,
      orderBy,
    }).substr(1);
    return this.http.get(`${this.search_vehicles_url}&${odataQuery}`);
  }

  buildFilterNew(searchState) {
    if (Object.keys(searchState).length === 0)
      return [
        {
          topDealScore: {
            ge: 0.9,
          },
          publish: 2,
        },
      ];
    let filter = [];
    //Publish state 2 === active vehicles
    filter.push({ publish: 2 });
    //Fuel Types
    if (searchState.fuelTypes) {
      const fuelTypes = {
        any: {
          or: [],
        },
      };
      searchState.fuelTypes.split(',').forEach((fuelType) => {
        fuelTypes.any.or.push({ name: fuelType });
      });

      filter.push({ fuelTypes });
    }

    // Transmission filter
    if (searchState.transmissionType) {
      const or = [];
      searchState.transmissionType.split(',').forEach((transmissionType) => {
        or.push({ transmissionType: transmissionType });
      });
      filter.push({ or: or });
    }

    // Body Type Tag filter
    if (searchState.bodyTypeTag) {
      const or = [];
      searchState.bodyTypeTag.split(',').forEach((bodyTypeTag) => {
        or.push({ bodyTypeTag: bodyTypeTag });
      });
      filter.push({ or: or });
    }
    //min max value and type

    if (
      searchState.minValue !== null &&
      searchState.minValue !== undefined &&
      searchState.maxValue !== null &&
      searchState.maxValue !== undefined
    ) {
      //Todo: if the value would be credit condtion or leasingCondtion this comparsion would be unessesary
      const type =
        searchState.type === 'Finanzierung'
          ? 'creditCondition'
          : 'leasingCondition';

      const paymentType = this.localstorageService.getSavedState(
        '__checkcars_shared_storage__'
      ).paymentType;

      if (!paymentType) {
        throw new Error("Can't set paymentTypes");
      }
      filter.push({
        [type]: {
          [paymentType === 1 ? 'rateGross' : 'rateNet']: {
            gt: parseInt(searchState.minValue),
            lt: parseInt(searchState.maxValue),
          },
        },
      });
    }

    if (searchState.enginePower && searchState.enginePowerType) {
      if (searchState.enginePowerType === 'ps') {
        filter.push({
          enginePowerPsSearch: {
            gt: parseInt(searchState.enginePower),
          },
        });
        //KWH
      } else {
        filter.push({
          enginePowerKwSearch: { gt: parseInt(searchState.enginePower) },
        });
      }
    }

    if (searchState.manufacturers) {
      const or = [];
      let mf;

      if (searchState.manufacturers.slice(-1) === ',') {
        mf = searchState.manufacturers.slice(
          0,
          searchState.manufacturers.length - 1
        );
      }

      mf.split(',').forEach((manufacturerAndModel) => {
        const splitted = manufacturerAndModel.split(':');
        const manufacturer = splitted[0];
        const models = splitted[1]
          .substring(0, splitted[1].length - 1)
          .split('-');
        let manufactueres: any = {
          and: { manufacturerName: manufacturer, or: [] },
        };
        models.forEach((model) => {
          if (model === '') {
            manufactueres = { manufacturerName: manufacturer, or: [] };
            return;
          }
          manufactueres.and.or.push({ model });
        });
        or.push(manufactueres);
      });

      filter.push({ or: or });
    }
    return filter;
  }

  buildFilter({ filters }) {
    const filter = [];

    //Only filter for published
    filter.push({ publish: 2 });
    if (filters.topDealScore)
      filter.push({
        topDealScore: {
          ge: 0.9,
        },
      });

    // Fuel type filter
    if (filters.fuelTypes) {
      const fuelTypes = {
        any: {
          or: [],
        },
      };
      filters.fuelTypes.forEach((fuelType) => {
        if (fuelType.value === true) {
          fuelTypes.any.or.push({ name: fuelType.key });
        }
      });
      filter.push({ fuelTypes });
    }
    // Transmission filter
    if (filters.transmissionType) {
      const or = [];
      filters.transmissionType.forEach((transmissionType) => {
        if (transmissionType.value === true) {
          or.push({ transmissionType: transmissionType.key });
        }
      });
      filter.push({ or: or });
    }

    // Body Type Tag filter
    if (filters.BodyTypeTag) {
      const or = [];
      filters.BodyTypeTag.forEach((bodyTypeTag) => {
        if (bodyTypeTag.value === true) {
          or.push({ bodyTypeTag: bodyTypeTag.key });
        }
      });
      filter.push({ or: or });
    }

    // Price filter

    if (
      filters.minValue !== null &&
      filters.minValue !== undefined &&
      filters.maxValue !== null &&
      filters.maxValue !== undefined
    ) {
      //Todo: if the value would be credit condtion or leasingCondtion this comparsion would be unessesary
      const type =
        filters.type === 'Finanzierung'
          ? 'creditCondition'
          : 'leasingCondition';
      const paymentType = this.localstorageService.getSavedState(
        '__checkcars_shared_storage__'
      ).paymentType;
      if (!paymentType) {
        throw new Error("Can't set paymentTypes");
      }
      filter.push({
        [type]: {
          [paymentType === 1 ? 'rateGross' : 'rateNet']: {
            gt: filters.minValue,
            lt: filters.maxValue,
          },
        },
      });
    }
    // Engine power filter

    if (filters.engine && filters.engine.enginePower) {
      if (filters.engine.type === 'ps') {
        filter.push({
          enginePowerPsSearch: {
            gt: filters.engine.enginePower,
          },
        });
      } else {
        filter.push({
          enginePowerKwSearch: { gt: filters.engine.enginePower },
        });
      }
    }

    // Manufacturer and Model filter filter
    if (filters.manufacturers) {
      const or = [];

      filters.manufacturers.forEach((mf) => {
        let hasSelectedModel = false;

        const manufactueres = {
          and: { manufacturerName: mf.Key, or: [] },
        };
        mf.Values.forEach((element) => {
          if (element.selected === true) {
            hasSelectedModel = true;
            (manufactueres.and.or as Array<unknown>).push({
              model: element.name,
            });
          }
        });
        if (hasSelectedModel) {
          or.push(manufactueres);
        } else {
          or.push({ manufacturerName: mf.Key });
        }
      });

      filter.push({ or: or });
    }
    return filter;
  }
}
const odataSelection = [
  'bodyTypeTag',
  'bulletPoints',
  'consumption',
  'enginePowerKwSearch',
  'enginePowerPsSearch',
  'fuelTypes',
  'id',
  'images',
  'manufacturerName',
  'meta',
  'model',
  'offerNumber',
  'priceGross',
  'priceNet',
  'publish',
  'rid',
  'searchTerm',
  'topDealScore',
  'transmissionType',
  'vehicleId',
];
