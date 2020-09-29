import { Component, OnInit } from '@angular/core';
import { ParameterService, LocalStorageService } from '@checkcars/shared';
import { Router } from '@angular/router';
import { NguCarouselConfig } from '@ngu/carousel';
interface ManufacturerParameter {
  Key: string;
  Values: Array<{ value: string; icon: string }>;
}
@Component({
  selector: 'checkcars-car-brands',
  templateUrl: './car-brands.component.html',
  styleUrls: ['./car-brands.component.scss'],
})
export class CarBrandsComponent implements OnInit {
  items: Array<{ value: string; icon: string }> = [];

  public carouselTile: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 9, lg: 9, all: 0 },
    slide: 9,
    speed: 250,
    point: {
      visible: true,
    },
    load: 9,
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)',
  };

  carouselTileLoad(e) {}

  constructor(
    private parameterService: ParameterService,
    private localstorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.parameterService
      .getManufacturers()
      .subscribe((res: ManufacturerParameter) => {
        this.items = res['Values'];
      });
  }
  searchManufacturer(manufacturer) {
    this.parameterService
      .getVehicleModells(manufacturer.value)
      .subscribe((res: { Key: string; Values: Array<string> }) => {
        const manufactuere = {
          Key: manufacturer.value,
          Icon: manufacturer.icon,
          Values: res['Values'].map((modellName) => {
            return { name: modellName, selected: false };
          }),
        };

        this.localstorageService.setSavedState(
          {
            filters: {
              manufacturers: [manufactuere],
            },
          },
          '__check_query_storage__'
        );

        this.router.navigate(['/search/'], {
          queryParams: { manufacturers: `${manufacturer.value}:,` },
        });
      });
  }
}
