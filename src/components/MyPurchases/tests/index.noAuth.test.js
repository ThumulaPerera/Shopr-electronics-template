/* eslint-disable no-undef */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { Route, MemoryRouter } from 'react-router-dom';
import { shallow } from 'enzyme';

import { MyPurchases as UnconnectedMyPurchases } from '../index';
import SignInToContinue from '../../SignInToContinue';

import { MAIN_ROUTE, MY_PURCHASES_ROUTE } from '../../../constants/routes';

jest.unmock('react-redux-firebase');
const rrf = require.requireActual('react-redux-firebase');

let component;

beforeEach(() => {
  // mock fn for isLoaded
  rrf.isLoaded = jest.fn(() => true);

  // eslint-disable-next-line no-console
  console.error = jest.fn(); /* disable proptype warnings */

  component = shallow(
    <MemoryRouter initialEntries={[{ pathname: `/storeId123${MY_PURCHASES_ROUTE}`, key: 'testKey' }]}>
      <Route path={`${MAIN_ROUTE}${MY_PURCHASES_ROUTE}`}>
        <UnconnectedMyPurchases
          auth={{}}
        />
      </Route>
    </MemoryRouter>
    ,
  ).find(UnconnectedMyPurchases).shallow();
});

afterEach(cleanup);

it('renders sign in to continue if auth.uid is absent', () => {
  expect(component).toMatchSnapshot();

  // renders sign in to continue
  expect(component.find(SignInToContinue).length).toEqual(1);
});
