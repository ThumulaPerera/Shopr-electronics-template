/* eslint-disable no-undef */
import applyUrlCorrection from '../helpers/applyUrlCorrection';

it('removes / at end if present', () => {
  expect(applyUrlCorrection('saafa/')).toBe('saafa');
  expect(applyUrlCorrection('12323/')).toBe('12323');
  expect(applyUrlCorrection('s1@%/')).toBe('s1@%');
});

it('returns same string if no / present at the end', () => {
  expect(applyUrlCorrection('saafa')).toBe('saafa');
  expect(applyUrlCorrection('12323')).toBe('12323');
  expect(applyUrlCorrection('s1@%')).toBe('s1@%');
});

it('does not remove /s present in the middle', () => {
  expect(applyUrlCorrection('/saafa')).toBe('/saafa');
  expect(applyUrlCorrection('/saaf/a')).toBe('/saaf/a');
  expect(applyUrlCorrection('/saaf/a/')).toBe('/saaf/a');
});

it('throws error if a input non sting type give', () => {
  expect(() => applyUrlCorrection(null)).toThrow(TypeError);
  expect(() => applyUrlCorrection(undefined)).toThrow(TypeError);
  expect(() => applyUrlCorrection(123)).toThrow(TypeError);
  expect(() => applyUrlCorrection({})).toThrow(TypeError);
  expect(() => applyUrlCorrection([])).toThrow(TypeError);
  expect(() => applyUrlCorrection()).toThrow(TypeError);
});
