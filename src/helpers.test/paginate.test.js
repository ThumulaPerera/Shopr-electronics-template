/* eslint-disable no-undef */
import paginate from '../helpers/paginate';

it('returns [] for invalid params', () => {
  expect(paginate()).toEqual([]);
  expect(paginate([])).toEqual([]);
  expect(paginate([], 0, 1)).toEqual([]);
  expect(paginate([], 1, 0)).toEqual([]);
});

it('returns correct set of items for valid params', () => {
  expect(paginate([
    { attr: 1 },
  ], 1, 1)).toEqual([
    { attr: 1 },
  ]);
  expect(paginate([
    { attr: 1 },
    { attr: 2 },
    { attr: 3 },
    { attr: 4 },
  ], 1, 1)).toEqual([
    { attr: 1 },
  ]);
  expect(paginate([
    { attr: 1 },
    { attr: 2 },
    { attr: 3 },
    { attr: 4 },
  ], 3, 1)).toEqual([
    { attr: 3 },
  ]);
  expect(paginate([
    { attr: 1 },
    { attr: 2 },
    { attr: 3 },
    { attr: 4 },
    { attr: 5 },
    { attr: 6 },
  ], 3, 2)).toEqual([
    { attr: 5 },
    { attr: 6 },
  ]);
  expect(paginate([
    { attr: 1 },
    { attr: 2 },
    { attr: 3 },
    { attr: 4 },
    { attr: 5 },
    { attr: 6 },
  ], 4, 2)).toEqual([]);
  expect(paginate([
    { attr: 1 },
    { attr: 2 },
    { attr: 3 },
    { attr: 4 },
    { attr: 5 },
  ], 3, 2)).toEqual([
    { attr: 5 },
  ]);
});
