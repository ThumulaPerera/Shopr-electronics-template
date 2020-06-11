/* eslint-disable no-undef */
import React, { createRef } from 'react';
import { Provider } from 'react-redux';
import { Search } from 'semantic-ui-react';
import configureStore from 'redux-mock-store';
import { cleanup } from '@testing-library/react';
import { mount } from 'enzyme';

import { Route, MemoryRouter } from 'react-router-dom';
import { isLoaded } from 'react-redux-firebase';
import BrowseProducts, { BrowseProducts as UnconnectedBrowseProducts } from '../index';
import CategoryMenu from '../CategoryMenu';
import ItemGrid from '../ItemGrid';
import CategoryDropdown from '../CategoryDropdown';
import SearchResultsGrid from '../SearchResultsGrid';

import { MAIN_ROUTE, HOME_ROUTE } from '../../../constants/routes';
import { minItems, sellerStore } from '../../../mockData/browseProductsTestsMockData';

jest.mock('react-redux-firebase');

const mockStore = configureStore([]);

let store;
let component;
const ref = createRef();

beforeAll(() => {
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

  component = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: '/storeId123', key: 'testKey' }]}>
        <Route path={`${MAIN_ROUTE}${HOME_ROUTE}`}>
          <BrowseProducts contextRef={ref} />
        </Route>
      </MemoryRouter>
    </Provider>,
  );
});

afterAll(cleanup);

it('renders the corresponding sub components and passes correct props', () => {
  /* Search field */
  const search = component.find(Search);
  // renders the search field
  expect(search.length).toEqual(1);

  /* Category Menu */
  const categoryMenu = component.find(CategoryMenu);
  // renders
  expect(categoryMenu.length).toEqual(1);
  // passes correct initial props
  expect(categoryMenu.props()).toHaveProperty('selectedCategory', 'All');
  expect(categoryMenu.props()).toHaveProperty('categories', sellerStore.categories);
  expect(categoryMenu.props()).toHaveProperty('storeCustomization', sellerStore.storeCustomization);
  expect(categoryMenu.props()).toHaveProperty('contextRef', ref);
  expect(categoryMenu.props()).toHaveProperty('handleCategoryClick');

  /* Category Dropdown */
  const categoryDropdown = component.find(CategoryDropdown);
  // renders
  expect(categoryDropdown.length).toEqual(1);
  // passes correct initial props
  expect(categoryDropdown.props()).toHaveProperty('selectedCategory', 'All');
  expect(categoryDropdown.props()).toHaveProperty('categories', sellerStore.categories);
  expect(categoryMenu.props()).toHaveProperty('handleCategoryClick');

  /* Item Grid */
  const itemGrid = component.find(ItemGrid);
  // renders the item grid when search value is ''
  // there are 5 categories
  // renders twice (once for onlyComputer and once for onlyMobile&Tablet)
  expect(itemGrid.length).toEqual(10);
  // passes correct initial props
  for (let i = 0; i < itemGrid.length; i++) {
    expect(itemGrid.at(i).props()).toHaveProperty('selectedCategory', `category ${i % 5}`);
    expect(itemGrid.at(i).props()).toHaveProperty('url', '/storeId123');
    expect(itemGrid.at(i).props()).toHaveProperty('searchString', '');
    expect(itemGrid.at(i).props()).toHaveProperty('categories', sellerStore.categories);
    expect(itemGrid.at(i).props()).toHaveProperty('currency', sellerStore.currency);
    expect(itemGrid.at(i).props()).toHaveProperty('ratingEnabled', sellerStore.enableRating);
    expect(itemGrid.at(i).props()).toHaveProperty('items');
    // only 3 items in itemArray shold pass filter test
    expect(itemGrid.at(0).props().items.length).toEqual(3);
  }

  /* Search Results Grid */
  let searchResultsGrid = component.find(SearchResultsGrid);
  // does not render since search value is ''
  expect(searchResultsGrid.length).toEqual(0);

  /* simulating a search value change...... */
  const browseProducts = component.find(UnconnectedBrowseProducts);
  browseProducts.instance().setState({ value: 'a' });
  component.update();

  /* Search Results Grid */
  searchResultsGrid = component.find(SearchResultsGrid);
  // renders after changing the search value
  // renders twice (once for onlyComputer and once for onlyMobile&Tablet)
  expect(searchResultsGrid.length).toEqual(2);
  // passes correct initial props
  for (let i = 0; i < searchResultsGrid.length; i++) {
    expect(searchResultsGrid.at(i).props()).toHaveProperty('searchString', 'a');
    expect(searchResultsGrid.at(i).props()).toHaveProperty('url', '/storeId123');
    expect(searchResultsGrid.at(i).props()).toHaveProperty('currency', sellerStore.currency);
    expect(searchResultsGrid.at(i).props()).toHaveProperty('ratingEnabled', sellerStore.enableRating);
    expect(searchResultsGrid.at(i).props()).toHaveProperty('items');
    // only 3 items in itemArray shold pass filter test
    expect(searchResultsGrid.at(i).props().items.length).toEqual(3);
  }

  // does not render the items grid since search value is not ''
  expect(component.find(ItemGrid).length).toEqual(0);
});
