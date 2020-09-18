import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromShared from './shared.reducer';
import * as SharedSelectors from './shared.selectors';
import * as actions from './shared.actions';

@Injectable({
  providedIn: 'root',
})
export class SharedFacade {
  parameters$ = this.store.pipe(select(SharedSelectors.getParameters));
  paymentTypeToggle$ = this.store.pipe(select(SharedSelectors.paymnetType));

  selectedShared$ = this.store.pipe(select(SharedSelectors.getSelected));

  vatRate$ = this.store.pipe(select(SharedSelectors.getVatRate));

  lastViewdVehicles$ = this.store.pipe(
    select(SharedSelectors.lastViewdVehicles)
  );

  favoriteVehicles$ = this.store.pipe(select(SharedSelectors.favoriteVehicles));
  language$ = this.store.pipe(select(SharedSelectors.language));

  constructor(private store: Store<fromShared.SharedPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
  loadVatKey() {
    this.store.dispatch(actions.loadVatKey());
  }
  loadParameters() {
    this.store.dispatch(actions.loadParameters());
  }
  changePaymentType() {
    this.store.dispatch(actions.togglePaymentType());
  }
  addToLastViwed(vehicle) {
    this.store.dispatch(actions.addToLastViewed(vehicle));
  }
  addFavorite(vehicle) {
    this.store.dispatch(actions.addFavorite({ vehicle }));
  }
  removeFavorite(vehicleId) {
    this.store.dispatch(actions.removeFavorite({ vehicleId }));
  }
  setLanguage(langIso) {
    this.store.dispatch(actions.setLanguage({ langIso }));
  }
}
