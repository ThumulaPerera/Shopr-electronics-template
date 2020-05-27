/* eslint-disable no-undef */
import calculateDiscount from '../helpers/calculateDiscount';

it('returns 0 if discount property is not there', () => {
  expect(calculateDiscount()).toBe(0);
  expect(calculateDiscount(100)).toBe(0);
  expect(calculateDiscount(100, null)).toBe(0);
  expect(calculateDiscount(100, undefined)).toBe(0);
});

// TODO complete

// expect(() => calculateDiscount()).toThrow(TypeError());
// expect(calculateDiscount()).toBe(0);
