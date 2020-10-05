import { FETCH_STORE_BEGINS, FETCH_STORE_SUCCESS, FETCH_STORE_FAILURE} from '../actions/constants/action-types';
 
const initialState = {
  items : [],
  loading: false,
  error: null
};

const stores = (state = initialState, action) => {
	switch(action.type){
		case FETCH_STORE_BEGINS:
			return {
		        ...state,
		        loading: true,
		        error: null
		    };

		case FETCH_STORE_SUCCESS:
			return {
		        ...state,
		        loading : false,
				//items : [...state.items, action.payload.stores]
				items : action.payload.stores
			};

		case FETCH_STORE_FAILURE:
			return {
				...state,
				loading : false,
				items : []
			};

		default:
			return state;
	}
}

export default stores;