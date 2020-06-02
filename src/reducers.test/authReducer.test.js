/* eslint-disable no-undef */
import authReducer from '../reducers/authReducer';
import { AUTH_ACTION_TYPES } from '../constants/actionTypes';

it('returns the initial state', () => {
  expect(authReducer(undefined, {})).toEqual({
    authError: null,
  });
});

it('handles LOGIN_SUCCESS', () => {
  expect(
    authReducer({}, {
      type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
    }),
  ).toEqual({
    authError: null,
  });

  expect(
    authReducer({
      authError: 'error',
    },
    {
      type: AUTH_ACTION_TYPES.LOGIN_SUCCESS,
    }),
  ).toEqual({
    authError: null,
  });
});

it('handles LOGIN_ERROR', () => {
  expect(
    authReducer({}, {
      type: AUTH_ACTION_TYPES.LOGIN_ERROR,
      error: 'error',
    }),
  ).toEqual({
    authError: 'error',
  });

  expect(
    authReducer({
      authError: null,
    },
    {
      type: AUTH_ACTION_TYPES.LOGIN_ERROR,
      error: 'error',
    }),
  ).toEqual({
    authError: 'error',
  });
});

it('handles SIGNOUT_SUCCESS', () => {
  expect(
    authReducer({}, {
      type: AUTH_ACTION_TYPES.SIGNOUT_SUCCESS,
    }),
  ).toEqual({
    authError: null,
  });

  expect(
    authReducer({
      authError: 'error',
    },
    {
      type: AUTH_ACTION_TYPES.SIGNOUT_SUCCESS,
    }),
  ).toEqual({
    authError: null,
  });
});

it('handles SIGNOUT_SUCCESS', () => {
  expect(
    authReducer({}, {
      type: AUTH_ACTION_TYPES.SIGNOUT_ERROR,
      error: 'error',
    }),
  ).toEqual({
    authError: 'error',
  });

  expect(
    authReducer({
      authError: null,
    },
    {
      type: AUTH_ACTION_TYPES.SIGNOUT_ERROR,
      error: 'error',
    }),
  ).toEqual({
    authError: 'error',
  });
});
