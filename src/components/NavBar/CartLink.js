import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from '../../constants/routes';

function CartLink({ url, activeItem, handleItemClick }) {
  return (
    <NavLink to={`${url}${ROUTES.CART_ROUTE}`}>
      <Menu.Item
        as="p"
        active={activeItem === 'Cart'}
        name="Cart"
        onClick={handleItemClick}
        icon="cart"
      />
    </NavLink>
  );
}

export default CartLink;

CartLink.propTypes = {
  url: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
};
