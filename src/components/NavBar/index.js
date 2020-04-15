import React, { Component, createRef } from 'react'
import { Sticky, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import { isLoaded, isEmpty } from 'react-redux-firebase'

import SignedInMenu from './SignedInMenu'
import SignedOutMenu from './SignedOutMenu'

class NavBar extends Component {
  state = { activeItem: 'Browse Products' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  contextRef = createRef()

  render() {
    const { contextRef, auth, storeCustomization } = this.props

    if(!isLoaded(storeCustomization)) {
      return <Loader/>
    }

    const color = storeCustomization.color ? storeCustomization.color : '';
    // const color = ''

    return (
        <Sticky context={contextRef}>
          {auth.uid ? 
            <SignedInMenu activeItem={this.state.activeItem} handleItemClick={this.handleItemClick} color={color}/>  
            :
            <SignedOutMenu activeItem={this.state.activeItem} handleItemClick={this.handleItemClick} color={color}/>
          }
        </Sticky>
    )
  }
}

const mapStateToProps = state => ({
  auth : state.firebase.auth,
  storeCustomization : get(state.firestore.data, `sellerStore.storeCustomization`),
})

export default connect(mapStateToProps)(NavBar)