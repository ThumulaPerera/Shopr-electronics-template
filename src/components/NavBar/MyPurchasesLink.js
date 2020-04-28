import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from '../../constants/routes';

function MyPurchasesLink({ url, activeItem, handleItemClick }) {
  return (
    <NavLink to={`${url}${ROUTES.MY_PURCHASES_ROUTE}`}>
      <Menu.Item
        as="p"
        active={activeItem === 'My Purchases'}
        name="My Purchases"
        onClick={handleItemClick}
        icon="clipboard list"
      />
    </NavLink>
  );
}

export default MyPurchasesLink;

MyPurchasesLink.propTypes = {
  url: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
};
