import React from 'react';
import FormTitle from '../shared/FormTitle';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';

class CreateSubCategories extends React.Component {
    nameLabel = 'Name';
    descriptionLabel = 'Description';
    state = {
        data: [
            {
                name: '',
                description: ''
            }
        ]
    }

    handleChange = (index, {currentTarget: input}) => {
        const data = [...this.state.data];
        data[index][input.name] = input.value;
        this.setState({
            data
        });
    }

    addSubCategoryInput = () => {
        const data = [...this.state.data];
        data.push({name:'', description: ''});
        this.setState({
            data
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            data: [
                {
                    name: '',
                    description: ''
                }
            ]
        })
    }

    render() {
        const {data} = this.state;
        return (
            <div className="mt-2 border rounded p-2">
                <div className="flex items-center justify-between mb-2">
                    <FormTitle>CREATE SUB CATEGORIES</FormTitle>
                    <button onClick={this.addSubCategoryInput} className="border rounded bg-purple-500 hover:bg-purple-700 text-white font-semibold text-xs md:text-sm md:px-2 px-1 py-1">ADD SUB CATEGORY</button>
                </div>
                <form onSubmit={this.handleSubmit}>
                {data.map((data, index) => <div key={index} className="border rounded py-1 px-2 mb-2">
                    <Input 
                        name='name'
                        label={this.nameLabel}
                        type='input'
                        value={data['name']}
                        onChange={(e) => this.handleChange(index, e)}
                        placeholder={this.nameLabel}
                        maxLength='50'/>
                    <TextArea 
                        name='description'
                        label={this.descriptionLabel}
                        rows='3'
                        value={data['description']}
                        onChange={(e) => this.handleChange(index, e)}
                        placeholder={this.descriptionLabel}/>
                </div>)}
                <div className="flex justify-between mt-2">
                    <button 
                        className="bg-purple-500 hover:bg-purple-700 text-white font-semibold text-xs mr-1 md:text-sm md:px-2 px-1 py-1 rounded">
                        CREATE
                    </button>
                </div>
                </form>
            </div>
        )
    }
}

export default CreateSubCategories