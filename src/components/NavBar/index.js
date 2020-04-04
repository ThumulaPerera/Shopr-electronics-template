import React, { Component, createRef } from 'react'
import { Image, Input, Menu, Segment, Sticky } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import _ from 'lodash'

import SignedInMenu from './SignedInMenu'

export default class NavBar extends Component {
  contextRef = createRef()

  render() {
    const { contextRef } = this.props

    return (
        <Sticky context={contextRef}>
            <SignedInMenu/>
          
        </Sticky>
    )
  }
}