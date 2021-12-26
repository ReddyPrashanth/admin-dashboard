import React from 'react';
import http from '../../http/api';
import ProductDetail from './ProductDetail';
import UpdateProduct from './UpdateProduct';

class Product extends React.Component{

    state =  {
        product: null,
        subCategories: [],
        error: null
    }

    updateProduct = (data) => {
        if(this.state.product) {
            const product = {...this.state.product, ...data};
            this.setState({
                ...this.state,
                product
            })
        }
    }

    async componentDidMount() {
        const {match} = this.props;
        try{
            const {data} = await http.get(`/products/${match.params.id}`, {withCredentials: true});
            const categories = await http.get(`/subcategories`, {withCredentials: true});
            this.setState({
                ...this.state,
                product: data,
                subCategories: categories.data.data
            })
        }catch(err) {
            this.setState({
                ...this.state,
                error: err.response.data.message
            })
        }
    }

    render() {
        const {product, subCategories} = this.state;
        return (
            <div className='flex items-start'>
                {product && <ProductDetail product={product}/>}
                {product && 
                <div className='w-1/3'>
                    <UpdateProduct product={product} subCategories={subCategories} updateProduct={this.updateProduct}/>
                </div>}
            </div>
        )
    }
}

export default Product;