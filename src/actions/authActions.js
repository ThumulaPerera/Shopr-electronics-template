import { AUTH_ACTION_TYPES } from '../constants/actionTypes'

export const signInWithFb = (currentStore, firestore) => {
    return (dispatch, getState, {getFirebase }) => {
        const firebase = getFirebase();

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
              }
            );
          })
        .then(() => {
            dispatch({ type : AUTH_ACTION_TYPES.LOGIN_SUCCESS })
        })
        .catch((error) => {
            dispatch({ 
                type: AUTH_ACTION_TYPES.LOGIN_ERROR, 
                error,
            })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type : AUTH_ACTION_TYPES.SIGNOUT_SUCCESS })
        }).catch((error) => {
            dispatch({ 
                type: AUTH_ACTION_TYPES.SIGNOUT_ERROR, 
                error,
            })
        })
    }
}