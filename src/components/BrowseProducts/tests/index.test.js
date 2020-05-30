/* eslint-disable no-undef */
import React, { createRef } from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { cleanup } from '@testing-library/react';

import { Route, MemoryRouter } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import BrowseProducts from '../index';

import { minItems } from '../../../mockData/itemsArrayMin';
import { sellerStore } from '../../../mockData/sellerStoreObject';


jest.mock('react-redux-firebase');

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
  isLoaded.mockReturnValue(true);

  // const ref = createRef();
  component = renderer.create(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: '/home', key: 'testKey' }]}>
        <Route path="/home">
          <BrowseProducts contextRef={createRef()} />
        </Route>
      </MemoryRouter>
    </Provider>,
  );
});

afterEach(cleanup);

it('should render with given state from Redux store', () => {
  // mock fn for isLoaded
  isLoaded.mockReturnValue(true);

  expect(component.toJSON()).toMatchSnapshot();
});
