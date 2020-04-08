import React from 'react'
import { connect } from 'react-redux'

import ItemPage from '../ItemPage'
import SignInToContinue from '../SignInToContinue'

function Cart({ auth }) {
    if (!auth.uid){
        return <SignInToContinue icon='shopping cart'/>
    }

    return (
        <div>
            <ItemPage />   {/*<--remove later*/}
        </div>
    )
}

const mapStateToProps = state => ({
    auth : state.firebase.auth,
}) 

export default connect(mapStateToProps)(Cart)