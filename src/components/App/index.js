import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import SellerApp from '../SellerApp';
import HomePage from '../HomePage';
import { MAIN_ROUTE } from '../../constants/routes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={MAIN_ROUTE}
          component={SellerApp}
        />
        <Route
          path=""
          component={HomePage}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
