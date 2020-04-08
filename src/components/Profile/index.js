import React from 'react'
import { connect } from 'react-redux'

import SignInToContinue from '../SignInToContinue'

function Profile({ auth }) {
    if (!auth.uid){
        return <SignInToContinue />
    }

    return (
        <div>
            <h1>Profile Page</h1>
        </div>
    )
}

const mapStateToProps = state => ({
    auth : state.firebase.auth,
}) 

export default connect(mapStateToProps)(Profile)
