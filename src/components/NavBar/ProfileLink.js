import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from '../../constants/routes';

function ProfileLink({ url, activeItem, handleItemClick }) {
  return (
    <NavLink to={`${url}${ROUTES.PROFILE_ROUTE}`}>
      <Menu.Item
        as="p"
        active={activeItem === 'Profile'}
        name="Profile"
        onClick={handleItemClick}
        icon="user"
      />
    </NavLink>
  );
}

export default ProfileLink;

ProfileLink.propTypes = {
  url: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
};
