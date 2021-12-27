import React from 'react';
import Joi from 'joi';
import { Link } from 'react-router-dom';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';

class Form extends React.Component {

    state = {
        data: {},
        validationErrors: {}
    }

    validate = () => {
        const options = {abortEarly: false};
        const {error} = this.schema.validate(this.state.data, options);
        if(!error) return null;
        const errors = {};
        for(let item of error.details){
            errors[item.path[0]] = item.message;
        }
        return errors;
    }

    validateProperty = ({name, value}) => {
        const property = {[name]: value};
        const schema = Joi.object({[name]: this.schemaOptions[name]});
        const {error} = schema.validate(property);
        return error? error.details[0].message : null;
    }

    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.validationErrors};
        const errorMessage = this.validateProperty(input);
        if(errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        const data = {...this.state.data};
        data[input.name] = input.type === 'number' ? Number.parseInt(input.value) : input.value;
        this.setState({
            ...this.state,
            data,
            validationErrors: errors
        });
    }

    handleSubmit = e => {
        e.preventDefault();
        if(this.schema && this.schemaOptions){
            const errors = this.validate();
            this.setState({
                validationErrors: errors || []
            });
            if(errors) return;
        }
        this.doSubmit();
    }

    resetError = () => {
        this.setState({
            ...this.state,
            error: null
        });
    }

    renderButton(text) {
        const disabled = this.validate();
        const defClasses = 'bg-purple-500 text-white font-semibold text-xs mr-1 mt-1 md:text-sm md:px-2 px-1 py-1 rounded';
        const classes = disabled ? `${defClasses} cursor-not-allowed` : `${defClasses} hover:bg-purple-700 cursor-pointer`;
        return <button 
                disabled={disabled}
                className={classes}>
                {text}
                </button>
    }

    renderLink(linkText, to="/") {
        return <Link 
                to={to}
                className="text-purple-500 text-xs md:text-xs font-semibold underline hover:text-purple-700">
                {linkText}
        </Link>
    }

    renderInput(name, label, type="input", maxLength="50") {
        const { data, validationErrors } = this.state;
        return <Input 
                name={name}
                label={label}
                type={type}
                value={data[name]}
                onChange={this.handleChange}
                placeholder={label}
                maxLength={maxLength}
                error={validationErrors[name]}/>
    }

    renderSelect(name, label, options) {
        const { data, validationErrors } = this.state;
        return <Select
                name={name}
                label={label}
                value={data[name]}
                options={options}
                onChange={this.handleChange}
                error={validationErrors[name]}/>
    }

    renderTextArea(name, label, rows="3") {
        const { data, validationErrors } = this.state;
        return <TextArea 
                name={name}
                label={label}
                rows={rows}
                value={data[name]}
                onChange={this.handleChange}
                placeholder={label}
                error={validationErrors[name]}/>
    }
}

export default Form;
