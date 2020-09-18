import { ShopEntity } from '../../utils/models/products.models';
import * as ShopActions from './shop.actions';
import { State, initialState, reducer } from './shop.reducer';

describe('Shop Reducer', () => {
  const createShopEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`
    } as ShopEntity);

  beforeEach(() => {});

  describe('valid Shop actions', () => {
    it('loadShopSuccess should return set the list of known Shop', () => {
      const shop = [
        createShopEntity('PRODUCT-AAA'),
        createShopEntity('PRODUCT-zzz')
      ];
      const action = ShopActions.loadShopSuccess({ shop });

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
