/* eslint-disable no-undef */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  firestore, update, get,
} from '../mockFirestore';
import { editItemQuantity } from '../../actions/cartActions';
import { CART_ACTION_TYPES } from '../../constants/actionTypes';
import { cart } from '../../mockData/cartTestsMockData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const storeId = 'store1';
const buyerId = 'buyer1';

it('catches edit item quantity error: update rejection', () => {
  const expectedActions = [
    { type: CART_ACTION_TYPES.EDIT_IN_PROGRESS },
    { type: CART_ACTION_TYPES.EDIT_ERROR, error: new Error('error') },
  ];

  const store = mockStore({});

  const dataSnapshot = {
    get: () => cart,
  };
  get.mockImplementation(() => Promise.resolve(dataSnapshot));
  update.mockImplementation(() => Promise.reject(new Error('error')));

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
