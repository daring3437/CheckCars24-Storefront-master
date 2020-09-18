import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryInformationComponent } from './components/delivery-information/delivery-information.component';
import { ServiceInformationComponent } from './components/service-information/service-information.component';
import { SharedModule } from '@checkcars/shared';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [DeliveryInformationComponent, ServiceInformationComponent],
  exports: [DeliveryInformationComponent, ServiceInformationComponent],
})
export class AdvertisementModule {}
