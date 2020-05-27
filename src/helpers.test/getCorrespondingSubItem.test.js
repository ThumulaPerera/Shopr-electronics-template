/* eslint-disable no-undef */
import getCorrespondingSubItem from '../helpers/getCorrespondingSubItem';

it('returns an empty object if incorrect params are passed', () => {
  expect(getCorrespondingSubItem()).toEqual({});
  expect(getCorrespondingSubItem(null)).toEqual({});
  expect(getCorrespondingSubItem(undefined)).toEqual({});
  expect(getCorrespondingSubItem(1)).toEqual({});
  expect(getCorrespondingSubItem('')).toEqual({});
  expect(getCorrespondingSubItem({}, null)).toEqual({});
  expect(getCorrespondingSubItem({}, undefined)).toEqual({});
  expect(getCorrespondingSubItem({}, 1)).toEqual({});
  expect(getCorrespondingSubItem({}, '')).toEqual({});
  expect(getCorrespondingSubItem({}, {})).toEqual({});
  expect(getCorrespondingSubItem(null, [])).toEqual({});
  expect(getCorrespondingSubItem(undefined, [])).toEqual({});
  expect(getCorrespondingSubItem(1, [])).toEqual({});
  expect(getCorrespondingSubItem('', [])).toEqual({});
  expect(getCorrespondingSubItem([], [])).toEqual({});
});

it('returns the 1st object in the subItems array if item has no variants', () => {
  expect(getCorrespondingSubItem({ subItems: [{ attr: 1 }] }, [])).toEqual({ attr: 1, id: 0 });
});

it('returns {} if item has no variants but subItems array has more than 1 object', () => {
  expect(getCorrespondingSubItem({ subItems: [{ attr: 1 }, { attr: 2 }] }, [])).toEqual({});
});

it('returns correct subItem when correct params are passed', () => {
  expect(getCorrespondingSubItem({
    subItems: [
      { attr: 1, variants: ['var1A', 'var2A'] },
      { attr: 2, variants: ['var1A', 'var2B'] },
      { attr: 3, variants: ['var1B', 'var2A'] },
      { attr: 4, variants: ['var1B', 'var2B'] },
    ],
    variants: [
      {
        title: 'var1',
        attributes: [
          { attribute: 'var1A' },
          { attribute: 'var1B' },
        ],
      },
      {
        title: 'var2',
        attributes: [
          { attribute: 'var2A' },
          { attribute: 'var2B' },
        ],
      },
    ],
  },
  {
    var1: 'var1A',
    var2: 'var2B',
  })).toEqual({ attr: 2, variants: ['var1A', 'var2B'], id: 1 });
});
