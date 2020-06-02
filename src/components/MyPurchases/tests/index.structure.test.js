/* eslint-disable no-undef */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { mount } from 'enzyme';
import { Route, MemoryRouter } from 'react-router-dom';

import { MyPurchases as UnconnectedMyPurchases } from '../index';
import Order from '../Order';

import { items, orders, sellerStore } from '../../../mockData/myPurchasesTestsMockData';
import { MAIN_ROUTE, MY_PURCHASES_ROUTE } from '../../../constants/routes';


jest.unmock('react-redux-firebase');
const rrf = require.requireActual('react-redux-firebase');

let component;

const addReview = jest.fn();
const toDate = jest.fn(() => new Date(2018, 11, 24, 10, 33, 30));
orders.forEach((order) => {
  // eslint-disable-next-line no-param-reassign
  order.date.toDate = toDate;
  return null;
});

beforeEach(() => {
  rrf.isLoaded = jest.fn(() => true);
  component = mount(
    <MemoryRouter initialEntries={[{ pathname: `/storeId123${MY_PURCHASES_ROUTE}`, key: 'testKey' }]}>
      <Route path={`${MAIN_ROUTE}${MY_PURCHASES_ROUTE}`}>
        <UnconnectedMyPurchases
          auth={{ uid: '123' }}
          items={items}
          currency={sellerStore.currency}
          color={null}
          ratingEnabled={sellerStore.enableRating}
          orders={orders}
          orderStates={
              [
                'Paid',
                'Shipped',
                'Delivered',
              ]
          }
          addReview={addReview}
          changeInProgress={false}
          match={{
            params: {
              storeID: 'store123',
            },
          }}
          storeName={sellerStore.storeName}
        />
        ,
      </Route>
    </MemoryRouter>
    ,
  );
});

afterEach(cleanup);

it('renders the corresponding sub components and passes props correctly', () => {
  /* Order */
  const order = component.find(Order);
  // renders the order
  expect(order.length).toEqual(1);
  // passes correct initial props
  expect(order.props()).toHaveProperty('order', orders[0]);
  expect(order.props()).toHaveProperty('items', items);
  expect(order.props()).toHaveProperty('currency', sellerStore.currency);
  expect(order.props()).toHaveProperty('color', null);
  expect(order.props()).toHaveProperty('ratingEnabled', sellerStore.enableRating);
  expect(order.props()).toHaveProperty('orderStates', [
    'Paid',
    'Shipped',
    'Delivered',
  ]);
  expect(order.props()).toHaveProperty('addReview', addReview);
  expect(order.props()).toHaveProperty('changeInProgress', false);
  expect(order.props()).toHaveProperty('buyerId', '123');
  expect(order.props()).toHaveProperty('url', '/store123');
});
