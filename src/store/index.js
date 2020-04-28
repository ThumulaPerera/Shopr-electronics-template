import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase';

import rootReducer from '../reducers';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase })),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    // remove above line before building
  ),
);

export default store;
