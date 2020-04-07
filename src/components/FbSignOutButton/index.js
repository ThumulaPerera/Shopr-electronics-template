import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { signOut } from '../../actions/authActions'

function FbSignOutButton({ signOut }) {
    return (
        <Button primary onClick={signOut}> Sign Out </Button>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut : () => dispatch(signOut()),
    }
}

export default connect(null, mapDispatchToProps)(FbSignOutButton)