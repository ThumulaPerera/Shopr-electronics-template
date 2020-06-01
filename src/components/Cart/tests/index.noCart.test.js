/* eslint-disable no-undef */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Header, Button } from 'semantic-ui-react';
import { Cart as UnconnectedCart } from '../index';

jest.unmock('react-redux-firebase');
const rrf = require.requireActual('react-redux-firebase');

let component;

beforeEach(() => {
  // mock fn for isLoaded
  rrf.isLoaded = jest.fn(() => true);

  component = shallow(
    <UnconnectedCart
      auth={{ uid: '123' }}
      cart={[]}
      match={{
        params: {
          storeID: 'store123',
        },
      }}
    />,
  );
});

afterEach(cleanup);

it('renders cart empty message if cart is empty', () => {
  expect(component).toMatchSnapshot();

  // renders cart empty message
  const message = (
    <Header
      as="h2"
      style={{ fontSize: '1.3em', fontWeight: 'normal' }}
    >
      You don&apos;t have any items in your cart
    </Header>
  );
  expect(component).toContainReact(message);

  // renders start shopping button
  const btn = (
    <Button
      as="a"
      href="/store123"
      primary
      size="big"
    >
      Start shopping
    </Button>
  );
  expect(component).toContainReact(btn);
});
