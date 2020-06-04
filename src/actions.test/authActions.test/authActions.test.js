/* eslint-disable no-undef */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { toastr } from 'react-redux-toastr';

import { signInWithFb, signOut } from '../../actions/authActions';

/* mock module for firebase */

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockAuthentication();
const mockfirestore = new firebasemock.MockFirestore();
const mockfirebase = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  null,
  // use null if your code does not use AUTHENTICATION
  () => mockauth,
  // use null if your code does not use FIRESTORE
  () => mockfirestore,
  // use null if your code does not use STORAGE
  null,
  // use null if your code does not use MESSAGING
  null,
);

const login = () => {
  const provider = new mockfirebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
    display: 'popup',
  });
  return mockfirebase.auth().signInWithPopup(provider);
};

mockfirebase.login = login;

const getFirebase = () => mockfirebase;

/* *************************************** */

/* mock module for toastr */

jest.mock('react-redux-toastr');
const err = jest.fn((header, message) => console.log(header, message));

// toastr = {
//   err,
// };

/* ************************** */

const middlewares = [thunk.withExtraArgument({ getFirebase })];
const mockStore = configureStore(middlewares);

it.skip('executes sign in', () => {
  const store = mockStore({});
  return store.dispatch(signInWithFb('store123', mockfirebase.firestore())).then(() => {
    mocksdk.firestore().flush();
  });
});
