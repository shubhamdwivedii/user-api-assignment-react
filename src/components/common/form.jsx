import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './input';

class Form extends Component {
    state = {
        data: {},
        errors: {}

    }


    validate = () => {

        const options = { abortEarly: false};
        const {error} = Joi.validate(this.state.data,  this.schema, options);
        
        if(!error) return null;
        const errors = {};

        for(let item of error.details)
            errors[item.path[0]] = item.message;

        return errors;    

    };

    validateProperty = ({ name, value }) => {
        const obj = { [name]: value}; //ES6 computed key-name
        const schema = {[name]: this.schema[name]}; //subschema based on name 
        const {error} = Joi.validate(obj, schema, { abortEarly: true});
        
        return error ? error.details[0].message : null;
        // if(error) return null;
        // return error.details[0].message;

    };

    handleSubmit = e => {
        e.preventDefault(); // prevents page reload on submit
        

        //validate input 
        const errors = this.validate();
        //console.log(errors);
        this.setState({ errors: errors || {} });
        if(errors) return; 


        //const email = this.email.current.value;
        
        this.doSubmit();

    };

    handleChange = ({ currentTarget: input }) => {
        
        const errors = {...this.state.errors};
        const errorMessage = this.validateProperty(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        
        const data = {...this.state.data};
        data[input.name] = input.value;

        this.setState({ data, errors }); 
    };

    renderButton(label) {
        return (
            <button
                disabled={this.validate()}
                className="btn btn-primary">
                {label}
            </button>
        );
    };

    renderInput(name, label, type='text',placeholder){
        const { data, errors } = this.state;
        return (
            <Input  
                type={type}
                name={name} 
                value={data[name]} 
                label={label}
                onChange={this.handleChange}
                error={errors[name]} 
                placeholder={placeholder}
            /> 
        );
    }

}
 
export default Form;