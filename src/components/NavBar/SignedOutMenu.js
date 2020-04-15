import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, useRouteMatch } from 'react-router-dom'

import FbSignInButton from '../FbSignInButton' 

import * as ROUTES from '../../constants/routes'
import applyUrlCorrection from '../../helpers/applyUrlCorrection'

const SignedInMenu = ({ activeItem, handleItemClick, color }) => {
  let { url } = useRouteMatch();
  url = applyUrlCorrection(url);

  console.log(activeItem)

  return (
    <Menu
      color={color}
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
          <FbSignInButton />
        </Menu.Menu>
    </Menu>
  )
}

export default SignedInMenu;