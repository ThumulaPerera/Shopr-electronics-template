import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom';
import PropTypes from 'prop-types';

import FbSignOutButton from '../../FbSignOutButton';
import BrowseProductsLink from '../BrowseProductsLink';
import CartLink from '../CartLink';
import MyPurchasesLink from '../MyPurchasesLink';
import ProfileLink from '../ProfileLink';

import applyUrlCorrection from '../../../helpers/applyUrlCorrection';

const MobileSignedOutMenu = ({
  activeItem, handleItemClick, color, logo, displayName, displayPhoto,
}) => {
  let { url } = useRouteMatch();
  url = applyUrlCorrection(url);

  return (
    <Menu
      color={color}
      borderless
      style={{ padding: '1em', borderRadius: '0px', paddingTop: '2.3em' }}
    >
      <Dropdown
        icon="bars"
        style={{ paddingTop: '.8em' }}
      >
        <Dropdown.Menu>
          <Dropdown.Item>
            <BrowseProductsLink
              url={url}
              activeItem={activeItem}
              handleItemClick={handleItemClick}
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <CartLink
              url={url}
              activeItem={activeItem}
              handleItemClick={handleItemClick}
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <MyPurchasesLink url={url} activeItem={activeItem} handleItemClick={handleItemClick} />
          </Dropdown.Item>
          <Dropdown.Item>
            <ProfileLink
              url={url}
              activeItem={activeItem}
              handleItemClick={handleItemClick}
              displayName={displayName}
              displayPhoto={displayPhoto}
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <FbSignOutButton />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Menu position="right">
        <Image src={logo} style={{ height: '3rem', marginRight: '2rem', marginLeft: '2rem' }} />
      </Menu.Menu>
    </Menu>
  );
};

export default MobileSignedOutMenu;

MobileSignedOutMenu.propTypes = {
  activeItem: PropTypes.string.isRequired,
  handleItemClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  logo: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  displayPhoto: PropTypes.string.isRequired,
};

MobileSignedOutMenu.defaultProps = {
  color: 'black',
};
