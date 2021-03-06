import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'checkcars-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, AfterViewInit {
  items = [1, 1, 1, 1];

  imgags = [' ', ' ', ' ', ' '];
  public carouselTileItems: Array<any> = [0, 1, 2, 3, 4, 5];
  public carouselTiles = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };
  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 2, lg: 2, all: 0 },
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
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnInit() {
    this.carouselTileItems.forEach((el) => {
      this.carouselTileLoad(el);
    });
  }

  public carouselTileLoad(j) {
    const len = this.carouselTiles[j].length;
    if (len <= 30) {
      for (let i = len; i < len + 15; i++) {
        this.carouselTiles[j].push(
          this.imgags[Math.floor(Math.random() * this.imgags.length)]
        );
      }
    }
  }
}
