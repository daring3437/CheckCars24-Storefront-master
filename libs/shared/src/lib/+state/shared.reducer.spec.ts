import { SharedEntity } from './shared.models';
import * as SharedActions from './shared.actions';
import { State, initialState, reducer } from './shared.reducer';

describe('Shared Reducer', () => {
  const createSharedEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SharedEntity);

  beforeEach(() => {});

  describe('valid Shared actions', () => {
    it('loadSharedSuccess should return set the list of known Shared', () => {
      const shared = [
        createSharedEntity('PRODUCT-AAA'),
        createSharedEntity('PRODUCT-zzz'),
      ];
      const action = SharedActions.loadSharedSuccess({ shared });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
