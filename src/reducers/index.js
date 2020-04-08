import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import {reducer as toastrReducer} from 'react-redux-toastr'
import authReducer from '../reducers/authReducer'

const rootReducer = combineReducers({
     auth: authReducer,
     firebase: firebaseReducer,
     firestore: firestoreReducer, // <- needed if using firestore
     toastr: toastrReducer // <- Mounted at toastr.

})

export default rootReducer;