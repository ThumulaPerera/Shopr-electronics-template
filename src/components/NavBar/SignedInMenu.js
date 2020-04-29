import React from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import FbSignOutButton from '../FbSignOutButton';
import BrowseProductsLink from './BrowseProductsLink';
import CartLink from './CartLink';
import MyPurchasesLink from './MyPurchasesLink';
import ProfileLink from './ProfileLink';

import applyUrlCorrection from '../../helpers/applyUrlCorrection';

const SignedInMenu = ({
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
        <CartLink url={url} activeItem={activeItem} handleItemClick={handleItemClick} />
        <MyPurchasesLink url={url} activeItem={activeItem} handleItemClick={handleItemClick} />
        <ProfileLink url={url} activeItem={activeItem} handleItemClick={handleItemClick} />
        <FbSignOutButton />
      </Menu.Menu>
    </Menu>
  );
};

export default SignedInMenu;

SignedInMenu.propTypes = {
  activeItem: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  logo: PropTypes.string.isRequired,
};

SignedInMenu.defaultProps = {
  color: 'black',
};
