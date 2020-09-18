import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { SharedFacade } from '@checkcars/shared';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'checkcars-car-carousel',
  templateUrl: './car-carousel.component.html',
  styleUrls: ['./car-carousel.component.scss'],
})
export class CarCarouselComponent implements OnInit, AfterViewInit {
  priceType$: Observable<1 | 2> = this.sharedFacade.paymentTypeToggle$;
  @Input() vehicles;
  @Input() favourites;

  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
    slide: 3,
    speed: 250,
    point: {
      visible: true,
    },
    load: 2,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
  };
  constructor(
    private cdr: ChangeDetectorRef,
    private sharedFacade: SharedFacade
  ) {}
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  carouselTileLoad(e) {}
  ngOnInit() {}
}
