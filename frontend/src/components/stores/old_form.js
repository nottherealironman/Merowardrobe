state = {
		data : [],
		loaded : false,
		placeholder : 'Loading...',
	};

	componentDidMount(){
		fetch('/store/api/')
		.then(response=>{
			if(response.status !== 200){
				return this.setState({placeholder : 'Something went wrong'});
			}
			return response.json();

		})
		.then(data=> this.setState({data : data, loaded : true}));

	}

	returnKeys(data){
		var returnFields = [];
		for(var key in data){
			if(data.hasOwnProperty(key)){
				var items = data[key];
				for(var i in items){
					if(items.hasOwnProperty(i)){
						returnFields.push(i);
					}
				}
			}
		}
		return returnFields;
	}

	renderForm = () => {
		const fields = {
			'name':'Store Name',
			'pan':'PAN of your store',
			'phone':'Contact number',
			'location':'Store location',
			'available_items':'What do you sell?', 
			'keywords':'Keywords for your store',
			'description':'Store Description',
			'pan_uploads':'Click to Upload PAN'};

		let formUI = Object.keys(fields).map((key,value)=>{
			if(key == 'description'){
		        return (
		        	<Textarea
			        	idName={'id_'+key}
			        	name={key}
			        	className='dis-block s-text7 mero__textbox bo4 p-l-22 p-r-22 p-t-13 m-t-20'
			        	required='true'
			        	placeholder={fields[key]} />);
		    }
		    else if(key == 'pan_uploads'){
		    	return (
		    		<div>
			    		<Label 
			    			idName="id_pan_uploads_label" 
			    			htmlFor="id_pan_uploads"
			    			className="btn btn-primary m-t-15"
			    			label={fields[key]} /> 
			    		<Input 
			        		idName={'id_'+key} 
			        		type='file'
			        		className='hide_input' />
			        </div>
		    	);
		    }
		        	
			return (
		        	<div className="bo4 av__input__box m-t-15" key={value}>	
		        		<Input 
		        		idName={'id_'+key} 
		        		name={key}
		        		className='sizefull s-text7 p-l-22 p-r-22'
		        		required='true'
		        		placeholder={fields[key]} />
		        	</div>);
		});

		return formUI;
	}