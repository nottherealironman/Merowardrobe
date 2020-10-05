import React, { Component } from 'react';
import Input from '../forms/Input';
import Textarea from '../forms/Textarea';
import Label from '../forms/Label';
import { withFormik, Form, Field } from 'formik';
import Yup from 'yup'; // Form Validation
import axios from 'axios';
import {fetchAllProducts, fetchData} from "../../actions/productActions";
import {connect} from "react-redux"; // HTTP request to server

function renderForm (touched, errors) {
	const fields = {
		'name':'Store Name',
		'pan':'PAN of your store',
		'phone':'Contact number',
		'location':'Store location',
		'available_items':'What do you sell?', 
		'keywords':'Keywords for your store'};

		let formUI = Object.keys(fields).map((key,value)=>{
			return (
				<div>
					<div className="bo4 av__input__box m-t-15" key={value}>
						<Field type="text" name={key} id={'id_'+key} className="sizefull s-text7 p-l-22 p-r-22" placeholder={fields[key]}/>
					</div>	
					{ touched[key] && errors[key] && <div class="input-feedback"> {errors[key]} </div> }
				</div>
			);
		});
		return formUI;
}

const StoreForm =({
	values,
	errors,
	touched,
	isSubmitting
	}) => {
			
			return(
				<div>
					<label>CREATE STORE</label>
					<div className='login-form'>
						<Form role="form" action="/store/create" method="post" enctype="multipart/form-data">
							{ renderForm(touched, errors) }
							<Field component="textarea" name="description" id="id_description" className="dis-block s-text7 mero__textbox bo4 p-l-22 p-r-22 p-t-13 m-t-20" placeholder="Store Description"></Field>
							{ touched.description && errors.description && <div class="input-feedback"> {errors.description } </div> }
							<div>
				    			<label id="id_pan_uploads_label" for="id_pan_uploads" className="btn btn-primary m-t-15"> Click to Upload PAN </label>
				    			<Field type="file" name="pan_uploads" id="id_pan_uploads" className="hide_input"/>
				        	</div>

							<button disabled={isSubmitting} class="flex-c-m av__btn__fullwidth bg1 hov1 m-text3 trans-0-4" id="js-add_store">
			                	Submit
			            	</button>
			            </Form>	
					</div>
				</div>
			);
}

const Create = withFormik({
	mapPropsToValues({ 
		name, 
		pan,
		phone,
		location,
		available_items,
		keywords,
		description,
		pan_uploads,
		}) {
		    return {
		      name: name || '',
		      pan: pan || '',
		      phone: phone || '',
		      location: '',
		      available_items: available_items || '',
		      keywords: keywords || '',
		      description: description || '',
		      pan_uploads: pan_uploads || ''
		    }
  	},

	validationSchema: Yup.object().shape({
	    name: Yup.string().required('Store name is required'),
	    pan: Yup.number().integer().typeError('Please, Enter a number').required('PAN is required').moreThan(0,'Please, Enter a valid PAN'),
	    phone: Yup.string().typeError('Phone number should be text').required('Phone number is required'),
	    location: Yup.string().typeError('Location should be text').required('Location is required'),
	    available_items: Yup.string().typeError('Available items should be text').required('Available items is required'),
	    keywords: Yup.string().typeError('Keywords should be text').required('Keywords is required'),
		description : Yup.string().required('Description is required')
	}),

  	handleSubmit(values, { props, resetForm, setErrors, setSubmitting}){
  		
  		var formData = new FormData();
  		for(var key in values){
  			if(values.hasOwnProperty(key)){
  				formData.append(key, values[key]);
  			}
  		}
  		var imagefile = document.querySelector('#id_pan_uploads');
  		formData.append("pan_uploads", imagefile.files[0]);
  		formData.append('user', props.user.userinfo.id);
		setSubmitting(false);
		axios.defaults.xsrfCookieName = 'csrftoken'
		axios.defaults.xsrfHeaderName = 'X-CSRFToken'
		axios({
			method : 'post',
			url : '/api/store/v1',
			data : formData,
			headers : {
				Authorization: `JWT ${localStorage.getItem('token')}`,
				'content-type': 'multipart/form-data'
			}
		})
		.then(res => {
			console.log(res);
		});
  	}

})(StoreForm);

const mapStateToProps = (state)=> {
  return {
    product : state.product,
    data : state.data,
    user : state.user
  };
}

export default connect(mapStateToProps)(Create);
// export default Create;