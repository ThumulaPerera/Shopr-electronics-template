import React from 'react'
import { compose } from 'redux'
import { isLoaded, isEmpty } from 'react-redux-firebase'
import { connect } from 'react-redux'
import { Grid, Segment, Loader} from 'semantic-ui-react'
import { get } from 'lodash'
import { firestoreConnect } from 'react-redux-firebase'

import ItemTable from './ItemTable'
import SignInToContinue from '../SignInToContinue'

function Cart({ auth, items, currency, cart, match }) {
    if (!auth.uid){
        return <SignInToContinue icon='shopping cart'/>
    }

    if (!(isLoaded(items) && isLoaded(currency) && isLoaded(cart))){
        return <Loader />
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width='12'>
                    <ItemTable items={items} currency={currency} cart={cart} url={`/${match.params.storeID}`}/>
                </Grid.Column>
                <Grid.Column width='4'>
                    <Segment basic color='black' secondary inverted size='massive' style={{height:'60rem'}}>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const mapStateToProps = state => ({
    items : get(state.firestore.data, `sellerItems`),
    currency : get(state.firestore.data, `sellerStore.currency`),
    cart : get(state.firestore.data, `buyer.cart`)
}) 

const connectTo = ({ match, auth }) => {
    if(!(isLoaded(auth))){
        return []
    }
    return [{
        collection : `Stores/${match.params.storeID}/Buyers`,
        doc : auth.uid,
        storeAs : 'buyer'
    }]
}

export default compose(
    connect(state => ({auth : state.firebase.auth})),
    firestoreConnect(connectTo),
    connect(mapStateToProps)
)(Cart)