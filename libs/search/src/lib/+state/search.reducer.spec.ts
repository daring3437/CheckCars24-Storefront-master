import { SearchEntity } from './search.models';
import * as SearchActions from './search.actions';
import { State, initialState, reducer } from './search.reducer';

describe('Search Reducer', () => {
  const createSearchEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SearchEntity);

  beforeEach(() => {});

  describe('valid Search actions', () => {
    it('loadSearchSuccess should return set the list of known Search', () => {
      const search = [
        createSearchEntity('PRODUCT-AAA'),
        createSearchEntity('PRODUCT-zzz'),
      ];
      const action = SearchActions.loadSearchSuccess({ search });

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
