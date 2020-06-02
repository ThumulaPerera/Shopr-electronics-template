/* eslint-disable no-undef */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Loader } from 'semantic-ui-react';

import { MyPurchases as UnconnectedMyPurchases } from '../index';

jest.unmock('react-redux-firebase');
const rrf = require.requireActual('react-redux-firebase');

let component;

beforeEach(() => {
  // mock fn for isLoaded
  rrf.isLoaded = jest.fn(() => false);

  // eslint-disable-next-line no-console
  console.error = jest.fn(); /* disable proptype warnings */

  component = shallow(
    <UnconnectedMyPurchases auth={{
      uid: '123',
    }}
    />,
  );
});

afterEach(cleanup);

it('renders loader if values in store are not loaded', () => {
  expect(component).toMatchSnapshot();

  // renders loader
  expect(component.find(Loader).length).toEqual(1);
});
