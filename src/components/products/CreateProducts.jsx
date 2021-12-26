import React from 'react';
import toast from 'react-hot-toast';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import http from '../../http/api';
import Alert from '../shared/Alert';

class CreateProducts extends React.Component {
    nameLabel = 'Product Name';

    descriptionLabel = 'Description';

    priceLabel = 'Price';

    stockLabel = 'Stock';

    state = {
        error: null,
        products: [
            {
                name: '',
                description: '',
                price: '0',
                stock: '1'
            }
        ]
    }

    handleChange = (index, {currentTarget: input}) => {
        const products = [...this.state.products];
        products[index][input.name] = input.value;
        this.setState({
            ...this.state,
            products
        });
    }

    addProductInput = () => {
        const products = [...this.state.products];
        products.push({
            name:'', 
            description: '', 
            price: '0', 
            stock: '1'
        });
        this.setState({
            ...this.state,
            products
        });
    }

    removeProductInput = (index) => {
        const products = [...this.state.products];
        products.splice(index, 1);
        this.setState({
            ...this.state,
            products
        })
    }

    resetError = () => {
        this.setState({
            ...this.state,
            error: null
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const subCategoryId = Number.parseInt(this.props.match.params.id)
        const products = this.state.products.map(({name, description, price, stock}) => {
            return {
                name,
                description,
                price: Number.parseInt(price),
                stock: Number.parseInt(stock),
                subCategoryId
            }
        });
        try{
            const {data} = await http.post('/products', {products}, {withCredentials: true});
            this.setState({
                ...this.state,
                products: [
                    {
                        name: '',
                        description: '',
                        price: '0',
                        stock: '1'
                    }
                ]
            });
            toast.success(`Products ${data.map(p => p.name).join(',')} are created.`);
        }catch(error) {
            this.setState({
                ...this.state,
                error: error.response.data.message
            })
        }

    }

    render() {
        const { products, error } = this.state;
        const disabled = products.length < 2;
        return (
            <div>
                {error && <Alert message={error} color="red" actiontype={this.resetError} isDispatch={false}/>}
                <button onClick={this.addProductInput} className="border p-1 mb-2 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm">
                    ADD PRODUCT
                </button>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <div className="grid grid-cols-4 gap-4">
                        {products.map((p, index)=> <div className="border rounded px-2 pb-2" key={index}>
                            <div className="flex justify-end">
                                <button disabled={disabled} type="button" className={disabled ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer'} onClick={() => this.removeProductInput(index)}>x</button>
                            </div>
                            <Input 
                                name='name'
                                label={this.nameLabel}
                                type='input'
                                value={p['name']}
                                onChange={(e) => this.handleChange(index, e)}
                                placeholder={this.nameLabel}
                                maxLength='50'/>
                            <TextArea 
                                name='description'
                                label={this.descriptionLabel}
                                rows='3'
                                value={p['description']}
                                onChange={(e) => this.handleChange(index, e)}
                                placeholder={this.descriptionLabel}/>
                            <Input 
                                name='price'
                                label={this.priceLabel}
                                type='number'
                                value={p['price']}
                                onChange={(e) => this.handleChange(index, e)}
                                placeholder={this.priceLabel}
                                maxLength='6'/>
                            <Input 
                                name='stock'
                                label={this.stockLabel}
                                type='number'
                                value={p['stock']}
                                onChange={(e) => this.handleChange(index, e)}
                                placeholder={this.stockLabel}
                                maxLength='3'/>
                        </div>)}
                        </div>
                        <button className="border p-1 mt-2 bg-purple-500 hover:bg-purple-600 text-white rounded text-sm">
                            CREATE PRODUCTS
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default CreateProducts;