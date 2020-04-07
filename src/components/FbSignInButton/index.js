import React from 'react'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withFirestore } from 'react-redux-firebase'
import { compose } from 'redux'
import { useRouteMatch } from 'react-router-dom'

import { signInWithFb } from '../../actions/authActions'

function FbSignInButton({ signIn }) {

    return (
        <Button primary onClick={signIn}> Sign In With Facbook </Button>
    )
}

const mapDispatchToProps = (dispatch, { storeID, firestore }) => {
    return {
        signIn : () => dispatch(signInWithFb(storeID, firestore)),
    }
}

function withHooks(Component) {
    return function WrappedComponent(props) {
        const match = useRouteMatch();
        console.log('match :', match)
        return <Component {...props} storeID={match.params.storeID}  />;
    }
}

export default compose(
    withHooks,
    withFirestore,
    connect(null, mapDispatchToProps)
)
(FbSignInButton)
