import React from 'react';
import { connect } from 'react-redux';
import { getCategories, loadCategories } from '../../store/entities/categories';
import ListGroup from '../shared/ListGroup';
import CreateCategory from './CreateCategory';
import CreateSubCategories from './CreateSubCategories';

class Categories extends React.Component {
    headers = [
        {
            name: 'name',
            width: 'w-3/12'
        },
        {
            name: 'description',
            width: 'w-8/12'
        },
        {
            name: 'action',
            width: 'w-1/12'
        }
    ];

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const {categories} = this.props;
        return (
            <div className="flex">
                <div className="w-2/3 mr-4">
                    <ListGroup data={categories} headers={this.headers} url="/categories/:id/subcategories"/>
                </div>
                <div className="w-1/3">
                    <CreateCategory />
                    <CreateSubCategories />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchCategories: () => dispatch(loadCategories())
});

const mapStateToProps = (state) => ({
    categories: getCategories(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Categories);