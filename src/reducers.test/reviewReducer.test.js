/* eslint-disable no-undef */
import reviewReducer from '../reducers/reviewReducer';
import { REVIEW_ACTION_TYPES } from '../constants/actionTypes';

const initState = {
  changeInProgress: false,
  error: null,
};

it('returns the initial state', () => {
  expect(reviewReducer(undefined, {})).toEqual(initState);
});

it('handles REVIEW_IN_PROGRESS', () => {
  expect(
    reviewReducer({}, {
      type: REVIEW_ACTION_TYPES.REVIEW_IN_PROGRESS,
    }),
  ).toEqual({
    error: null,
    changeInProgress: true,
  });

  expect(
    reviewReducer(initState,
      {
        type: REVIEW_ACTION_TYPES.REVIEW_IN_PROGRESS,
      }),
  ).toEqual({
    ...initState,
    error: null,
    changeInProgress: true,
  });
});

it('handles REVIEW_SUCESS', () => {
  expect(
    reviewReducer({}, {
      type: REVIEW_ACTION_TYPES.REVIEW_SUCESS,
    }),
  ).toEqual({
    error: null,
    changeInProgress: false,
  });

  expect(
    reviewReducer(initState,
      {
        type: REVIEW_ACTION_TYPES.REVIEW_SUCESS,
      }),
  ).toEqual({
    ...initState,
    error: null,
    changeInProgress: false,
  });
});

it('handles REVIEW_ERROR', () => {
  expect(
    reviewReducer({}, {
      type: REVIEW_ACTION_TYPES.REVIEW_ERROR,
      error: 'error',
    }),
  ).toEqual({
    error: 'error',
    changeInProgress: false,
  });

  expect(
    reviewReducer(initState,
      {
        type: REVIEW_ACTION_TYPES.REVIEW_ERROR,
        error: 'error',
      }),
  ).toEqual({
    ...initState,
    error: 'error',
    changeInProgress: false,
  });
});
