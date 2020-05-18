import React from 'react';
import {
  Dropdown,
} from 'semantic-ui-react';

import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { get } from 'lodash';
import { compose } from 'redux';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import applyUrlCorrection from '../../../helpers/applyUrlCorrection';

const CategoryMenu = (props) => {
  const {
    categories, storeCustomization, handleCategoryClick, selectedCategory,
  } = props;

  if (!isLoaded(storeCustomization)) {
    return <div>Loading...</div>;
  }

  if (!isLoaded(categories)) {
    return <div>Loading...</div>;
  }

  if (isEmpty(categories)) {
    return <div>No categories to display...</div>;
  }

  // const color = storeCustomization.color ? storeCustomization.color : null;
  const options = [];
  options.push({ key: 'All', text: 'All', value: 'All' });
  Object.keys(categories).map((key) => {
    const { name } = categories[key];
    options.push({ key: name, text: name, value: name });
    return null;
  });

  return (
    <Dropdown
      onChange={handleCategoryClick}
      options={options}
      search
      selection
      value={selectedCategory}
      scrolling
      fluid
    />
  );
};

const mapStateToProps = (state) => ({
  categories: get(state.firestore.data, 'sellerStore.categories'),
  storeCustomization: get(state.firestore.data, 'sellerStore.storeCustomization'),
});

function withHooks(Component) {
  return function WrappedComponent(props) {
    const { url } = useRouteMatch();
    return <Component {...props} url={applyUrlCorrection(url)} />;
  };
}

export default compose(
  withHooks,
  connect(mapStateToProps),
)(CategoryMenu);

CategoryMenu.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  storeCustomization: PropTypes.object.isRequired,
};
