import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* Views */
import { HomeComponent } from './components/page/home/home.component';
/* Components */
import { LastViewedComponent } from './components/presentation/last-viewed/last-viewed.component';
import { CarBrandsComponent } from './components/presentation/car-brands/car-brands.component';
import { CarCategoriesComponent } from './components/presentation/car-categories/car-categories.component';
import { ShopFeaturesComponent } from './components/presentation/shop-features/shop-features.component';
import { PremiumCarouselComponent } from './components/presentation/premium-carousel/premium-carousel.component';
import { SearchBoxComponent } from './components/presentation/search-box/search-box.component';
import { CarCarouselComponent } from './components/presentation/car-carousel/car-carousel.component';
import { ReviewsComponent } from './components/presentation/reviews/reviews.component';
/* Application modules */
import { ProductCardModule, AdvertisementModule } from '@checkcars/widgets';
/* Third party */
import { NguCarouselModule } from '@ngu/carousel';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { HomeService } from './utils/home.service';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSliderModule,
    ProductCardModule,
    TranslateModule,
    NguCarouselModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule,
    AdvertisementModule,
  ],
  declarations: [
    HomeComponent,
    SearchBoxComponent,
    CarBrandsComponent,
    CarCategoriesComponent,
    LastViewedComponent,
    PremiumCarouselComponent,
    ShopFeaturesComponent,
    ReviewsComponent,
    CarCarouselComponent,
  ],
  providers: [HomeService],
})
export class HomeModule {}
