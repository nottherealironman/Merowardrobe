import { FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILURE, LOGOUT_USER} from '../actions/constants/action-types';
 
const initialState = {
  logged_in : false,
  userinfo : []
};

const user = (state = initialState, action) => {
	switch(action.type){
	
		case FETCH_USER_INFO_SUCCESS:
			return {
		        ...state,
		        logged_in : true,
				userinfo : action.payload.user
			};

		case FETCH_USER_INFO_FAILURE:
			return {
				...state,
				logged_in : false,
				userinfo : []
			};

		case LOGOUT_USER:
			return {
				...state,
				logged_in : false,
				userinfo : []
			};

		default:
			return state;
	}
}

export default user;