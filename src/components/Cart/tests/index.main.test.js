/* eslint-disable no-undef */
import React, { createRef } from 'react';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';

import { Route, MemoryRouter } from 'react-router-dom';
import { Cart as UnconnectedCart } from '../index';

import { items, cart, sellerStore } from '../../../mockData/cartTestsMockData';
import { MAIN_ROUTE, CART_ROUTE } from '../../../constants/routes';


jest.unmock('react-redux-firebase');
const rrf = require.requireActual('react-redux-firebase');

let component;

beforeEach(() => {
  const removeItem = jest.fn();
  const editItemQuantity = jest.fn();
  const updateStock = jest.fn();
  const resetStock = jest.fn();
  const createOrderInDb = jest.fn();

  rrf.isLoaded = jest.fn(() => true);
  const ref = createRef();
  component = renderer.create(
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

it('renders with given props', () => {
  expect(component.toJSON()).toMatchSnapshot();
});
