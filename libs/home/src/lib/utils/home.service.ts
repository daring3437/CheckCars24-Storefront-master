import { Injectable } from '@angular/core';
import { environment } from '@checkcars/environment/environment';
import { HttpClient } from '@angular/common/http';
import buildQuery from 'odata-query';
@Injectable()
export class HomeService {
  private search_url: string = environment.vehicle;
  constructor(private http: HttpClient) {}

  getPremiumVehicles() {
    const odataQuery = buildQuery({
      filter: {
        topDealScore: {
          ge: 0.99,
        },
        publish: 2,
      },
    });
    return this.http.get(`${this.search_url}&${odataQuery.substr(1)}`);
  }
}
