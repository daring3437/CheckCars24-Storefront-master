import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@checkcars/environment/environment';
import { Observable, forkJoin } from 'rxjs';
import { map, tap, pluck } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ParameterService {
  private url_paramaters: string = environment.parameters;
  private url_models: string = environment.models;
  private url_vatKey: string = environment.vatkey_get;
  constructor(
    private http: HttpClient,
    private localstorageService: LocalStorageService
  ) {}

  getVatKey(vatkey): Observable<{ VatKey: number; Rate: number }> {
    return this.http.get<{ VatKey: number; Rate: number }>(
      `${this.url_vatKey}`,
      {
        params: {
          vatKey: vatkey,
        },
      }
    );
  }

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
  getParameters(paramKey) {
    return this.http.get(`${this.url_paramaters}`, {
      params: {
        key: paramKey,
      },
    });
  }
  //todo move to search params
  getSearchParameters() {
    const languageIso = this.localstorageService.getSavedState(
      '__checkcars_shared_storage__'
    ).langIso;
    const keys = [
      'ManufacturerName',
      `Fueltype_${languageIso}`,
      `BodyTypeTag_${languageIso}`,
      `TransmissionType_${languageIso}`,
    ];
    const requestArray = keys.map((key) =>
      this.http
        .get(`${this.url_paramaters}`, {
          params: {
            key: key,
          },
        })
        .pipe(
          map((res) => {
            if (res['Key'] === 'ManufacturerName') {
              return res;
              /*  return {
                Key: res['Key'],
                Values: res['Values'].sort((a, b) => {
                  if (a.value < b.value) {
                    return -1;
                  }
                  if (a.value > b.value) {
                    return 1;
                  }
                  return 0;
                }),
              }; */
            } else {
              return {
                Key: res['Key'].substring(0, res['Key'].length - 3),

                Values: res['Values'],
                /*    .sort((a, b) => {
                  if (a.Value < b.Value) {
                    return -1;
                  }
                  if (a.Value > b.Value) {
                    return 1;
                  }
                  return 0;
                }), */
              };
            }
          })
        )
    );

    return forkJoin(requestArray);
  }
}
