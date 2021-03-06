import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import TextArea from './TextArea';

class Form extends React.Component {
    handleChange = ({currentTarget: input}) => {
        const data = {...this.state.data};
        data[input.name] = input.value;
        this.setState({
            data
        })
    }

    renderButton(text) {
        return <button 
                className="bg-purple-500 hover:bg-purple-700 text-white font-semibold text-xs mr-1 md:text-sm md:px-2 px-1 py-1 rounded">
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
        const { data } = this.state;
        return <Input 
                name={name}
                label={label}
                type={type}
                value={data[name]}
                onChange={this.handleChange}
                placeholder={label}
                maxLength={maxLength}/>
    }

    renderTextArea(name, label, rows="3") {
        const { data } = this.state;
        return <TextArea 
                name={name}
                label={label}
                rows={rows}
                value={data[name]}
                onChange={this.handleChange}
                placeholder={label}/>
    }
}

export default Form;
