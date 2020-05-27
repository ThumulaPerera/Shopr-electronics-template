/* eslint-disable no-undef */
import calculateRating from '../helpers/calculateRating';

it('returns 0 if invalid params given', () => {
  expect(calculateRating()).toBe(0);
  expect(calculateRating({})).toBe(0);
  expect(calculateRating([])).toBe(0);
  expect(calculateRating(123)).toBe(0);
  expect(calculateRating({ totalRating: 1 })).toBe(0);
  expect(calculateRating({ totalRating: 0 })).toBe(0);
  expect(calculateRating({ ratingCount: 1 })).toBe(0);
  expect(calculateRating({ ratingCount: 0 })).toBe(0);
});

it('returns 0 if rating count is 0', () => {
  expect(calculateRating({ totalRating: 1, ratingCount: 0 })).toBe(0);
});

it('calculates correct rating for valid params', () => {
  expect(calculateRating({ totalRating: 1, ratingCount: 1 })).toBe(1);
  expect(calculateRating({ totalRating: 7, ratingCount: 2 })).toBe(3.5);
  expect(calculateRating({ totalRating: 0, ratingCount: 2 })).toBe(0);
});
