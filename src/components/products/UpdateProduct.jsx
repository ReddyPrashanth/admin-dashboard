import toast from 'react-hot-toast';
import Form from '../shared/Form';
import http from '../../http/api';
import Alert from '../shared/Alert';

class UpdateProduct extends Form {
    state = {
        data: {
            name: this.props.product.name, 
            description: this.props.product.description,
            price: this.props.product.price,
            stock: this.props.product.stock,
            subCategoryId: this.props.product.subCategoryId
        },
        error: null
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {...this.state.data, subCategoryId: Number.parseInt(this.state.data.subCategoryId)};
        try{
            const {product} = this.props;
            const {data} = await http.put(`/products/${product.id}`, formData, {withCredentials: true});
            this.props.updateProduct(data.product);
            toast.success(`Product ${data.product.name} is updated.`)
        }catch(err){
            this.setState({
                ...this.state,
                error: err.response.data.message
            })
        }
    }

    render() {
        const {subCategories} = this.props;
        const {error} = this.state;
        return (
            <div className='border p-2 rounded'>
                {error && <Alert message={error} color="red" actiontype={this.resetError} isDispatch={false}/>}
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('name', 'Product Name')}
                    {this.renderTextArea('description', 'Description', '3')}
                    {this.renderInput('price', 'Price', 'number')}
                    {this.renderInput('stock', 'Stock', 'number')}
                    {this.renderSelect('subCategoryId', 'Sub Category', subCategories)}
                    {this.renderButton('UPDATE PRODUCT')}
                </form>
            </div>
        )
    }
}

export default UpdateProduct;