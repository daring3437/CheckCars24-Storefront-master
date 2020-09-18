import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedFacade } from '@checkcars/shared';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'checkcars-primary-header',
  templateUrl: './primary-header.component.html',
  styleUrls: ['./primary-header.component.scss'],
})
export class PrimaryHeaderComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  checked = false;
  open = false;
  favouriteCount: number;

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  constructor(private sharedFacade: SharedFacade, private router: Router) {}

  ngOnInit() {
    this.sharedFacade.favoriteVehicles$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.favouriteCount = Object.keys(res).length;
      });

    this.sharedFacade.paymentTypeToggle$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        //2 - Business
        if (res === 2) this.checked = true;
        //1 - Private
        if (res === 1) this.checked = false;
      });
  }
  toggleChanged(e) {
    this.sharedFacade.changePaymentType();
  }
  openMenu() {
    this.open = !this.open;
  }
  naviagateTo(route: string): void {
    this.router.navigateByUrl(route);
    this.open = false;
  }
}
