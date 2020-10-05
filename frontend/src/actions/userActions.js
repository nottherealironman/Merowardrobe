import { FETCH_USER_INFO_BEGINS, FETCH_USER_INFO_SUCCESS, FETCH_USER_INFO_FAILURE, LOGOUT_USER} from './constants/action-types';

export function fetchUserInfo(){
	return dispatch => {
		dispatch(fetchUserInfoBegins());
		return fetch('/users/api/current_user/', {
	            headers: {
	              Authorization: `JWT ${localStorage.getItem('token')}`
	            }
	          })

			.then(handleErrors)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchUserInfoSuccess(json));
				return json;
			})
			.catch(error => dispatch(fetchUserInfoFailure(error)));
	};
}

export function logout(){
	return dispatch => {
		dispatch(logoutUser());

	};
}

function handleErrors(response){
	if(!response.ok){
		throw Error(response.statusText);
	}
	return response;
}

export const fetchUserInfoBegins = () =>({
	type : FETCH_USER_INFO_BEGINS
});

export const fetchUserInfoSuccess = user =>({
	type : FETCH_USER_INFO_SUCCESS,
	payload : { user }
});

export const fetchUserInfoFailure = error =>({
	type : FETCH_USER_INFO_FAILURE,
	payload: { error }
});

export const logoutUser = error =>({
	type : LOGOUT_USER,
	payload: { error }
});