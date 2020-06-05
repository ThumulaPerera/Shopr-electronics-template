/* eslint-disable no-undef */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  firestore, commit,
} from '../mockFirestore';
import { createOrderInDb } from '../../actions/cartActions';
import { CART_ACTION_TYPES } from '../../constants/actionTypes';
import { cart, items } from '../../mockData/cartTestsMockData';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const storeId = 'store1';
const buyerId = 'buyer1';
const shipping = {
  address: 'address',
};
const paymentDetails = {
  id: 'payment1',
  purchase_units: [
    {
      shipping,
    },
  ],
};

it('executes create order in db', () => {
  const expectedActions = [
    { type: CART_ACTION_TYPES.CHECKOUT_SUCCESS },
  ];

  const store = mockStore({});

  return store.dispatch(
    createOrderInDb(
      firestore,
      storeId,
      buyerId,
      items,
      cart,
      paymentDetails,
    ),
  ).then(() => {
    expect(firestore.collection).toHaveBeenCalledWith('Stores');
    expect(firestore.doc).toHaveBeenCalledWith(storeId);
    expect(firestore.collection).toHaveBeenCalledWith('Items');
    expect(firestore.doc).toHaveBeenCalledWith(cart[0].item);
    expect(firestore.collection).toHaveBeenCalledWith('Purchases');
    expect(firestore.doc).toHaveBeenCalledWith();

    expect(firestore.collection).toHaveBeenCalledWith('Stores');
    expect(firestore.doc).toHaveBeenCalledWith(storeId);
    expect(firestore.collection).toHaveBeenCalledWith('Orders');
    expect(firestore.doc).toHaveBeenCalledWith(paymentDetails.id);

    expect(firestore.collection).toHaveBeenCalledWith('Stores');
    expect(firestore.doc).toHaveBeenCalledWith(storeId);
    expect(firestore.collection).toHaveBeenCalledWith('Buyers');
    expect(firestore.doc).toHaveBeenCalledWith(buyerId);

    expect(firestore.doc).toHaveBeenCalledTimes(7);
    expect(firestore.collection).toHaveBeenCalledTimes(7);

    expect(commit).toHaveBeenCalledTimes(1);

    expect(store.getActions()).toEqual(expectedActions);
  });
});
