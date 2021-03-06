/* eslint-disable no-undef */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { firestore } from '../mockFirestore';
import { addReview } from '../../actions/reviewActions';
import { REVIEW_ACTION_TYPES } from '../../constants/actionTypes';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const item = {
  id: 'item1',
};
const storeId = 'store1';

it('executes add review', () => {
  const expectedActions = [
    { type: REVIEW_ACTION_TYPES.REVIEW_IN_PROGRESS },
    { type: REVIEW_ACTION_TYPES.REVIEW_SUCESS },
  ];

  const store = mockStore({});
  return store.dispatch(
    addReview(
      firestore,
      item,
      4,
      'good item',
      storeId,
      'buyer1',
      'img.jpg',
    ),
  ).then(() => {
    expect(firestore.collection).toHaveBeenCalledWith('Stores');
    expect(firestore.doc).toHaveBeenCalledWith(storeId);
    expect(firestore.collection).toHaveBeenCalledWith('Items');
    expect(firestore.doc).toHaveBeenCalledWith(item.id);
    expect(firestore.doc).toHaveBeenCalledTimes(2);
    expect(firestore.collection).toHaveBeenCalledTimes(2);
    expect(store.getActions()).toEqual(expectedActions);
  });
});
