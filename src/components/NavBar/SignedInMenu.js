import React, { Component, createRef } from 'react'
import { Menu, Label } from 'semantic-ui-react'
import { NavLink, useRouteMatch } from 'react-router-dom'

import FbSignOutButton from '../FbSignOutButton'
import BrowseProductsLink from './BrowseProductsLink'
import CartLink from './CartLink'
import MyPurchasesLink from './MyPurchasesLink'
import ProfileLink from './ProfileLink'

import * as ROUTES from '../../constants/routes'
import applyUrlCorrection from '../../helpers/applyUrlCorrection'

const SignedInMenu = ({ activeItem, handleItemClick, color }) => {
  let { url } = useRouteMatch();
  url = applyUrlCorrection(url);

  return (
    <Menu
      color={color}
      borderless
      stackable
      style={{ padding: '1em', borderRadius: '0px' }}
    >
      <BrowseProductsLink url={url} activeItem={activeItem} handleItemClick={handleItemClick} />
      <Menu.Menu position='right'>
        <CartLink url={url} activeItem={activeItem} handleItemClick={handleItemClick} />
        <MyPurchasesLink url={url} activeItem={activeItem} handleItemClick={handleItemClick} />
        <ProfileLink url={url} activeItem={activeItem} handleItemClick={handleItemClick} />
        <FbSignOutButton />
      </Menu.Menu>
    </Menu>
  )
}

export default SignedInMenu;