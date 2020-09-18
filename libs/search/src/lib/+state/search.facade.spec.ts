import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { SearchEntity } from './search.models';
import { SearchEffects } from './search.effects';
import { SearchFacade } from './search.facade';

import * as SearchSelectors from './search.selectors';
import * as SearchActions from './search.actions';
import {
  SEARCH_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './search.reducer';

interface TestSchema {
  search: State;
}

describe('SearchFacade', () => {
  let facade: SearchFacade;
  let store: Store<TestSchema>;
  const createSearchEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SearchEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SEARCH_FEATURE_KEY, reducer),
          EffectsModule.forFeature([SearchEffects]),
        ],
        providers: [SearchFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(SearchFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allSearch$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(SearchActions.loadSearch());

        list = await readFirst(facade.allSearch$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadSearchSuccess` to manually update list
     */
    it('allSearch$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allSearch$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          SearchActions.loadSearchSuccess({
            search: [createSearchEntity('AAA'), createSearchEntity('BBB')],
          })
        );

        list = await readFirst(facade.allSearch$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
