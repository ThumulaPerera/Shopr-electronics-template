import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import FbSignInButton from '../FbSignInButton';
import BrowseProductsLink from './BrowseProductsLink';

import applyUrlCorrection from '../../helpers/applyUrlCorrection';

const SignedOutMenu = ({
  activeItem, handleItemClick, color, logo,
}) => {
  let { url } = useRouteMatch();
  url = applyUrlCorrection(url);

  return (
    <Menu
      color={color}
      borderless
      stackable
      style={{ padding: '1em', borderRadius: '0px' }}
    >
      <Image src={logo} style={{ height: '3rem', marginRight: '2rem', marginLeft: '2rem' }} />
      <BrowseProductsLink url={url} activeItem={activeItem} handleItemClick={handleItemClick} />
      <Menu.Menu position="right">
        <FbSignInButton />
      </Menu.Menu>
    </Menu>
  );
};

export default SignedOutMenu;

SignedOutMenu.propTypes = {
  activeItem: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};
