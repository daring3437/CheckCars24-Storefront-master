import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { SharedFacade } from '@checkcars/shared';

@Component({
  selector: 'checkcars-last-viewed',
  templateUrl: './last-viewed.component.html',
  styleUrls: ['./last-viewed.component.css'],
})
export class LastViewedComponent {
  /*   @Input() lastViewed;

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
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  carouselTileLoad(e) {
    console.log(e);
  }

  ngOnInit() {} */
}
