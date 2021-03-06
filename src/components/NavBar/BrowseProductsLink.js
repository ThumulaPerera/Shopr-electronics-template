import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from '../../constants/routes';

function BrowseProductsLink({ url, activeItem, handleItemClick }) {
  return (
    <NavLink to={`${url}${ROUTES.HOME_ROUTE}`}>
      <Menu.Item
        as="p"
        active={activeItem === 'Browse Products'}
        name="Browse Products"
        onClick={handleItemClick}
      />
    </NavLink>
  );
}

export default BrowseProductsLink;

BrowseProductsLink.propTypes = {
  url: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
};
