/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/prefer-default-export */

import jest from 'jest-mock';
import { cart } from '../mockData/cartTestsMockData';

/* mock module for firestore */

// const docData = { data: 'MOCK_DATA' };
// const docResult = {
//   // simulate firestore get doc.data() function
//   data: () => docData,
// };

export const get = jest.fn(() => Promise.resolve());
export const set = jest.fn(() => Promise.resolve());
export const update = jest.fn(() => Promise.resolve());

export const batchSet = jest.fn();
export const batchUpdate = jest.fn();
export const commit = jest.fn(() => Promise.resolve());

export const doc = jest.fn();
export const batch = jest.fn();
export const collection = jest.fn();

doc.mockImplementation(() => ({
  set,
  get,
  update,
  collection,
}));

batch.mockImplementation(() => ({
  set: batchSet,
  update: batchUpdate,
  commit,
}));

collection.mockImplementation(() => ({
  doc,
}));

export const firestore = { doc, collection, batch };
