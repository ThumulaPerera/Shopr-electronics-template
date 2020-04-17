import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as toastrReducer} from 'react-redux-toastr'
import { reducer as formReducer } from 'redux-form'

import authReducer from '../reducers/authReducer'
import cartReducer from '../reducers/cartReducer'

const rootReducer = combineReducers({
     cart: cartReducer,
     auth: authReducer,
     firebase: firebaseReducer,
     firestore: firestoreReducer, // <- needed if using firestore
     toastr: toastrReducer, // <- Mounted at toastr.
     form: formReducer //<- for redux-form
})

export default rootReducer;