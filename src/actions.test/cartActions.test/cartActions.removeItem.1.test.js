/* eslint-disable no-undef */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  firestore, get,
} from '../mockFirestore';
import { removeItem } from '../../actions/cartActions';
import { CART_ACTION_TYPES } from '../../constants/actionTypes';
import { cart } from '../../mockData/cartTestsMockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const storeId = 'store1';
const buyerId = 'buyer1';

it('executes remove item', () => {
  const expectedActions = [
    { type: CART_ACTION_TYPES.DELETE_IN_PROGRESS },
    { type: CART_ACTION_TYPES.DELETE_SUCCESS },
  ];

  const store = mockStore({});

  const dataSnapshot = {
    get: () => cart,
  };
  get.mockImplementation(() => Promise.resolve(dataSnapshot));

  return store.dispatch(
    removeItem(
      firestore,
      0,
      storeId,
      buyerId,
    ),
  ).then(() => {
    expect(firestore.collection).toHaveBeenCalledWith('Stores');
    expect(firestore.doc).toHaveBeenCalledWith(storeId);
    expect(firestore.collection).toHaveBeenCalledWith('Buyers');
    expect(firestore.doc).toHaveBeenCalledWith(buyerId);
    expect(firestore.doc).toHaveBeenCalledTimes(4);
    expect(firestore.collection).toHaveBeenCalledTimes(4);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
