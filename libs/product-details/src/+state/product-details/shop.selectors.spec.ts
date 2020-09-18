import { ShopEntity } from '../../utils/models/products.models';
import { State, shopAdapter, initialState } from './shop.reducer';
import * as ShopSelectors from './shop.selectors';

describe('Shop Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getShopId = it => it['id'];
  const createShopEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ShopEntity);

  let state;

  beforeEach(() => {
    state = {
      shop: shopAdapter.addAll(
        [
          createShopEntity('PRODUCT-AAA'),
          createShopEntity('PRODUCT-BBB'),
          createShopEntity('PRODUCT-CCC')
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true
        }
      )
    };
  });

  describe('Shop Selectors', () => {
    it('getAllShop() should return the list of Shop', () => {
      const results = ShopSelectors.getAllShop(state);
      const selId = getShopId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ShopSelectors.getSelected(state);
      const selId = getShopId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it("getShopLoaded() should return the current 'loaded' status", () => {
      const result = ShopSelectors.getShopLoaded(state);

      expect(result).toBe(true);
    });

    it("getShopError() should return the current 'error' state", () => {
      const result = ShopSelectors.getShopError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
