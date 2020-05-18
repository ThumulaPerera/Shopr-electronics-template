import React from 'react';
import {
  Dropdown,
} from 'semantic-ui-react';
import { isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import applyUrlCorrection from '../../../helpers/applyUrlCorrection';

const categoryDropdown = (props) => {
  const {
    categories, handleCategoryClick, selectedCategory,
  } = props;

  if (isEmpty(categories)) {
    return null;
  }

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

function withHooks(Component) {
  return function WrappedComponent(props) {
    const { url } = useRouteMatch();
    return <Component {...props} url={applyUrlCorrection(url)} />;
  };
}

export default compose(
  withHooks,
)(categoryDropdown);

categoryDropdown.propTypes = {
  categories: PropTypes.array.isRequired,
  selectedCategory: PropTypes.string.isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};
