import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { SharedEffects } from './shared.effects';
import * as SharedActions from './shared.actions';

describe('SharedEffects', () => {
  let actions: Observable<any>;
  let effects: SharedEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SharedEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(SharedEffects);
  });

  describe('loadShared$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SharedActions.loadShared() });

      const expected = hot('-a-|', {
        a: SharedActions.loadSharedSuccess({ shared: [] }),
      });

      expect(effects.loadShared$).toBeObservable(expected);
    });
  });
});
