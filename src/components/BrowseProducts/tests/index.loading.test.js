/* eslint-disable no-undef */
import React, { createRef } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { cleanup } from '@testing-library/react';
import { mount } from 'enzyme';
import { Route, MemoryRouter } from 'react-router-dom';
import { Loader } from 'semantic-ui-react';

import BrowseProducts, { BrowseProducts as UnconnectedBrowseProducts } from '../index';

import { minItems, sellerStore } from '../../../mockData/browseProductsTestsMockData';


jest.unmock('react-redux-firebase');
const rrf = require.requireActual('react-redux-firebase');

const mockStore = configureStore([]);

let store;
let component;

beforeEach(() => {
  store = mockStore({
    firestore: {
      ordered: {
        sellerItems: minItems,
      },
      data: {
        sellerStore,
      },
    },
  });

  // mock fn for window.scrollTo
  global.scrollTo = jest.fn();

  // mock fn for isLoaded
  rrf.isLoaded = jest.fn(() => false);

  // const ref = createRef();
  const wrapperComponent = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: '/home', key: 'testKey' }]}>
        <Route path="/home">
          <BrowseProducts contextRef={createRef()} />
        </Route>
      </MemoryRouter>
    </Provider>,
  );
  component = wrapperComponent.find(UnconnectedBrowseProducts);
});

afterEach(cleanup);

it('renders loader if values in store are not loaded', () => {
  expect(component).toMatchSnapshot();

  // renders loader
  expect(component.find(Loader).length).toEqual(1);
});
