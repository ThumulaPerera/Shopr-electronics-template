/* eslint-disable no-undef */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  firestore, get,
} from '../mockFirestore';
import { editItemQuantity } from '../../actions/cartActions';
import { CART_ACTION_TYPES } from '../../constants/actionTypes';
import { cart } from '../../mockData/cartTestsMockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const storeId = 'store1';
const buyerId = 'buyer1';

it('executes edit item quantity', () => {
  const expectedActions = [
    { type: CART_ACTION_TYPES.EDIT_IN_PROGRESS },
    { type: CART_ACTION_TYPES.EDIT_SUCCESS },
  ];

  const store = mockStore({});

  const dataSnapshot = {
    get: () => cart,
  };
  get.mockImplementation(() => Promise.resolve(dataSnapshot));

  return store.dispatch(
    editItemQuantity(
      firestore,
      0,
      2,
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
