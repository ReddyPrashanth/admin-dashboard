import React from 'react';
import { connect } from 'react-redux';
import { getColumns, getLimit, getPage, getProductCount, getProducts, loadProducts } from '../../store/entities/products';
import Pagination from '../shared/Pagination';
import Table from '../shared/Table';
import { CreateSize } from './CreateSize';

class Products extends React.Component {
    name = 'products';

    async componentDidMount() {
        const {limit, page} = this.props;
        this.props.fetchProducts(limit, page);
    }

    handlePagination = (page) => {
        const {limit} = this.props;
        this.props.fetchProducts(limit, page);
    }

    render() {
        const {columns, products, limit, page, totalProducts} = this.props;
        return (
            <div className='flex items-start'>
                <div className='w-3/4 mr-2'>
                    <Table columns={columns} items={products} name={this.name} editRow={this.selectUpdateRow}/>
                    <Pagination page={page} limit={limit} totalItems={totalProducts} onPaginate={this.handlePagination} name={this.name}/>
                </div>
                <div className='w-1/4'>
                    <CreateSize />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchProducts: (limit,page) => dispatch(loadProducts(limit,page))
});

const mapStateToProps = (state) => ({
    products: getProducts(state),
    columns: getColumns(state),
    limit: getLimit(state),
    page: getPage(state),
    totalProducts: getProductCount(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);