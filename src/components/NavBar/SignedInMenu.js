import React, { Component, createRef } from 'react'
import { Input, Menu, Button } from 'semantic-ui-react'
import { NavLink, useRouteMatch } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import applyUrlCorrection from '../../helpers/applyUrlCorrection'

const SignedInMenu = () => {
  let { url } = useRouteMatch();
  url = applyUrlCorrection(url)

  return(
  <Menu
    attached='top'
    tabular
    style={{ backgroundColor: '#fff', paddingTop: '1em' }}
  >
    <NavLink to={`${url}${ROUTES.HOME_ROUTE}`}>
      <Menu.Item as='a' active name='Browse Products' />
    </NavLink>
    <Menu.Menu position='right'>
      <NavLink to={`${url}${ROUTES.CART_ROUTE}`}>
        <Menu.Item as='a' active name='Cart' />
      </NavLink>
      <NavLink to={`${url}${ROUTES.MY_PURCHASES_ROUTE}`}>
        <Menu.Item as='a' active name='My Purchases' />
      </NavLink>
      <NavLink to={`${url}${ROUTES.PROFILE_ROUTE}`}>
        <Menu.Item as='a' active name='Profile' />
      </NavLink>
      {/* <Menu.Item> */}
      <Button primary style={{ marginLeft: '10px' }}>Sign Out</Button>
      {/* </Menu.Item> */}
    </Menu.Menu>
  </Menu>
)}

export default SignedInMenu;