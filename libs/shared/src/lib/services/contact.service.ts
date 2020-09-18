import { Injectable } from '@angular/core';
import { environment } from '@checkcars/environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private post_leads = environment.post_leads;
  private post_leads_contact = environment.post_leads_contact;
  constructor(private http: HttpClient) {}

  sendOfferRequest(request) {
    return this.http.post(`${this.post_leads}`, request);
  }
  sendRequest(request) {
    return this.http.post(`${this.post_leads_contact}`, request);
  }
}
