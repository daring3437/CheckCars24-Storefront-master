import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { SearchEffects } from './search.effects';
import * as SearchActions from './search.actions';

describe('SearchEffects', () => {
  let actions: Observable<any>;
  let effects: SearchEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        SearchEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(SearchEffects);
  });

  describe('loadSearch$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SearchActions.loadSearch() });

      const expected = hot('-a-|', {
        a: SearchActions.loadSearchSuccess({ search: [] }),
      });

      expect(effects.loadSearch$).toBeObservable(expected);
    });
  });
});
