import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink, useRouteMatch } from 'react-router-dom'

import FbSignInButton from '../FbSignInButton'
import BrowseProductsLink from './BrowseProductsLink'

import * as ROUTES from '../../constants/routes'
import applyUrlCorrection from '../../helpers/applyUrlCorrection'

const SignedInMenu = ({ activeItem, handleItemClick, color }) => {
  let { url } = useRouteMatch();
  url = applyUrlCorrection(url);

  console.log(activeItem)

  return (
    <Menu
      color={color}
      borderless
      stackable
      style={{ padding: '1em', borderRadius: '0px' }}
    >
      <BrowseProductsLink url={url} activeItem={activeItem} handleItemClick={handleItemClick} />
      <Menu.Menu position='right'>
        <FbSignInButton />
      </Menu.Menu>
    </Menu>
  )
}

export default SignedInMenu;