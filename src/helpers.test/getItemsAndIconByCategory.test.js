/* eslint-disable no-undef */
import getItemsAndIconByCategory from '../helpers/getItemsAndIconByCategory';

it('returns object with empty icon array and undef icon for invalid params', () => {
  expect(getItemsAndIconByCategory()).toEqual({
    itemsOfSelectedCategory: [],
    categoryIcon: undefined,
  });
  expect(getItemsAndIconByCategory({})).toEqual({
    itemsOfSelectedCategory: [],
    categoryIcon: undefined,
  });
  expect(getItemsAndIconByCategory({}, [], '')).toEqual({
    itemsOfSelectedCategory: [],
    categoryIcon: undefined,
  });
  expect(getItemsAndIconByCategory([], [], '')).toEqual({
    itemsOfSelectedCategory: [],
    categoryIcon: undefined,
  });
  expect(getItemsAndIconByCategory(
    {
      1: { name: 'item1' },
      2: { name: 'item2' },
      3: { name: 'item3' },
      4: { name: 'item4' },
      5: { name: 'item5' },
      6: { name: 'item6' },
    },
    [
      { name: 'cat0' },
      { name: 'cat1' },
      { name: 'cat2' },
      { name: 'cat3' },
      { name: 'cat4' },
    ],
    'cat3',
  )).toEqual({
    itemsOfSelectedCategory: [],
    categoryIcon: undefined,
  });
  expect(getItemsAndIconByCategory(
    {
      1: { name: 'item1', category: 4 },
      2: { name: 'item2' },
      3: { name: 'item3' },
      4: { name: 'item4' },
      5: { name: 'item5' },
      6: { name: 'item6' },
    },
    [
      { name: 'cat0' },
      { name: 'cat1' },
      { name: 'cat2' },
    ],
    'cat2',
  )).toEqual({
    itemsOfSelectedCategory: [],
    categoryIcon: undefined,
  });
  expect(getItemsAndIconByCategory(
    {
      1: { name: 'item1', category: 0 },
      2: { name: 'item2', category: 2 },
      3: { name: 'item3', category: 0 },
    },
    [
      { name: 'cat0' },
      { name: 'cat1' },
      { name: 'cat2' },
    ],
    'cat3',
  )).toEqual({
    itemsOfSelectedCategory: [],
    categoryIcon: undefined,
  });
});

it('returns correct set of items for valid params', () => {
  expect(getItemsAndIconByCategory(
    {
      1: { name: 'item1', category: 0 },
      2: { name: 'item2', category: 1 },
      3: { name: 'item3', category: 3 },
      4: { name: 'item4', category: 2 },
      5: { name: 'item5', category: 3 },
      6: { name: 'item6', category: 4 },
    },
    [
      { name: 'cat0' },
      { name: 'cat1' },
      { name: 'cat2' },
      { name: 'cat3' },
      { name: 'cat4' },
    ],
    'cat3',
  )).toEqual({
    itemsOfSelectedCategory: [
      { name: 'item3', category: 3 },
      { name: 'item5', category: 3 },
    ],
    categoryIcon: undefined,
  });
  expect(getItemsAndIconByCategory(
    {
      1: { name: 'item1', category: 0 },
      2: { name: 'item2', category: 1 },
      3: { name: 'item3', category: 3 },
      4: { name: 'item4', category: 2 },
      5: { name: 'item5', category: 3 },
      6: { name: 'item6', category: 4 },
    },
    [
      { name: 'cat0', icon: 'icon0' },
      { name: 'cat1', icon: 'icon1' },
      { name: 'cat2', icon: 'icon2' },
      { name: 'cat3', icon: 'icon3' },
      { name: 'cat4', icon: 'icon4' },
    ],
    'cat2',
  )).toEqual({
    itemsOfSelectedCategory: [
      { name: 'item4', category: 2 },
    ],
    categoryIcon: 'icon2',
  });
  expect(getItemsAndIconByCategory(
    {
      1: { name: 'item1', category: 0 },
      2: { name: 'item2', category: 1 },
      3: { name: 'item3', category: 3 },
      4: { name: 'item4', category: 2 },
      5: { name: 'item5', category: 3 },
      6: { name: 'item6', category: 3 },
    },
    [
      { name: 'cat0', icon: 'icon0' },
      { name: 'cat1', icon: 'icon1' },
      { name: 'cat2', icon: 'icon2' },
      { name: 'cat3', icon: 'icon3' },
      { name: 'cat4', icon: 'icon4' },
    ],
    'cat4',
  )).toEqual({
    itemsOfSelectedCategory: [],
    categoryIcon: 'icon4',
  });
  expect(getItemsAndIconByCategory(
    {
      1: { name: 'item1', category: 3 },
      2: { name: 'item2' },
      3: { name: 'item3' },
      4: { name: 'item4' },
      5: { name: 'item5' },
      6: { name: 'item6' },
    },
    [
      { name: 'cat0' },
      { name: 'cat1' },
      { name: 'cat2' },
      { name: 'cat3' },
      { name: 'cat4' },
    ],
    'cat3',
  )).toEqual({
    itemsOfSelectedCategory: [
      { name: 'item1', category: 3 },
    ],
    categoryIcon: undefined,
  });
});
