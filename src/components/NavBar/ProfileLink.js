import React from 'react';
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTES from '../../constants/routes';

function ProfileLink({
  // eslint-disable-next-line no-unused-vars
  url, activeItem, handleItemClick, displayName, displayPhoto,
}) {
  return (
    <NavLink to={`${url}${ROUTES.PROFILE_ROUTE}`}>
      <Menu.Item
        as="p"
        active={activeItem === displayName}
        name={displayName}
        onClick={handleItemClick}
        icon="user"
      >
        {/* <Image src={displayPhoto} avatar size="mini" spaced="right" /> */}
        {/* {displayName} */}
      </Menu.Item>
    </NavLink>
  );
}

export default ProfileLink;

ProfileLink.propTypes = {
  url: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  displayPhoto: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
};
