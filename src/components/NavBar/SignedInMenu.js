import React, { Component, createRef } from 'react'
import { Input, Menu, Button, Container } from 'semantic-ui-react'
import { NavLink, useRouteMatch } from 'react-router-dom'

import FbSignOutButton from '../FbSignOutButton' 

import * as ROUTES from '../../constants/routes'
import applyUrlCorrection from '../../helpers/applyUrlCorrection'

const SignedInMenu = ({ activeItem, handleItemClick }) => {
  let { url } = useRouteMatch();
  url = applyUrlCorrection(url);

  console.log(activeItem)

  return (
    <Menu
      inverted
      style={{ padding: '1em', borderRadius: '0px' }}
    >
        <NavLink to={`${url}${ROUTES.HOME_ROUTE}`}>
          <Menu.Item
            as='p'
            active={activeItem === 'Browse Products'}
            name='Browse Products'
            onClick={handleItemClick}
          />
        </NavLink>
        <Menu.Menu position='right'>
          <NavLink to={`${url}${ROUTES.CART_ROUTE}`}>
            <Menu.Item
              as='p'
              active={activeItem === 'Cart'}
              name='Cart'
              onClick={handleItemClick}
            />
          </NavLink>
          <NavLink to={`${url}${ROUTES.MY_PURCHASES_ROUTE}`}>
            <Menu.Item
              as='p'
              active={activeItem === 'My Purchases'}
              name='My Purchases'
              onClick={handleItemClick}
            />

          </NavLink>
          <NavLink to={`${url}${ROUTES.PROFILE_ROUTE}`}>
            <Menu.Item
              as='p'
              active={activeItem === 'Profile'}
              name='Profile'
              onClick={handleItemClick}
            />
          </NavLink>
          <FbSignOutButton />
        </Menu.Menu>
    </Menu>
  )
}

export default SignedInMenu;