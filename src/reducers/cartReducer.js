import { CART_ACTION_TYPES } from '../constants/actionTypes'

const initState = {
    changeInProgress : false,
    deleteError : null,
    editError : null,
}

const cartReducer = (state = initState, action) => {
    switch(action.type){
        case CART_ACTION_TYPES.DELETE_IN_PROGRESS:
            console.log('delete in progress')
            return{
                ...state, 
                deleteError : null,
                changeInProgress : true
            }

        case CART_ACTION_TYPES.DELETE_SUCCESS:
            console.log('delete success')
            return{
                ...state, 
                deleteError : null,
                changeInProgress : false
            }

        case CART_ACTION_TYPES.DELETE_ERROR:
            console.log('delete error :',action.error)
            return{
                ...state, 
                deleteError : action.error,
                changeInProgress : false,
            }

        case CART_ACTION_TYPES.EDIT_IN_PROGRESS:
            console.log('edit in progress')
            return{
                ...state, 
                editError : null,
                changeInProgress : true
            }

        case CART_ACTION_TYPES.EDIT_SUCCESS:
            console.log('edit success')
            return{
                ...state, 
                editError : null,
                changeInProgress : false
            }

        case CART_ACTION_TYPES.EDIT_ERROR:
            console.log('edit error :',action.error)
            return{
                ...state, 
                editError : action.error,
                changeInProgress : false,
            }
        
        default : return state
    }
}

export default cartReducer