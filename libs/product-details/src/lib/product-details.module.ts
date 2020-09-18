import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsComponent } from './components/pages/product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { productDetailsRoutes } from './product-details.routing';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ContactFormComponent } from './components/presentation/contact-form/contact-form.component';
import { NguCarouselModule } from '@ngu/carousel';
import { HttpClientModule } from '@angular/common/http';
import { NgxGalleryModule } from '@checkcars/widgets';
import { OfferBoxComponent } from './components/pages/product-details/offer-box/offer-box.component';
import { BasicInfoComponent } from './components/pages/product-details/basic-info/basic-info.component';
import { EqupmentFlagsComponent } from './components/pages/product-details/equpment-flags/equpment-flags.component';
import { SharedModule } from '@checkcars/shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {GalleryModule} from '@ks89/angular-modal-gallery';
@NgModule({
  declarations: [
    ProductDetailsComponent,
    ContactFormComponent,
    OfferBoxComponent,
    BasicInfoComponent,
    EqupmentFlagsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productDetailsRoutes),
    AngularSvgIconModule,
    NguCarouselModule,
    NgxGalleryModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductDetailsModule {}
