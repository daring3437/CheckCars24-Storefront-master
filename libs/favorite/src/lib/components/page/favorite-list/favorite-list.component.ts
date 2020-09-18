import { Component, OnInit } from '@angular/core';
import { SharedFacade } from '@checkcars/shared';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'checkcars-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
})
export class FavoriteListComponent implements OnInit {
  objectKeys = Object.keys;

  dataStream$: Observable<any> = combineLatest(
    this.sharedFacade.favoriteVehicles$,
    this.sharedFacade.paymentTypeToggle$
  );

  trackByKey(index: number, vehicle: any): string {
    return vehicle.key;
  }
  constructor(private sharedFacade: SharedFacade) {}

  ngOnInit() {}
}
