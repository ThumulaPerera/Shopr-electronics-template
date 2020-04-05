import React, { Component, createRef } from 'react'
import { Input, Menu, Button } from 'semantic-ui-react'
import { NavLink, useRouteMatch } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'
import applyUrlCorrection from '../../helpers/applyUrlCorrection'

const SignedInMenu = ({ activeItem, handleItemClick }) => {
  let { url } = useRouteMatch();
  url = applyUrlCorrection(url);

  console.log(activeItem)

  return(
  <Menu
    attached='top'
    tabular
    style={{ backgroundColor: '#fff', paddingTop: '1em' }}
  >
    <NavLink to={`${url}${ROUTES.HOME_ROUTE}`}>
      <Menu.Item 
      active={activeItem === 'Browse Products'} 
      name='Browse Products' 
      onClick={handleItemClick}
      />
    </NavLink>
    <Menu.Menu position='right'>
      <NavLink to={`${url}${ROUTES.CART_ROUTE}`}>
        <Menu.Item 
        active={activeItem === 'Cart'} 
        name='Cart' 
        onClick={handleItemClick}
        />
      </NavLink>
      <NavLink to={`${url}${ROUTES.MY_PURCHASES_ROUTE}`}>
        <Menu.Item 
        active={activeItem === 'My Purchases'} 
        name='My Purchases' 
        onClick={handleItemClick}  
        />
               
      </NavLink>
      <NavLink to={`${url}${ROUTES.PROFILE_ROUTE}`}>
        <Menu.Item 
        active={activeItem === 'Profile'} 
        name='Profile' 
        onClick={handleItemClick}  
        />
      </NavLink>
      {/* <Menu.Item> */}
      <Button primary style={{ marginLeft: '10px', marginBottom: '5px' }}>Sign Out</Button>
      {/* </Menu.Item> */}
    </Menu.Menu>
  </Menu>
)}

export default SignedInMenu;