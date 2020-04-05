import React, { createRef } from 'react';
import { Switch, Route, useRouteMatch, useParams } from 'react-router-dom';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase'

import NavBar from '../NavBar';
import BrowseProducts from '../BrowseProducts';
import MyPurchases from '../MyPurchases';
import Cart from '../Cart';
import Profile from '../Profile'
import * as ROUTES from '../../constants/routes';

function SellerApp() {
    const contextRef = createRef();
    const { path } = useRouteMatch();

    return (
            <div className="App" ref={contextRef}>
                <NavBar contextRef={contextRef} />
                <Switch>
                    <Route
                        path={`${path}${ROUTES.MY_PURCHASES_ROUTE}`}
                        component={MyPurchases} />}
                    />
                    <Route
                        path={`${path}${ROUTES.CART_ROUTE}`}
                        component={Cart} />}
                    />
                    <Route
                        path={`${path}${ROUTES.PROFILE_ROUTE}`}
                        component={Profile} />}
                    />
                    <Route
                        path={`${path}${ROUTES.HOME_ROUTE}`}
                        render={(props) => <BrowseProducts {...props} contextRef={contextRef} />}
                    />
                </Switch>
            </div>
    );
}

const connectTo = ({ match }) => [
    {
        collection: 'stores',
        doc: `${match.params.storeID}`,
        storeAs: 'sellerStore'
    },
    {
        collection: `/stores/${match.params.storeID}/items`,
        storeAs: 'sellerItems'
    },
]

export default compose(
    firestoreConnect(connectTo),
)(SellerApp);


