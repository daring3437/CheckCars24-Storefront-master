import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@checkcars/environment/environment';

//TODO Remove dependency
import { tap, switchMap, map, take, takeUntil } from 'rxjs/operators';

import {
  SharedFacade,
  ParameterService,
  LocalStorageService,
  addToLastViewed,
  language,
  ContactService,
} from '@checkcars/shared';

import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation,
} from '@checkcars/widgets';

import { ViewportScroller } from '@angular/common';
import { Subject } from 'rxjs';
import { ContactFormComponent } from '../../presentation/contact-form/contact-form.component';
@Component({
  selector: 'checkcars-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(ContactFormComponent) contactFormComponent: ContactFormComponent;
  private storage_url = environment.img_storage_sm;
  private url = environment.vehicle_polyglot;
  private unsubscribe$ = new Subject<void>();

  priceType: 1 | 2;
  vatRate = null;
  vehicle;

  manufacturer;
  fragment;

  translationsArray = [
    { value: 0, iso: 'de', label: 'German' },
    { value: 1, iso: 'en', label: 'English' },
    { value: 2, iso: 'ru', label: 'Russian' },
    { value: 3, iso: 'ar', label: 'Arabic' },
    { value: 4, iso: 'fr', label: 'French' },
  ];

  //Gallery
  galleryImages: NgxGalleryImage[] = [];
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '100%',
      height: '700px',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      previewCloseOnEsc: true,
      imageSize: 'contain',
    },
    // max-width 800
    {
      breakpoint: 800,
      width: '100%',
      height: 'calc(100vw - 50px)',
      imagePercent: 80,
      thumbnailsPercent: 20,
      thumbnailsMargin: 20,
      thumbnailMargin: 20,
    },
    // max-width 400
    {
      breakpoint: 400,
      preview: false,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    // private router: Router,
    private http: HttpClient,
    private parameterService: ParameterService,
    private sharedFacade: SharedFacade,
    private scroller: ViewportScroller,
    private localstorageService: LocalStorageService,
    private contactService: ContactService
  ) {}
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngAfterViewInit(): void {
    if (!this.fragment) return;
    setTimeout(() => {
      this.scroller.scrollToAnchor(this.fragment);
    }, 500);
  }

  ngOnInit() {
    this.getSharedData();
    this.getScrollFragment();

    /*     if (this.router.url.indexOf('preview')) {
      const previewCar = this.localstorageService.getSavedState('_preview_car');
      this.vehicle = previewCar;
      this.galleryImages = previewCar.Images.map((img) => {
        return {
          url: `${this.storage_url}/${img.FileName}`,
          small: `${this.storage_url}/${img.FileName}`,
          medium: `${this.storage_url}/${img.FileName}`,
          big: `${this.storage_url}/${img.FileName}`,
        };
      });
      return;
    } */
    const id = this.route.snapshot.params['id'];
    this.loadVehicle(id);
  }
  //Loads vehicle and manufacturer icon saves to lastviewd
  loadVehicle(id) {
    const langIso = this.localstorageService.getSavedState(
      '__checkcars_shared_storage__'
    ).langIso;

    const value = this.translationsArray.find((tr) => tr.iso === langIso).value;

    this.http
      .get(`${this.url}/${id}/${value}`)
      .pipe(
        tap((res) => {
          this.vehicle = res[0];
          this.galleryImages = res[0].Images.map((img) => {
            return {
              url: `${this.storage_url}/${img.FileName}`,
              small: `${this.storage_url}/${img.FileName}`,
              medium: `${this.storage_url}/${img.FileName}`,
              big: `${this.storage_url}/${img.FileName}`,
            };
          });
        }),
        switchMap(() => {
          return this.parameterService.getManufacturers();
        }),
        map((res) => {
          return res['Values'].filter(
            (manufacturer) =>
              manufacturer.value === this.vehicle['ManufacturerName']
          )[0];
        })
      )
      .subscribe((res) => {
        this.manufacturer = res;
        this.addToLastViewed();
      });
  }
  getScrollFragment() {
    this.route.fragment.subscribe((fragment) => {
      this.fragment = fragment;
    });
  }
  getSharedData() {
    this.sharedFacade.paymentTypeToggle$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.priceType = res;
      });

    this.sharedFacade.vatRate$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((vatRate) => {
        this.vatRate = vatRate;
      });
  }

  scrollToContactForm() {
    this.scroller.scrollToAnchor('contactForm');
  }
  addToLastViewed() {
    //Check if there are any lastViewed vehicles and if they are the same
    this.sharedFacade.lastViewdVehicles$
      .pipe(take(1))
      .subscribe((lastViewed) => {
        const added = lastViewed.findIndex(
          (vehicle) => vehicle.vehicleId === this.vehicle.VehicleId
        );
        console.log('added', added);
        if (added !== -1) {
          return;
        }
        this.sharedFacade.addToLastViwed({
          vehicle: this.ctorLastViewedVehicle(),
        });
      });
  }
  ctorLastViewedVehicle() {
    const {
      PriceGross,
      PriceNet,
      Images,
      VehicleId,
      ManufacturerName,
      Model,
      BulletPoints,
      CreditCondition,
      LeasingCondition,
      Consumption,
      Meta,
    } = this.vehicle;

    return {
      priceGross: PriceGross,
      priceNet: PriceNet,

      images: Images.map((img) => {
        return { ...img, fileName: img.FileName };
      }),
      vehicleId: VehicleId,
      manufacturerName: ManufacturerName,
      model: Model,
      meta: Meta.map((mt) => ({ title: mt.Title })),
      bulletPoints: BulletPoints.map(({ BulletPoints }) => ({
        bulletPoints: BulletPoints.map((bp) => ({
          class: bp.Class,
          label: bp.Label,
          link: bp.Link,
        })),
        language: BulletPoints.Language,
      })),
      creditCondition: {
        currency: CreditCondition['Currency'],
        months: CreditCondition['Months'],
        rateGross: CreditCondition['RateGross'],
        rateNet: CreditCondition['RateNet'],
        vatKey: CreditCondition['VatKey'],
      },
      leasingCondition: {
        currency: LeasingCondition['Currency'],
        months: LeasingCondition['Months'],
        rateGross: LeasingCondition['RateGross'],
        rateNet: LeasingCondition['RateNet'],
        vatKey: LeasingCondition['VatKey'],
      },

      consumption: {
        consumptionTotal: Consumption.ConsumptionTotal,
        co2Emission: Consumption.Co2Emission,
      },
    };
  }
  sendOfferRequest(request) {
    const { Model, VehicleId, OfferNumber } = this.vehicle;
    this.contactService
      .sendOfferRequest({
        ...request,
        Model,
        VehicleId,
        OfferNumber,
        ManufacturerName: this.vehicle.ManufacturerName,
        VehicleTitle: this.vehicle.Meta[0].Title,
      })
      .subscribe(
        () => {
          this.contactFormComponent.contactForm.reset();
          this.contactFormComponent.notSubmitted = false;
        },
        () => {
          this.contactFormComponent.hasError = true;
          setTimeout(() => {
            this.contactFormComponent.hasError = false;
          }, 4000);
        }
      );
  }
}
