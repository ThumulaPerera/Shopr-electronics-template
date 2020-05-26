/* eslint-disable no-undef */
import calculateCartTotal from '../helpers/calculateCartTotal';

it('throws error if cart or items is null', () => {
  expect(() => calculateCartTotal()).toThrow(TypeError('items, cart cannot be null and cart must be an array'));
  expect(() => calculateCartTotal(null)).toThrow(TypeError('items, cart cannot be null and cart must be an array'));
  expect(() => calculateCartTotal(null, null)).toThrow(TypeError('items, cart cannot be null and cart must be an array'));
  expect(() => calculateCartTotal(undefined)).toThrow(TypeError('items, cart cannot be null and cart must be an array'));
  expect(() => calculateCartTotal(undefined, undefined)).toThrow(TypeError('items, cart cannot be null and cart must be an array'));
});

it('throws error if cart is not an array', () => {
  expect(() => calculateCartTotal({}, {})).toThrow(TypeError('items, cart cannot be null and cart must be an array'));
  expect(() => calculateCartTotal({}, 1)).toThrow(TypeError('items, cart cannot be null and cart must be an array'));
  expect(() => calculateCartTotal({}, 'string')).toThrow(TypeError('items, cart cannot be null and cart must be an array'));
});

it('throws error if orderItem.item is not a string', () => {
  expect(() => calculateCartTotal({}, [{}])).toThrow(TypeError('orderItem.item should be a string'));
  expect(() => calculateCartTotal({}, [{ item: null }])).toThrow(TypeError('orderItem.item should be a string'));
  expect(() => calculateCartTotal({}, [{ item: undefined }])).toThrow(TypeError('orderItem.item should be a string'));
  expect(() => calculateCartTotal({}, [{ item: 1 }])).toThrow(TypeError('orderItem.item should be a string'));
  expect(() => calculateCartTotal({}, [{ item: {} }])).toThrow(TypeError('orderItem.item should be a string'));
  expect(() => calculateCartTotal({}, [{ item: [] }])).toThrow(TypeError('orderItem.item should be a string'));
});

it('throws error if orderItem.subItem is not a non negative integer', () => {
  expect(() => calculateCartTotal({}, [{ item: 'string' }])).toThrow(TypeError('orderItem.subItem should be a non negative integer'));
  expect(() => calculateCartTotal({}, [{ item: 'string', subItem: null }])).toThrow(TypeError('orderItem.subItem should be a non negative integer'));
  expect(() => calculateCartTotal({}, [{ item: 'string', subItem: undefined }])).toThrow(TypeError('orderItem.subItem should be a non negative integer'));
  expect(() => calculateCartTotal({}, [{ item: 'string', subItem: 'string' }])).toThrow(TypeError('orderItem.subItem should be a non negative integer'));
  expect(() => calculateCartTotal({}, [{ item: 'string', subItem: 1.1 }])).toThrow(TypeError('orderItem.subItem should be a non negative integer'));
  expect(() => calculateCartTotal({}, [{ item: 'string', subItem: -1 }])).toThrow(TypeError('orderItem.subItem should be a non negative integer'));
  expect(() => calculateCartTotal({}, [{ item: 'string', subItem: {} }])).toThrow(TypeError('orderItem.subItem should be a non negative integer'));
  expect(() => calculateCartTotal({}, [{ item: 'string', subItem: [] }])).toThrow(TypeError('orderItem.subItem should be a non negative integer'));
});

it('throws error if item with given itemId is not in items', () => {
  expect(() => calculateCartTotal({}, [{ item: 'id_1', subItem: 0 }])).toThrow(Error('Item matching the itemId is not in items'));
  expect(() => calculateCartTotal({ id_2: {} }, [{ item: 'id_1', subItem: 0 }])).toThrow(Error('Item matching the itemId is not in items'));
  expect(() => calculateCartTotal({ id_1: null }, [{ item: 'id_1', subItem: 0 }])).toThrow(Error('Item matching the itemId is not in items'));
});

it('throws error if item.subItems is not an array', () => {
  expect(() => calculateCartTotal({ id_1: {} }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('item.subItems should be an array'));
  expect(() => calculateCartTotal({ id_1: { subItems: null } }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('item.subItems should be an array'));
  expect(() => calculateCartTotal({ id_1: { subItems: undefined } }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('item.subItems should be an array'));
  expect(() => calculateCartTotal({ id_1: { subItems: '' } }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('item.subItems should be an array'));
  expect(() => calculateCartTotal({ id_1: { subItems: 1 } }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('item.subItems should be an array'));
});

it('throws error if subItem matching the subItemId is not in subItems', () => {
  expect(() => calculateCartTotal({ id_1: { subItems: [] } }, [{ item: 'id_1', subItem: 0 }])).toThrow(Error('subItem matching the subItemId is not in subItems'));
  expect(() => calculateCartTotal({ id_1: { subItems: [null] } }, [{ item: 'id_1', subItem: 0 }])).toThrow(Error('subItem matching the subItemId is not in subItems'));
  expect(() => calculateCartTotal({ id_1: { subItems: [undefined] } }, [{ item: 'id_1', subItem: 0 }])).toThrow(Error('subItem matching the subItemId is not in subItems'));
  expect(() => calculateCartTotal({ id_1: { subItems: [{}] } }, [{ item: 'id_1', subItem: 1 }])).toThrow(Error('subItem matching the subItemId is not in subItems'));
});

it('throws error if price is not a number', () => {
  expect(() => calculateCartTotal({ id_1: { subItems: [{}] } }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('price should be a number'));
  expect(() => calculateCartTotal({ id_1: { subItems: [{ price: null }] } }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('price should be a number'));
  expect(() => calculateCartTotal({ id_1: { subItems: [{ price: undefined }] } }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('price should be a number'));
  expect(() => calculateCartTotal({ id_1: { subItems: [{ price: 'string' }] } }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('price should be a number'));
  expect(() => calculateCartTotal({ id_1: { subItems: [{ price: [] }] } }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('price should be a number'));
  expect(() => calculateCartTotal({ id_1: { subItems: [{ price: {} }] } }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('price should be a number'));
});

it('throws error if no of items is not a number', () => {
  expect(() => calculateCartTotal({ id_1: { subItems: [{ price: 1 }] } }, [{ item: 'id_1', subItem: 0 }])).toThrow(TypeError('no of items should be a number'));
  expect(() => calculateCartTotal({ id_1: { subItems: [{ price: 1 }] } }, [{ item: 'id_1', subItem: 0, noOfItems: null }])).toThrow(TypeError('no of items should be a number'));
  expect(() => calculateCartTotal({ id_1: { subItems: [{ price: 1 }] } }, [{ item: 'id_1', subItem: 0, noOfItems: undefined }])).toThrow(TypeError('no of items should be a number'));
  expect(() => calculateCartTotal({ id_1: { subItems: [{ price: 1 }] } }, [{ item: 'id_1', subItem: 0, noOfItems: 'string' }])).toThrow(TypeError('no of items should be a number'));
  expect(() => calculateCartTotal({ id_1: { subItems: [{ price: 1 }] } }, [{ item: 'id_1', subItem: 0, noOfItems: [] }])).toThrow(TypeError('no of items should be a number'));
  expect(() => calculateCartTotal({ id_1: { subItems: [{ price: 1 }] } }, [{ item: 'id_1', subItem: 0, noOfItems: {} }])).toThrow(TypeError('no of items should be a number'));
});

it('returns correct total when no of items changed', () => {
  expect(calculateCartTotal({ id_1: { subItems: [{ price: 1 }] } }, [{ item: 'id_1', subItem: 0, noOfItems: 1 }])).toBe(1);
  expect(calculateCartTotal({ id_1: { subItems: [{ price: 1 }] } }, [{ item: 'id_1', subItem: 0, noOfItems: 10 }])).toBe(10);
});

it('returns correct total when price changed', () => {
  expect(calculateCartTotal({ id_1: { subItems: [{ price: 10 }] } }, [{ item: 'id_1', subItem: 0, noOfItems: 1 }])).toBe(10);
});

it('returns correct total when price and no of items changed', () => {
  expect(calculateCartTotal({ id_1: { subItems: [{ price: 10 }] } }, [{ item: 'id_1', subItem: 0, noOfItems: 10 }])).toBe(100);
});


it('returns correct total with multiple items', () => {
  expect(calculateCartTotal({
    id_1: { subItems: [{ price: 10 }] },
    id_2: { subItems: [{ price: 20 }] },
    id_3: { subItems: [{ price: 30 }] },
  },
  [
    { item: 'id_1', subItem: 0, noOfItems: 1 },
  ])).toBe(10);
  expect(calculateCartTotal({
    id_1: { subItems: [{ price: 10 }] },
    id_2: { subItems: [{ price: 20 }] },
    id_3: { subItems: [{ price: 30 }] },
  },
  [
    { item: 'id_1', subItem: 0, noOfItems: 1 },
    { item: 'id_3', subItem: 0, noOfItems: 1 },
  ])).toBe(40);
});

it('returns correct total with multiple items and sub items', () => {
  expect(calculateCartTotal({
    id_1: { subItems: [{ price: 10 }, { price: 40 }] },
    id_2: { subItems: [{ price: 20 }] },
    id_3: { subItems: [{ price: 30 }] },
  },
  [
    { item: 'id_1', subItem: 0, noOfItems: 1 },
    { item: 'id_1', subItem: 1, noOfItems: 1 },
    { item: 'id_3', subItem: 0, noOfItems: 1 },
  ])).toBe(80);
});

it('returns correct total with multiple variations', () => {
  expect(calculateCartTotal({
    id_1: { subItems: [{ price: 10 }, { price: 40 }] },
    id_2: { subItems: [{ price: 20 }] },
    id_3: { subItems: [{ price: 30 }] },
  },
  [
    { item: 'id_1', subItem: 0, noOfItems: 1 },
    { item: 'id_1', subItem: 1, noOfItems: 2 },
    { item: 'id_3', subItem: 0, noOfItems: 3 },
  ])).toBe(180);
});
