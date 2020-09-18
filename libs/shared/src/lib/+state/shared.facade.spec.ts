import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { SharedEntity } from './shared.models';
import { SharedEffects } from './shared.effects';
import { SharedFacade } from './shared.facade';

import * as SharedSelectors from './shared.selectors';
import * as SharedActions from './shared.actions';
import {
  SHARED_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './shared.reducer';

interface TestSchema {
  shared: State;
}

describe('SharedFacade', () => {
  let facade: SharedFacade;
  let store: Store<TestSchema>;
  const createSharedEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SharedEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SHARED_FEATURE_KEY, reducer),
          EffectsModule.forFeature([SharedEffects]),
        ],
        providers: [SharedFacade],
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
      facade = TestBed.get(SharedFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allShared$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(SharedActions.loadShared());

        list = await readFirst(facade.allShared$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadSharedSuccess` to manually update list
     */
    it('allShared$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allShared$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          SharedActions.loadSharedSuccess({
            shared: [createSharedEntity('AAA'), createSharedEntity('BBB')],
          })
        );

        list = await readFirst(facade.allShared$);
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
