/* eslint-disable no-undef */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  firestore, commit,
} from '../mockFirestore';
import { updateStock } from '../../actions/cartActions';
import { CART_ACTION_TYPES } from '../../constants/actionTypes';
import { cart, items } from '../../mockData/cartTestsMockData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const storeId = 'store1';

it('catches update stock error: commit rejection', () => {
  const expectedActions = [
    { type: CART_ACTION_TYPES.CHECKOUT_IN_PROGRESS },
    { type: CART_ACTION_TYPES.CHECKOUT_ERROR, error: new Error('error') },
  ];

  const store = mockStore({});

  commit.mockImplementation(() => Promise.reject(new Error('error')));

  return store.dispatch(
    updateStock(
      firestore,
      storeId,
      items,
      cart,
    ),
  ).then(() => {
    expect(firestore.collection).toHaveBeenCalledWith('Stores');
    expect(firestore.doc).toHaveBeenCalledWith(storeId);
    expect(firestore.collection).toHaveBeenCalledWith('Items');
    expect(firestore.doc).toHaveBeenCalledWith(cart[0].item);
    expect(firestore.doc).toHaveBeenCalledTimes(2);
    expect(firestore.collection).toHaveBeenCalledTimes(2);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
