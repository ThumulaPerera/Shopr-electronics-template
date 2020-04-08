import React, { Component, createRef } from 'react'
import { Sticky } from 'semantic-ui-react'
import { connect } from 'react-redux'

import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'

class NavBar extends Component {
  state = { activeItem: 'Browse Products' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  contextRef = createRef()

  render() {
    const { contextRef, auth } = this.props

    return (
        <Sticky context={contextRef}>
          {auth.uid ? 
            <SignedInMenu activeItem={this.state.activeItem} handleItemClick={this.handleItemClick} />  
            :
            <SignedOutMenu activeItem={this.state.activeItem} handleItemClick={this.handleItemClick} />
          }
        </Sticky>
    )
  }
}

const mapStateToProps = state => ({
  auth : state.firebase.auth
})

export default connect(mapStateToProps)(NavBar)