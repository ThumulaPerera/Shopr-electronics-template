import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, useRouteMatch } from 'react-router-dom'

import FbSignInButton from '../FbSignInButton' 

import * as ROUTES from '../../constants/routes'
import applyUrlCorrection from '../../helpers/applyUrlCorrection'

const SignedInMenu = ({ activeItem, handleItemClick }) => {
  let { url } = useRouteMatch();
  url = applyUrlCorrection(url);

  console.log(activeItem)

  return (
    <Menu
      attached='top'
      inverted
      style={{ padding: '1em' }}
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