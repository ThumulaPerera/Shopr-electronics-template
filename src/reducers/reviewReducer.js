import { REVIEW_ACTION_TYPES } from '../constants/actionTypes';

const initState = {
  changeInProgress: false,
  error: null,
};

const reviewReducer = (state = initState, action) => {
  switch (action.type) {
    case REVIEW_ACTION_TYPES.REVIEW_IN_PROGRESS:
      console.log('review in progress');
      return {
        ...state,
        error: null,
        changeInProgress: true,
      };

    case REVIEW_ACTION_TYPES.REVIEW_SUCESS:
      console.log('review success');
      return {
        ...state,
        error: null,
        changeInProgress: false,
      };

    case REVIEW_ACTION_TYPES.REVIEW_ERROR:
      console.log('review error :', action.error);
      return {
        ...state,
        error: action.error,
        changeInProgress: false,
      };

    default: return state;
  }
};

export default reviewReducer;
