/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup } from '@testing-library/react';

import { Route, MemoryRouter } from 'react-router-dom';
import { MyPurchases as UnconnectedMyPurchases } from '../index';

import { items, orders, sellerStore } from '../../../mockData/myPurchasesTestsMockData';
import { MAIN_ROUTE, MY_PURCHASES_ROUTE } from '../../../constants/routes';


jest.unmock('react-redux-firebase');
const rrf = require.requireActual('react-redux-firebase');

let component;

beforeEach(() => {
  const addReview = jest.fn();
  const toDate = jest.fn(() => new Date(2018, 11, 24, 10, 33, 30));

  orders.forEach((order) => {
    // eslint-disable-next-line no-param-reassign
    order.date.toDate = toDate;
    return null;
  });

  rrf.isLoaded = jest.fn(() => true);
  component = renderer.create(
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

it('renders with given props', () => {
  expect(component.toJSON()).toMatchSnapshot();
});
