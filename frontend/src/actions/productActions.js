import { FETCH_ALL_PRODUCT_BEGINS, FETCH_ALL_PRODUCT_SUCCESS, FETCH_ALL_PRODUCT_FAILURE,  FETCH_PRODUCT_BEGINS, FETCH_PRODUCT_SUCCESS, FETCH_PRODUCT_FAILURE, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE} from './constants/action-types';

export function fetchAllProducts(id){
    var csrftoken = getCookie('csrftoken');
	return dispatch => {
		dispatch(fetchAllProudctBegins());
		return fetch("/api/product/v1/user_products/"+id, {
	            headers: new Headers({
	              Authorization: `JWT ${localStorage.getItem('token')}`,
	              'Content-Type': 'application/x-www-form-urlencoded',
	              'X-CSRFToken': csrftoken
	            }),
	          })
			.then(handleErrors)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchAllProductSuccess(json));
				return json;
			})
			.catch(error => dispatch(fetchAllProductFailure(error)));
	};
}

export function fetchProduct(id){
	return dispatch => {
		dispatch(fetchProudctBegins());
		return fetch("/api/product/v1/fetch_productinfo/"+id)
			.then(handleErrors)
			.then(res => res.json())
			.then(json => {
			    var tmp = json.product;
			    tmp = JSON.parse(tmp.substring(1, tmp.length-1));
			    tmp = Object.assign(tmp.fields, {'id':tmp.pk})
				dispatch(fetchProductSuccess(tmp));
				return json;
			})
			.catch(error => dispatch(fetchProductFailure(error)));
	};
}

export function fetchData(){
	return dispatch => {
		return fetch("/api/product/v1/fetch_data")
			.then(handleErrors)
			.then(res => res.json())
			.then(json => {
				dispatch(fetchDataSuccess(json));
				return json;
			})
			.catch(error => dispatch(fetchDataFailure(error)));
	};
}

function handleErrors(response){
	if(!response.ok){
		throw Error(response.statusText);
	}
	return response;
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].replace(/(\r\n|\n|\r)/gm," ");
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export const fetchAllProudctBegins = () =>({
	type : FETCH_ALL_PRODUCT_BEGINS
});

export const fetchAllProductSuccess = products =>({
	type : FETCH_ALL_PRODUCT_SUCCESS,
	payload : { products }
});

export const fetchAllProductFailure = error =>({
	type : FETCH_ALL_PRODUCT_FAILURE,
	payload: { error }
});

export const fetchProudctBegins = () =>({
	type : FETCH_PRODUCT_BEGINS
});

export const fetchProductSuccess = product =>({
	type : FETCH_PRODUCT_SUCCESS,
	payload : { product }
});

export const fetchProductFailure = error =>({
	type : FETCH_PRODUCT_FAILURE,
	payload: { error }
});

export const fetchDataSuccess = data =>({
	type : FETCH_DATA_SUCCESS,
	payload : { 
		categories: data.categories,
		subcategories : data.subcategories,
		sizes : data.sizes,
		brands : data.brands
	}
});

export const fetchDataFailure = error =>({
	type : FETCH_PRODUCT_FAILURE,
	payload: { error }
});