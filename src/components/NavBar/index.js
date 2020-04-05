import React, { Component, createRef } from 'react'
import { Image, Input, Menu, Segment, Sticky } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

import _ from 'lodash'

import SignedInMenu from './SignedInMenu'

export default class NavBar extends Component {
  state = { activeItem: 'Browse Products' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  contextRef = createRef()

  render() {
    const { contextRef } = this.props

    return (
        <Sticky context={contextRef}>
            <SignedInMenu activeItem={this.state.activeItem} handleItemClick={this.handleItemClick} />  
        </Sticky>
    )
  }
}