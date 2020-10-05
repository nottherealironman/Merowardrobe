import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE} from '../actions/constants/action-types';
 
const initialState = {
  categories : [],
  subcategories : [],
  sizes : [],
  loading: false,
  error: null
};

const data = (state = initialState, action) => {
	switch(action.type){
	
		case FETCH_DATA_SUCCESS:
			return {
		        ...state,
		        loading : false,
				categories : action.payload.categories,
				subcategories : action.payload.subcategories,
				sizes : action.payload.sizes,
				brands : action.payload.brands
			};

		case FETCH_DATA_FAILURE:
			return {
				...state,
				loading : false,
				categories : [],
				subcategories : [],
				sizes : [],
				brands : []
			};

		default:
			return state;
	}
}

export default data;