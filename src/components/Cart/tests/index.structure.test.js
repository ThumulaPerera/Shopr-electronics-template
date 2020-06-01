/* eslint-disable no-undef */
import React, { createRef } from 'react';
import { cleanup } from '@testing-library/react';
import { mount } from 'enzyme';
import { Route, MemoryRouter } from 'react-router-dom';

import { Cart as UnconnectedCart } from '../index';
import SidePane from '../SidePane';
import ItemTable from '../ItemTable';

import { items, cart, sellerStore } from '../../../mockData/cartTestsMockData';
import { MAIN_ROUTE, CART_ROUTE } from '../../../constants/routes';


jest.unmock('react-redux-firebase');
const rrf = require.requireActual('react-redux-firebase');

let component;

const removeItem = jest.fn();
const editItemQuantity = jest.fn();
const updateStock = jest.fn();
const resetStock = jest.fn();
const createOrderInDb = jest.fn();
const ref = createRef();

beforeEach(() => {
  rrf.isLoaded = jest.fn(() => true);
  component = mount(
    <MemoryRouter initialEntries={[{ pathname: `/storeId123${CART_ROUTE}`, key: 'testKey' }]}>
      <Route path={`${MAIN_ROUTE}${CART_ROUTE}`}>
        <UnconnectedCart
          auth={{ uid: '123' }}
          items={items}
          currency={sellerStore.currency}
          cart={cart}
          match={{
            params: {
              storeID: 'store123',
            },
          }}
          removeItem={removeItem}
          editItemQuantity={editItemQuantity}
          updateStock={updateStock}
          resetStock={resetStock}
          createOrderInDb={createOrderInDb}
          changeInProgress={false}
          checkoutInProgress={false}
          color={null}
          stockEnabled={sellerStore.enableInventoryManagement}
          ratingEnabled={sellerStore.enableRating}
          contextRef={ref}
          storeName={sellerStore.storeName}
          merchantId={sellerStore.merchantId}
        />
        ,
      </Route>
    </MemoryRouter>
    ,
  );
});

afterEach(cleanup);

it('renders the corresponding sub components and passes props correctly', () => {
  /* Side Pane */
  const sidePane = component.find(SidePane);
  // renders the side pane
  // renders twice (once for onlyComputer and once for onlyMobile&Tablet)
  expect(sidePane.length).toEqual(2);
  // passes correct initial props
  for (let i = 0; i < sidePane.length; i++) {
    expect(sidePane.at(i).props()).toHaveProperty('total');
    expect(sidePane.at(i).props()).toHaveProperty('color', null);
    expect(sidePane.at(i).props()).toHaveProperty('currency', sellerStore.currency);
    expect(sidePane.at(i).props()).toHaveProperty('noOfItems', 1);
    expect(sidePane.at(i).props()).toHaveProperty('updateStock', updateStock);
    expect(sidePane.at(i).props()).toHaveProperty('resetStock', resetStock);
    expect(sidePane.at(i).props()).toHaveProperty('checkoutInProgress', false);
    expect(sidePane.at(i).props()).toHaveProperty('createOrderInDb', createOrderInDb);
    expect(sidePane.at(i).props()).toHaveProperty('stockEnabled', sellerStore.enableInventoryManagement);
    expect(sidePane.at(i).props()).toHaveProperty('items', items);
    expect(sidePane.at(i).props()).toHaveProperty('cart', cart);
    expect(sidePane.at(i).props()).toHaveProperty('merchantId', sellerStore.merchantId);
  }

  /* Item Table */
  const itemTable = component.find(ItemTable);
  // renders the item table
  // renders twice (once for onlyComputer and once for onlyMobile&Tablet)
  expect(itemTable.length).toEqual(2);
  // passes correct initial props
  for (let i = 0; i < itemTable.length; i++) {
    expect(itemTable.at(i).props()).toHaveProperty('items', items);
    expect(itemTable.at(i).props()).toHaveProperty('currency', sellerStore.currency);
    expect(itemTable.at(i).props()).toHaveProperty('cart', cart);
    expect(itemTable.at(i).props()).toHaveProperty('url', '/store123');
    expect(itemTable.at(i).props()).toHaveProperty('removeItem', removeItem);
    expect(itemTable.at(i).props()).toHaveProperty('editItemQuantity', editItemQuantity);
    expect(itemTable.at(i).props()).toHaveProperty('contextRef', ref);
    expect(itemTable.at(i).props()).toHaveProperty('changeInProgress', false);
    expect(itemTable.at(i).props()).toHaveProperty('checkoutInProgress', false);
    expect(itemTable.at(i).props()).toHaveProperty('color', null);
    expect(itemTable.at(i).props()).toHaveProperty('stockEnabled', sellerStore.enableInventoryManagement);
    expect(itemTable.at(i).props()).toHaveProperty('ratingEnabled', sellerStore.enableRating);
    expect(itemTable.at(i).props()).toHaveProperty('onComputerAndTablet');
  }
});
