import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: 'checkcars-premium-carousel',
  templateUrl: './premium-carousel.component.html',
  styleUrls: ['./premium-carousel.component.scss'],
})
export class PremiumCarouselComponent implements OnInit, AfterViewInit {
  premiumCars = [
    {
      '@search.score': 1.0,
      priceNet: 200,
      priceGross: 200,
      vatKey: 0,
      topDealScore: 0,
      searchTerm: 'string',
      publish: 2,
      vehicleId: 'd3f1f6bdb20c0a2652c5ca1af1747a49',
      bodyTypeTag: 'MINIBUS',
      id: 'd3f1f6bdb20c0a2652c5ca1af1747a49',
      manufacturerName: 'VW',
      model: 'T4',
      transmissionType: 'Automatic',
      rid: 'R0dWYUFMUm55bElGQUFBQUFBQUFBQT090',
      financingConditions: [
        {
          type: 0,
          rateNet: 10,
          rateGross: 10,
          months: 50,
          vatKey: 0,
          currency: 0,
        },
      ],
      bulletPoints: [
        {
          language: 0,
          bulletPoints: [{ class: '', label: 'Diesel', link: '' }],
        },
      ],
      fuelTypes: [{ name: 'Diesel' }],
      images: [
        { fileName: '622c0f52-9f0e-4ba9-b88d-9d2f44c105a9.jpg', position: 0 },
        { fileName: 'f5ee3a3c-f382-4596-8929-54dc4077e7c2.jpg', position: 1 },
        { fileName: '110b080c-f26f-45a7-a8cd-721c13efda97.jpg', position: 2 },
      ],
      consumption: {
        co2Efficiency: 'A',
        co2Emission: 193,
        consumptionTotal: 7.3,
      },
    },
    {
      '@search.score': 1.0,
      priceNet: 100,
      priceGross: 100,
      vatKey: 0,
      topDealScore: 0,
      searchTerm: 'string',
      publish: 2,
      vehicleId: '8d282a27bbe2556165facdf8842503c0',
      bodyTypeTag: 'SUV',
      id: '8d282a27bbe2556165facdf8842503c0',
      manufacturerName: 'Audi',
      model: 'Q8',
      transmissionType: 'Automatic',
      rid: 'R0dWYUFMUm55bElCQUFBQUFBQUFBQT090',
      financingConditions: [
        {
          type: 1,
          rateNet: 120,
          rateGross: 120,
          months: 30,
          vatKey: 0,
          currency: 0,
        },
      ],
      bulletPoints: [
        { language: 0, bulletPoints: [{ class: '', label: 'GAS', link: '' }] },
      ],
      fuelTypes: [{ name: 'Diesel' }],
      images: [
        { fileName: 'cc4e93d3-e706-4da9-b85c-617be53b50cb.jpg', position: 0 },
        { fileName: 'f358aa8d-6710-4dd8-88fc-7606a81dd68a.jpg', position: 1 },
        { fileName: '7af4c678-1730-4578-bcb0-28f5584e569a.jpg', position: 2 },
      ],
      consumption: {
        co2Efficiency: 'B',
        co2Emission: 205,
        consumptionTotal: 7.8,
      },
    },
    {
      '@search.score': 1.0,
      priceNet: 10,
      priceGross: 400,
      vatKey: 0,
      topDealScore: 0,
      searchTerm: 'string',
      publish: 2,
      vehicleId: '80b79b9cdb800eebd9b215916b33a4e5',
      bodyTypeTag: 'MINIBUS',
      id: '80b79b9cdb800eebd9b215916b33a4e5',
      manufacturerName: 'VW',
      model: 'T4',
      transmissionType: 'Stick',
      rid: 'R0dWYUFMUm55bElHQUFBQUFBQUFBQT090',
      financingConditions: [
        {
          type: 0,
          rateNet: 20,
          rateGross: 50,
          months: 30,
          vatKey: 0,
          currency: 0,
        },
      ],
      bulletPoints: [
        { language: 0, bulletPoints: [{ class: '', label: 'test', link: '' }] },
      ],
      fuelTypes: [{ name: 'Diesel' }],
      images: [
        { fileName: '569467e4-3d09-486f-9461-ac8d1629115e.jpg', position: 0 },
        { fileName: 'a822ec21-4ecb-4b06-94a0-6821db84ca47.jpg', position: 1 },
        { fileName: 'a4e11731-9f3e-427c-8389-d9b829c36af4.jpg', position: 2 },
      ],
      consumption: {
        co2Efficiency: 'A',
        co2Emission: 193,
        consumptionTotal: 7.3,
      },
    },
    {
      '@search.score': 1.0,
      priceNet: 0,
      priceGross: 0,
      vatKey: 0,
      topDealScore: 0,
      searchTerm: 'string',
      publish: 2,
      vehicleId: '3e2f10581dfd873ccda21b74f0d21eba',
      bodyTypeTag: 'MINIBUS',
      id: '3e2f10581dfd873ccda21b74f0d21eba',
      manufacturerName: 'VW',
      model: 'T4',
      transmissionType: 'Stick',
      rid: 'R0dWYUFMUm55bElIQUFBQUFBQUFBQT090',
      financingConditions: [
        {
          type: 0,
          rateNet: 100,
          rateGross: 110,
          months: 20,
          vatKey: 0,
          currency: 0,
        },
      ],
      bulletPoints: [
        { language: 0, bulletPoints: [{ class: '', label: 'Gas', link: '' }] },
      ],
      fuelTypes: [{ name: 'Diesel' }],
      images: [
        { fileName: '4dd5af92-3e47-4f4f-93e3-2311e1d6917d.jpg', position: 0 },
        { fileName: 'a2e2cf65-38e6-4233-90a4-35fd446dea4d.jpg', position: 1 },
      ],
      consumption: {
        co2Efficiency: 'A',
        co2Emission: 193,
        consumptionTotal: 7.3,
      },
    },
    {
      '@search.score': 1.0,
      priceNet: 100,
      priceGross: 100,
      vatKey: 0,
      topDealScore: 0,
      searchTerm: 'string',
      publish: 2,
      vehicleId: '4ace9a92d10b227262a4eaee10f64813',
      bodyTypeTag: 'SUV',
      id: '4ace9a92d10b227262a4eaee10f64813',
      manufacturerName: 'Jaguar',
      model: 'I-Pace',
      transmissionType: 'Automatic',
      rid: 'R0dWYUFMUm55bElLQUFBQUFBQUFBQT090',
      financingConditions: [
        {
          type: 0,
          rateNet: 40,
          rateGross: 40,
          months: 40,
          vatKey: 0,
          currency: 0,
        },
      ],
      bulletPoints: [
        {
          language: 0,
          bulletPoints: [
            { class: '', label: 'a very long bullet should short', link: '' },
          ],
        },
      ],
      fuelTypes: [{ name: 'Benzin' }],
      images: [
        { fileName: '232c3bb1-1e12-440c-bc22-04e28ffb4f9f.jpg', position: 0 },
        { fileName: 'dc0fd349-f08d-4438-ba90-1240df18ff7a.jpg', position: 1 },
        { fileName: 'e437600a-e86b-4f04-83d5-10a48c765c04.jpg', position: 2 },
        { fileName: '23492467-c1e6-476d-9e39-004761396611.jpg', position: 3 },
      ],
      consumption: {
        co2Efficiency: 'B',
        co2Emission: 10,
        consumptionTotal: 100.0,
      },
    },
    {
      '@search.score': 1.0,
      priceNet: 500,
      priceGross: 500,
      vatKey: 0,
      topDealScore: 0,
      searchTerm: 'string',
      publish: 2,
      vehicleId: '6d27307bf47f12d1075fc3e6a823783c',
      bodyTypeTag: 'SUV',
      id: '6d27307bf47f12d1075fc3e6a823783c',
      manufacturerName: 'Land Rover',
      model: 'Range Rover',
      transmissionType: 'Stick',
      rid: 'R0dWYUFMUm55bElTQUFBQUFBQUFBQT090',
      financingConditions: [
        {
          type: 0,
          rateNet: 30,
          rateGross: 30,
          months: 10,
          vatKey: 0,
          currency: 0,
        },
      ],
      bulletPoints: [
        { language: 0, bulletPoints: [{ class: '', label: 'Test', link: '' }] },
      ],
      fuelTypes: [{ name: 'Diesel' }],
      images: [
        { fileName: 'a06b43c2-9c5a-4875-a4a1-2fba61ffc040.jpg', position: 0 },
        { fileName: 'e5d12c1d-fde5-4e75-9daa-8675340e17f0.jpg', position: 1 },
        { fileName: 'c53a9178-63c7-4bbd-bc3a-eb9be2b0e2fc.jpg', position: 2 },
      ],
      consumption: {
        co2Efficiency: 'C',
        co2Emission: 173,
        consumptionTotal: 6.6,
      },
    },
    {
      '@search.score': 1.0,
      priceNet: 400,
      priceGross: 400,
      vatKey: 0,
      topDealScore: 0,
      searchTerm: 'string',
      publish: 2,
      vehicleId: '76873b69ce414601c93c9d72227abeab',
      bodyTypeTag: 'MINIBUS',
      id: '76873b69ce414601c93c9d72227abeab',
      manufacturerName: 'VW',
      model: '181',
      transmissionType: 'Stick',
      rid: 'R0dWYUFMUm55bElUQUFBQUFBQUFBQT090',
      financingConditions: [
        {
          type: 0,
          rateNet: 10,
          rateGross: 10,
          months: 30,
          vatKey: 0,
          currency: 0,
        },
      ],
      bulletPoints: [
        { language: 0, bulletPoints: [{ class: '', label: 'GAS', link: '' }] },
      ],
      fuelTypes: [{ name: 'Diesel' }],
      images: [
        { fileName: '0589d074-fd4f-40f9-9b48-e17ebf5daa18.jpg', position: 0 },
        { fileName: '6243a520-cdb3-4d99-8965-a7d84a605788.jpg', position: 1 },
        { fileName: 'e75ca793-162f-4ed7-acee-ffc5da2985f3.jpg', position: 2 },
      ],
      consumption: {
        co2Efficiency: 'A',
        co2Emission: 192,
        consumptionTotal: 7.3,
      },
    },
  ];

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
  ngOnInit() {}
}
