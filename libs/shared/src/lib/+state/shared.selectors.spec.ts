import { SharedEntity } from './shared.models';
import { State, sharedAdapter, initialState } from './shared.reducer';
import * as SharedSelectors from './shared.selectors';

describe('Shared Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSharedId = (it) => it['id'];
  const createSharedEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SharedEntity);

  let state;

  beforeEach(() => {
    state = {
      shared: sharedAdapter.addAll(
        [
          createSharedEntity('PRODUCT-AAA'),
          createSharedEntity('PRODUCT-BBB'),
          createSharedEntity('PRODUCT-CCC'),
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

  describe('Shared Selectors', () => {
    it('getAllShared() should return the list of Shared', () => {
      const results = SharedSelectors.getAllShared(state);
      const selId = getSharedId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = SharedSelectors.getSelected(state);
      const selId = getSharedId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getSharedLoaded() should return the current 'loaded' status", () => {
      const result = SharedSelectors.getSharedLoaded(state);

      expect(result).toBe(true);
    });

    it("getSharedError() should return the current 'error' state", () => {
      const result = SharedSelectors.getSharedError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
