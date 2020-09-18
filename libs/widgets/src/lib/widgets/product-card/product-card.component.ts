import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@checkcars/environment/environment';
import { SharedFacade } from '@checkcars/shared';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'checkcars-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  imgNotFound: string = environment.img_url_not_found;
  imgUrlSmall: string = environment.img_storage_sm;
  paymentType$;
  @Input() product: any;
  @Input() favorites: any;
  @Input() priceType: 1 | 2;
  translate;
  constructor(private sharedFacade: SharedFacade) {
    this.translate = {};
  }

  ngOnInit() {}
  toggleFavourite() {
    if (!this.favorites[this.product.vehicleId]) {
      this.sharedFacade.addFavorite(this.product);
    }
    if (this.favorites[this.product.vehicleId]) {
      this.sharedFacade.removeFavorite(this.product.vehicleId);
    }
  }
}
