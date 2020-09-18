import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { ShopEffects } from './shop.effects';
import * as ShopActions from './shop.actions';

describe('ShopEffects', () => {
  let actions: Observable<any>;
  let effects: ShopEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ShopEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.get(ShopEffects);
  });

  describe('loadShop$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ShopActions.loadShop() });

      const expected = hot('-a-|', {
        a: ShopActions.loadShopSuccess({ shop: [] })
      });

      expect(effects.loadShop$).toBeObservable(expected);
    });
  });
});
