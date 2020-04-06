import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SellerApp from '../SellerApp'
import { MAIN_ROUTE } from '../../constants/routes';

function App() {
   return (
        <BrowserRouter>
            <Switch>
                <Route
                    path={MAIN_ROUTE}
                    component={SellerApp} />}
                    />
                </Switch>
        </BrowserRouter>
    );
}

export default App;