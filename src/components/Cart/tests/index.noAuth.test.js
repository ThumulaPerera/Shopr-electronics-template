/* eslint-disable no-undef */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

import { Cart as UnconnectedCart } from '../index';
import SignInToContinue from '../../SignInToContinue';

import { MAIN_ROUTE, CART_ROUTE } from '../../../constants/routes';

jest.unmock('react-redux-firebase');
const rrf = require.requireActual('react-redux-firebase');

let component;

beforeEach(() => {
  // mock fn for isLoaded
  rrf.isLoaded = jest.fn(() => true);

  component = shallow(
    <MemoryRouter initialEntries={[{ pathname: `/storeId123${CART_ROUTE}`, key: 'testKey' }]}>
      <Route path={`${MAIN_ROUTE}${CART_ROUTE}`}>
        <UnconnectedCart
          auth={{}}
        />
      </Route>
    </MemoryRouter>
    ,
  ).find(UnconnectedCart).shallow();
});

afterEach(cleanup);

it('renders sign in to continue if auth.uid is absent', () => {
  expect(component).toMatchSnapshot();

  // renders sign in to continue
  expect(component.find(SignInToContinue).length).toEqual(1);
});
