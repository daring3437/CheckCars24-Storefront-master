import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FinancialCondition } from 'libs/product-details/src/lib/utils/models/FinancialCondiaiton';

@Component({
  selector: 'checkcars-offer-box',
  templateUrl: './offer-box.component.html',
  styleUrls: ['./offer-box.component.scss'],
})
export class OfferBoxComponent implements OnInit, OnChanges {
  conditionLeasing: any;
  conditionCredit: any;
  @Input() vatRate;
  @Input() vehicle;
  @Input() priceType: 1 | 2;
  @Output() scrollToContact: EventEmitter<boolean> = new EventEmitter();
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.priceType && changes.priceType.currentValue) {
      this.priceType = changes.priceType.currentValue;
    }

    if (changes.vehicle && changes.vehicle.currentValue) {
      const vehicleValue = changes.vehicle.currentValue;
      if (vehicleValue.CreditCondition) {
        this.conditionCredit = vehicleValue.CreditCondition;
      }
      if (vehicleValue.LeasingCondition) {
        this.conditionLeasing = vehicleValue.LeasingCondition;
      }
    }
  }
  ngOnInit() {}
  scrollToContactForm() {
    this.scrollToContact.emit(true);
  }
}
