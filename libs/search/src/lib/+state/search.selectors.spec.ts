import { SearchEntity } from './search.models';
import { State, searchAdapter, initialState } from './search.reducer';
import * as SearchSelectors from './search.selectors';

describe('Search Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSearchId = (it) => it['id'];
  const createSearchEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SearchEntity);

  let state;

  beforeEach(() => {
    state = {
      search: searchAdapter.addAll(
        [
          createSearchEntity('PRODUCT-AAA'),
          createSearchEntity('PRODUCT-BBB'),
          createSearchEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Search Selectors', () => {
    it('getAllSearch() should return the list of Search', () => {
      const results = SearchSelectors.getAllSearch(state);
      const selId = getSearchId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SearchSelectors.getSelected(state);
      const selId = getSearchId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getSearchLoaded() should return the current 'loaded' status", () => {
      const result = SearchSelectors.getSearchLoaded(state);

      expect(result).toBe(true);
    });

    it("getSearchError() should return the current 'error' state", () => {
      const result = SearchSelectors.getSearchError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
