import { FETCH_ALL_PRODUCT_BEGINS, FETCH_ALL_PRODUCT_SUCCESS, FETCH_ALL_PRODUCT_FAILURE, FETCH_PRODUCT_BEGINS, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILURE} from '../actions/constants/action-types';
 
const initialState = {
  all_products : [],
  loading: false,
  error: null
};

const product = (state = initialState, action) => {
	switch(action.type){
		case FETCH_ALL_PRODUCT_BEGINS:
			return {
		        ...state,
		        loading: true,
		        error: null
		    };

		case FETCH_ALL_PRODUCT_SUCCESS:
			return {
		        ...state,
		        loading : false,
				all_products : action.payload.products
			};

		case FETCH_ALL_PRODUCT_FAILURE:
			return {
				...state,
				loading : false,
				all_products : []
			};

		case FETCH_PRODUCT_BEGINS:
			return {
		        ...state,
		        loading: true,
		        error: null
		    };

		case FETCH_PRODUCT_SUCCESS:
			return {
		        ...state,
		        loading : false,
				product : action.payload.product
			};

		case FETCH_PRODUCT_FAILURE:
			return {
				...state,
				loading : false,
				product : []
			};

		default:
			return state;
	}
}

export default product;