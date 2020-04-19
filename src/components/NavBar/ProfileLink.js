import React from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

function ProfileLink({ url, activeItem, handleItemClick }) {
    return (
        <NavLink to={`${url}${ROUTES.PROFILE_ROUTE}`}>
            <Menu.Item
                as='p'
                active={activeItem === 'Profile'}
                name='Profile'
                onClick={handleItemClick}
                icon='user'
            >
            </Menu.Item>
        </NavLink>
    )
}

export default ProfileLink
