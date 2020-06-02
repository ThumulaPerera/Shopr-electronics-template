/* eslint-disable no-undef */
import cartReducer from '../reducers/cartReducer';
import { CART_ACTION_TYPES } from '../constants/actionTypes';

const initState = {
  changeInProgress: false,
  checkoutInProgress: false,
  deleteError: null,
  editError: null,
  checkoutError: null,
};

it('returns the initial state', () => {
  expect(cartReducer(undefined, {})).toEqual(initState);
});

it('handles DELETE_IN_PROGRESS', () => {
  expect(
    cartReducer({}, {
      type: CART_ACTION_TYPES.DELETE_IN_PROGRESS,
    }),
  ).toEqual({
    deleteError: null,
    changeInProgress: true,
  });

  expect(
    cartReducer(initState,
      {
        type: CART_ACTION_TYPES.DELETE_IN_PROGRESS,
      }),
  ).toEqual({
    ...initState,
    deleteError: null,
    changeInProgress: true,
  });
});

it('handles DELETE_SUCCESS', () => {
  expect(
    cartReducer({}, {
      type: CART_ACTION_TYPES.DELETE_SUCCESS,
    }),
  ).toEqual({
    deleteError: null,
    changeInProgress: false,
  });

  expect(
    cartReducer(initState,
      {
        type: CART_ACTION_TYPES.DELETE_SUCCESS,
      }),
  ).toEqual({
    ...initState,
    deleteError: null,
    changeInProgress: false,
  });
});

it('handles DELETE_ERROR', () => {
  expect(
    cartReducer({}, {
      type: CART_ACTION_TYPES.DELETE_ERROR,
      error: 'error',
    }),
  ).toEqual({
    deleteError: 'error',
    changeInProgress: false,
  });

  expect(
    cartReducer(initState,
      {
        type: CART_ACTION_TYPES.DELETE_ERROR,
        error: 'error',
      }),
  ).toEqual({
    ...initState,
    deleteError: 'error',
    changeInProgress: false,
  });
});

it('handles EDIT_IN_PROGRESS', () => {
  expect(
    cartReducer({}, {
      type: CART_ACTION_TYPES.EDIT_IN_PROGRESS,
    }),
  ).toEqual({
    editError: null,
    changeInProgress: true,
  });

  expect(
    cartReducer(initState,
      {
        type: CART_ACTION_TYPES.EDIT_IN_PROGRESS,
      }),
  ).toEqual({
    ...initState,
    editError: null,
    changeInProgress: true,
  });
});

it('handles EDIT_SUCCESS', () => {
  expect(
    cartReducer({}, {
      type: CART_ACTION_TYPES.EDIT_SUCCESS,
    }),
  ).toEqual({
    editError: null,
    changeInProgress: false,
  });

  expect(
    cartReducer(initState,
      {
        type: CART_ACTION_TYPES.EDIT_SUCCESS,
      }),
  ).toEqual({
    ...initState,
    editError: null,
    changeInProgress: false,
  });
});

it('handles EDIT_ERROR', () => {
  expect(
    cartReducer({}, {
      type: CART_ACTION_TYPES.EDIT_ERROR,
      error: 'error',
    }),
  ).toEqual({
    editError: 'error',
    changeInProgress: false,
  });

  expect(
    cartReducer(initState,
      {
        type: CART_ACTION_TYPES.EDIT_ERROR,
        error: 'error',
      }),
  ).toEqual({
    ...initState,
    editError: 'error',
    changeInProgress: false,
  });
});

it('handles CHECKOUT_IN_PROGRESS', () => {
  expect(
    cartReducer({}, {
      type: CART_ACTION_TYPES.CHECKOUT_IN_PROGRESS,
    }),
  ).toEqual({
    checkoutError: null,
    changeInProgress: true,
    checkoutInProgress: true,
  });

  expect(
    cartReducer(initState,
      {
        type: CART_ACTION_TYPES.CHECKOUT_IN_PROGRESS,
      }),
  ).toEqual({
    ...initState,
    checkoutError: null,
    changeInProgress: true,
    checkoutInProgress: true,
  });
});

it('handles CHECKOUT_SUCCESS', () => {
  expect(
    cartReducer({}, {
      type: CART_ACTION_TYPES.CHECKOUT_SUCCESS,
    }),
  ).toEqual({
    checkoutError: null,
    changeInProgress: false,
    checkoutInProgress: false,
  });

  expect(
    cartReducer(initState,
      {
        type: CART_ACTION_TYPES.CHECKOUT_SUCCESS,
      }),
  ).toEqual({
    ...initState,
    checkoutError: null,
    changeInProgress: false,
    checkoutInProgress: false,
  });
});

it('handles CHECKOUT_CANCEL', () => {
  expect(
    cartReducer({}, {
      type: CART_ACTION_TYPES.CHECKOUT_CANCEL,
      error: 'error',
    }),
  ).toEqual({
    checkoutError: null,
    changeInProgress: false,
    checkoutInProgress: false,
  });

  expect(
    cartReducer(initState,
      {
        type: CART_ACTION_TYPES.CHECKOUT_CANCEL,
      }),
  ).toEqual({
    ...initState,
    checkoutError: null,
    changeInProgress: false,
    checkoutInProgress: false,
  });
});

it('handles CHECKOUT_ERROR', () => {
  expect(
    cartReducer({}, {
      type: CART_ACTION_TYPES.CHECKOUT_ERROR,
      error: 'error',
    }),
  ).toEqual({
    checkoutError: 'error',
    changeInProgress: false,
    checkoutInProgress: false,
  });

  expect(
    cartReducer(initState,
      {
        type: CART_ACTION_TYPES.CHECKOUT_ERROR,
        error: 'error',
      }),
  ).toEqual({
    ...initState,
    checkoutError: 'error',
    changeInProgress: false,
    checkoutInProgress: false,
  });
});
