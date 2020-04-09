import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from "react-router";
import { compose } from 'redux'

import { signOut } from '../../actions/authActions'
import applyUrlCorrection from '../../helpers/applyUrlCorrection'

function FbSignOutButton({ signOut, history, match }) {
    return (
        <Button primary onClick={() => {signOut(history, match.url)}}> Sign Out </Button>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut : (history, url) => dispatch(signOut(history, url)),
    }
}

export default compose(
    withRouter,
    connect(null, mapDispatchToProps)
)
(FbSignOutButton)