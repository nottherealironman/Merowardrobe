import { FETCH_STORE_BEGINS, FETCH_STORE_SUCCESS, FETCH_STORE_FAILURE} from './constants/action-types';

export function fetchStore(user_id){
	return dispatch => {
		dispatch(fetchStoreBegins());
		return fetch("/api/store/v1/user_store/"+user_id, {
	            headers: {
	              Authorization: `JWT ${localStorage.getItem('token')}`
	            }
	          })

			.then(handleErrors)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchStoreSuccess(json[0]));
				return json[0];
			})
			.catch(error => dispatch(fetchStoreFailure(error)));
	};
}

function handleErrors(response){
	if(!response.ok){
		throw Error(response.statusText);
	}
	return response;
}

export const fetchStoreBegins = () =>({
	type : FETCH_STORE_BEGINS
});

export const fetchStoreSuccess = stores =>({
	type : FETCH_STORE_SUCCESS,
	payload : { stores }
});

export const fetchStoreFailure = error =>({
	type : FETCH_STORE_FAILURE,
	payload: { error }
});