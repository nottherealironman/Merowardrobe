import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../forms/Input';
import Textarea from '../forms/Textarea';
import Label from '../forms/Label';
import { Formik, withFormik, Form, Field } from 'formik';
import Yup from 'yup'; // Form Validation
import axios from 'axios'; // HTTP request to server
import store from '../../store';
import Select from 'react-select';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Create extends Component {

	constructor(props){
		super(props);
		this.toggle = this.toggle.bind(this);
		this.handleFile = this.handleFile.bind(this);
	}

	componentWillMount(props){
		let brands = this.props.data.brands ? this.props.data.brands : {};
		this.state = {
				categories : this.props.data.categories,
				subcategories : this.props.data.subcategories,
				sizes : this.props.data.sizes,
				current_product_id : '',
				current_product_details_id: '',
				product_fields : {
						'title':{	type : 'text', placeholder : 'Product Title'},
						'gender':{	type : 'select',value : { M : 'For Him', F : 'For Her',U : 'Unisex'}},
						'category':{ type : 'select',value : this.props.data.categories},
						'subcategory':{ type : 'select',value : {}},
						'brand' : { type : 'select',value : brands}},
				product_details_fields : {
						'price':{	type : 'text', placeholder : 'Price'},
						'sizes':{	type : 'select', value : []},
						'color':{ type : 'text',placeholder : 'Color'},
						'description': { type : 'textarea', placeholder : 'Description', className:'dis-block s-text7 mero__textbox bo4 p-l-22 p-r-22 p-t-13 m-b-20 m-t-20'},
						'specifications': {	type : 'textarea', placeholder : 'Specification', className:'dis-block s-text7 mero__textbox bo4 p-l-22 p-r-22 p-t-13 m-b-20'}},
				tabs : { 'tab1' : 'active', 'tab2' : 'disabled', 'tab3' : 'disabled'},
				modal: false,
				current_image : '',
				current_file : '',
				images_list : {},
				image_counter : 1,
				cropped_image : '',
				image_wrapper : '',
		}
	}

	/*componentWillUpdate(newProps,newState){
		console.log('update')
		console.log(newProps)
	}*/

	toggle(){
		this.setState({
			modal : !this.state.modal
		});
	}

	handleCategoryChange = (e) =>{
		let subcategories = {};
		Object.keys(this.state.subcategories).map((key,value)=>{
			if(this.state.subcategories[key].category == e.target.value){
				subcategories[key] = this.state.subcategories[key].title;
			}
		});
		var p_fields = {...this.state.product_fields};
		p_fields.subcategory.value = subcategories;
		this.setState({p_fields});

		let sizes = [];
		Object.keys(this.state.sizes).map((key,value)=>{
			if(this.state.sizes[key].category == e.target.value){
				sizes.push({value : sizes[key], label: this.state.sizes[key].title});
			}
		});
		var pd_fields = {...this.state.product_details_fields};
		pd_fields.sizes.value = sizes;
		this.setState({pd_fields});
	}

	handleTabs = (tab, e) =>{
		var tabs = { ...this.state.tabs };
		switch(tab){
			case 'tab1': 
					tabs.tab1 = 'show active';
					tabs.tab2 = this.state.tabs.tab2 != 'disabled' ? '' : 'disabled' ;
					tabs.tab3 = this.state.tabs.tab3 != 'disabled' ? '' : 'disabled' ;
					break;
			case 'tab2': 
					tabs.tab2 = this.state.tabs.tab2 != 'disabled' ? '' : 'show active' ;
					tabs.tab1 = '';
					tabs.tab3 = this.state.tabs.tab3 != 'disabled' ? '' : 'disabled' ;
					break;
			case 'tab3': 
					tabs.tab3 = this.state.tabs.tab3 != 'disabled' ? '' : 'show active' ;
					tabs.tab1 = '';
					tabs.tab2 = '';
					break;
		}
		this.setState({tabs});
	}

	handleChange = (selectedOption) => {
	    //this.setState({ selectedOption });
	    console.log(`State :`, this.state.subcategories);
	}

	createOptions(options){
		let optionsList = Object.keys(options).map((key,value)=>{
			return (
				<option value={key}>{options[key]}</option>
			);
		});
		return optionsList;
	}

	handleFile(event){
        if (event.target.files && event.target.files[0]) {
        	this.toggle();
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({current_image: e.target.result});
            };
            this.setState({current_file : event.target.files[0]});
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    removeUpload(key){
    	let images_list = {...this.state.images_list};

		delete images_list[key];
		this.setState({
			images_list : images_list
			},
			this.createImageWrapper
		);
    }

    createImageWrapper(){
		let wrapper = Object.keys(this.state.images_list).map((key,value)=>{
					 return (<li className="list-group-item uploads_list">
								     <img src={this.state.images_list[key]} width='200px'/>
		                             <button class='btn btn-danger btn-md pull-right uploads_trash' onClick={() => this.removeUpload(key)}>
		                             	<i class='fa fa-trash' aria-hidden='true'></i>
		                             </button>
								  </li>);
				});

		this.setState({image_wrapper : wrapper});
    }

	crop(){
		let images = {};
		let images_list = {...this.state.images_list};

		images_list[this.state.image_counter] = this.refs.cropper.getCroppedCanvas().toDataURL();
		
		//the function createImageWrapper Waits for setState to complete before triggering
		this.setState({
			images_list: images_list,
			image_counter : this.state.image_counter + 1,
			cropped_image: this.refs.cropper.getCroppedCanvas().toDataURL()
			},
			this.createImageWrapper
		);
		
		let cropData = this.refs.cropper.getData();
		var data = new FormData();
        data.append('file',this.state.current_file);
        data.append('x',cropData.x);
        data.append('y',cropData.y);
        data.append('height',cropData.height);
        data.append('width',cropData.width);
        data.append('product',1);

        axios.defaults.xsrfCookieName = 'csrftoken';
		axios.defaults.xsrfHeaderName = 'X-CSRFToken';
		axios({
				method : 'POST',
				url : '/product/api/v1/product_uploads',
				data : data,
				processData : false,
                contentType : false,
			})
			.then(res => {
				console.log(res)
			});

		this.toggle();
		
	}

	onTodoChange(value){
        var p_fields = {...this.state.product_fields};
		p_fields.title.value = value;
		this.setState({p_fields});
    }

	renderForm (touched, errors, type) {

			const fields = type == 'product' ? this.state.product_fields : this.state.product_details_fields;

			let formUI = Object.keys(fields).map((key,value)=>{
				if(fields[key].type == 'select' && key == 'category'){
					return (
						<div>
							<div className='bo4 av__input__box m-t-15' key={value}>
								<Field component={fields[key].type} name={key} id={'id_'+key} className="sizefull s-text7 p-l-22 p-r-22" onChange={ (e) => this.handleCategoryChange(e) }>
									<option value="">Select {key == 'subcategory' ? 'Category first' : key }</option>
									{ this.createOptions(fields[key].value) }
						        </Field>
							</div>	
							{ touched[key] && errors[key] && <div class="input-feedback"> {errors[key]} </div> }
						</div>
					);
				}
				else if(fields[key].type == 'select' && key == 'sizes'){
					return (
						<div>
							<div className='bo4 av__input__box m-t-15' key={value}>
								<Select 
								isMulti
							    name={fields[key]}
							    className="basic-multi-select"
							    classNamePrefix="select"
								options={fields[key].value}
								onChange={this.handleChange}
							      />
							</div>	
							{ touched[key] && errors[key] && <div class="input-feedback"> {errors[key]} </div> }
						</div>
					);
				}
				else if(fields[key].type == 'select'){
					return (
						<div>
							<div className={ key == 'brand' ? 'bo4 av__input__box m-t-15 m-b-15' : 'bo4 av__input__box m-t-15' } key={value}>
								<Field component={fields[key].type} name={key} id={'id_'+key} className="sizefull s-text7 p-l-22 p-r-22">
									<option value="">Select {key == 'subcategory' ? 'Category first' : key }</option>
									{ this.createOptions(fields[key].value) }
						        </Field>
							</div>	
							{ touched[key] && errors[key] && <div class="input-feedback"> {errors[key]} </div> }
						</div>
					);
				}
				else if(fields[key].type == 'text'){
					return (
						<div>
							<div className="bo4 av__input__box m-t-15" key={value}>
								<Field 
								type={fields[key].type} 
								name={key}
								id={'id_'+key}
								className="sizefull s-text7 p-l-22 p-r-22" 
								placeholder={fields[key].placeholder}/>
							</div>	
							{ touched[key] && errors[key] && <div class="input-feedback"> {errors[key]} </div> }
						</div>
					);
				}
				else if(fields[key].type == 'textarea'){
					return (
						<div>
							<textarea rows="5" name={key} id={'id_'+key} className={fields[key].className} placeholder={fields[key].placeholder}></textarea>
							{ touched[key] && errors[key] && <div class="input-feedback"> {errors[key]} </div> }
						</div>
					);
				}
				
			});
			return formUI;
	}

	render(){
		return(
			<div className="col-md-5 p-b-30">
				<label>ADD PRODUCT</label>
						  <ul className="nav nav-tabs" id="myTab" role="tablist">
						    <li className="nav-item">
						      <a className={"nav-link " + this.state.tabs.tab1} onClick={(e) => this.handleTabs('tab1', e)} id="product_info-tab" data-toggle="tab" href="#product_info" role="tab" aria-controls="product_info" aria-selected="true">
						        Product Info
						      </a>
						    </li>
						    <li className="nav-item">
						      <a className={"nav-link "+this.state.tabs.tab2 } onClick={(e) => this.handleTabs('tab2', e)} id="product_details-tab" data-toggle="tab" href="#product_details" role="tab" aria-controls="product_details" aria-selected="false">
						        Product Details
						      </a>
						    </li>
						    <li className="nav-item"> 
						      <a className={"nav-link "+ this.state.tabs.tab3 } onClick={(e) => this.handleTabs('tab3', e)} id="images_upload-tab" data-toggle="tab" href="#images_upload" role="tab" aria-controls="images_upload" aria-selected="false">
						        Images Upload
						      </a>
						    </li>
						  </ul>
						  <div className="tab-content" id="myTabContent">
						    <div className={"tab-pane fade show "+this.state.tabs.tab1} id="product_info" role="tabpanel" aria-labelledby="product_info-tab">
						      <div className="product_add__form">
						        <Formik
						        	enableReinitialize
									initialValues={{
								        title: '',
								        gender: '',
								        subcategory: '',
								        brand: ''
								      }}

									validationSchema= {Yup.object().shape({
									    title: Yup.string().required('Title is required'),
									    gender: Yup.string().required('Gender is required'),
									    subcategory: Yup.number().required('Subcategory is required'),
									    brand : Yup.number().required('Brand is required')
									})}

								  	onSubmit={(values, { resetForm, setErrors, setSubmitting})=>{
								  		console.log(values);
								  		var formData = new FormData();
								  		var method = 'post';
								  		var url = '/product/api/v1/';

								  		if(this.state.current_product_id){
								  			method = 'put';
								  			url = '/product/api/v1/'+this.state.current_product_id+'/';
								  		}
								  		formData.append('title', values.title);
								  		formData.append('gender', values.gender);
								  		formData.append('category', 1);
								  		formData.append('subcategory', values.subcategory);
								  		formData.append('brand', values.brand);
								  		formData.append('user', 1);
										setSubmitting(false);
										axios.defaults.xsrfCookieName = 'csrftoken';
										axios.defaults.xsrfHeaderName = 'X-CSRFToken';
										axios({
											method : method,
											url : url,
											data : formData,
										})
										.then(res => {
											console.log(res.data);
											var tabs = { ...this.state.tabs }
											tabs.tab1 = '';
											tabs.tab2 = 'show active';
											this.setState({tabs});
											this.setState({current_product_id : res.data.id});
											console.log(this.state)
										});
								  	}}

								  	render={({
										values,
										errors,
										touched,
										handleSubmit,
										isSubmitting
										})=>(
										<div>
											  <Form onSubmit={handleSubmit} className="leave-comment" method="post">
											          { this.renderForm(touched, errors, 'product') }

											          <button disabled={isSubmitting} className="flex-c-m av__btn__fullwidth bg1 hov1 m-text3 trans-0-4">
											            Next
											          </button>
											   </Form> 
										</div>
									)}
									/>
						      </div>
						    </div>
						    <input type="hidden" name="product" id="js-product_id" defaultValue="{% firstof product_data.id '' %}" />
						    <div className={"tab-pane fade "+this.state.tabs.tab2} id="product_details" role="tabpanel" aria-labelledby="product_details-tab">
						      <div className="product_add__form">
						        
						      	<Formik
									initialValues={{
								        price: '',
								        color: '',
								      }}

									validationSchema= {Yup.object().shape({
									    price: Yup.string().required('Price is required'),
									    color: Yup.string().required('Color is required'),
									    
									})}

								  	onSubmit={(values, { resetForm, setErrors, setSubmitting})=>{
								  		console.log(values);
								  		var formData = new FormData();
								  		var method = 'post';
								  		var url = '/product/productdetails/api/v1/';

								  		/*if(this.state.current_product_id){
								  			method = 'put';
								  			url = '/product/productdetails/api/v1/'+this.state.current_product_id+'/';
								  		}*/
								  		formData.append('price', values.price);
								  		formData.append('size', values.sizes);
								  		formData.append('color', values.color);
								  		formData.append('description', values.description);
								  		formData.append('specifications', values.specifications);
								  		formData.append('status', 1);
								  		formData.append('product', this.state.current_product_id);
										setSubmitting(false);
										axios.defaults.xsrfCookieName = 'csrftoken';
										axios.defaults.xsrfHeaderName = 'X-CSRFToken';
										axios({
											method : method,
											url : url,
											data : formData,
										})
										.then(res => {
											console.log(res.data);
											var tabs = { ...this.state.tabs }
											tabs.tab1 = '';
											tabs.tab2 = '';
											tabs.tab3 = 'show active';
											this.setState({tabs});
											this.setState({current_product_details_id : res.data.product});
										});
								  	}}

								  	render={({
										values,
										errors,
										touched,
										handleSubmit,
										isSubmitting
										})=>(
										<div>
											<Form className="leave-comment" id="js-add_product_details_form" method="post">
										       { this.renderForm(touched, errors, 'product_details') }
										       <button disabled={isSubmitting} className="flex-c-m av__btn__fullwidth bg1 hov1 m-text3 trans-0-4">
										         Next
										       </button>
										    </Form>
										</div>
									)}
									/>
						        
						      </div>
						    </div>
						    <div className={"tab-pane fade "+this.state.tabs.tab3} id="images_upload" role="tabpanel" aria-labelledby="images_upload-tab">
						      <div className="product_add__form">
						        
						        <ul className="list-group mb-10" >
						          {this.state.image_wrapper}
						        </ul>

								<label class="btn btn-primary" id="id_file_label" for="id_file">Upload Image</label>
						        <input type="file" name="upload" id="id_file" ref="upload_file" style={{display : 'none'}} onChange={this.handleFile}/>
						        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
						          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
						          <ModalBody>
						            <Cropper
							        ref='cropper'
							        src={this.state.current_image}
							        style={{height: 400, width: '100%'}}
							        aspectRatio={16 / 9}
							        guides={false} />
							        
						          </ModalBody>
						          <ModalFooter>
						            <Button color="success" onClick={this.crop.bind(this)}>Crop</Button>
						            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
						          </ModalFooter>
						        </Modal>
						        <Button className="flex-c-m av__btn__fullwidth bg1 hov1 m-text3 trans-0-4" onClick={()=>this.uploadImages()}>Submit</Button>
						      </div>
						    </div>
						  </div>
			</div>
		);
	}
	
}

const mapStateToProps = (state)=> {
  return { data : state.data };
}

export default connect(mapStateToProps)(Create);