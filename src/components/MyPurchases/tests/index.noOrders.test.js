/* eslint-disable no-undef */
import React from 'react';
import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import { Header, Button } from 'semantic-ui-react';
import { MyPurchases as UnconnectedMyPurchases } from '../index';

jest.unmock('react-redux-firebase');
const rrf = require.requireActual('react-redux-firebase');

let component;

beforeEach(() => {
  // mock fn for isLoaded
  rrf.isLoaded = jest.fn(() => true);

  // eslint-disable-next-line no-console
  console.error = jest.fn(); /* disable proptype warnings */

  component = shallow(
    <UnconnectedMyPurchases
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

it('renders purchases empty message if purchases are empty', () => {
  expect(component).toMatchSnapshot();

  // renders cart empty message
  const message = (
    <Header
      as="h2"
      style={{ fontSize: '1.3em', fontWeight: 'normal' }}
    >
      You don&apos;t have any purchases
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
