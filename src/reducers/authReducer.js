import { AUTH_ACTION_TYPES } from '../constants/actionTypes'

const initState = {
    authError : null,
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case AUTH_ACTION_TYPES.LOGIN_SUCCESS:
            console.log('login success')
            return{
                ...state, 
                authError : null
            }

        case AUTH_ACTION_TYPES.LOGIN_ERROR:
            console.log('login error :', action.error)
            return{
                ...state, 
                authError : action.error
            }

        case AUTH_ACTION_TYPES.SIGNOUT_SUCCESS:
            console.log('signout success')
            return{
                ...state, 
                authError : null
            }

        case AUTH_ACTION_TYPES.SIGNOUT_ERROR:
            console.log('signout error :', action.error)
            return{
                ...state, 
                authError : action.error
            }
        
        default : return state
    }
}

export default authReducer