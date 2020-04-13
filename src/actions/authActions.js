import { AUTH_ACTION_TYPES } from '../constants/actionTypes'
import { toastr } from 'react-redux-toastr'

import * as ROUTES from '../constants/routes'

export const signInWithFb = (currentStore, firestore) => {
    return (dispatch, getState, {getFirebase }) => {
        const firebase = getFirebase();

        console.log('curerent store :', currentStore)

        firebase.login({
            provider: 'facebook',
            type: 'popup',
            // scopes: ['email'] // not required
        })
        .then(socialAuthUser => {
            //create a user in the db
            return firestore
            .collection('Stores')
            .doc(currentStore)
            .collection('Buyers')
            .doc(socialAuthUser.user.uid)
            .set({
                displayName: socialAuthUser.profile.displayName,
                email: socialAuthUser.profile.email,
                avatarUrl : socialAuthUser.profile.avatarUrl,
              },
              {
                  merge: true
              }
            );
          })
        .then((result) => {
            dispatch({ type : AUTH_ACTION_TYPES.LOGIN_SUCCESS })
        })
        .catch((error) => {
            dispatch({ 
                type: AUTH_ACTION_TYPES.LOGIN_ERROR, 
                error,
            })
            toastr.error('Could not log in', error.message)
        })
    }
}

export const signOut = (history, url) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            history.push(`${url}${ROUTES.HOME_ROUTE}`)
            dispatch({ type : AUTH_ACTION_TYPES.SIGNOUT_SUCCESS })
        }).catch((error) => {
            dispatch({ 
                type: AUTH_ACTION_TYPES.SIGNOUT_ERROR, 
                error,
            })
            toastr.error('Error', error.message)
        })
    }
}