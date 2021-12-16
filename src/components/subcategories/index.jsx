import React from 'react';
import { connect } from 'react-redux';
import { getSubcategories, loadSubCategories } from '../../store/entities/subcategories';
import ListGroup from '../shared/ListGroup';
import CreateSubCategory from './CreateSubCategory';
import QueryString from 'query-string';

class Subcategories extends React.Component{

    headers = [
        {
            name: 'action',
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
    ]

    componentDidMount() {
        const {match} = this.props;
        this.props.fetchSubCategories(match.params.id);
    }

    render() {
        const {subCategories, match, location} = this.props;
        const queryParams = QueryString.parse(location.search);
        return (
            <div>
                <h4 className="font-medium text-lg pb-4 uppercase">List of sub categories for <span className="text-purple-600">{queryParams.name}</span> category</h4>
                <div className="flex">
                    <div className="w-2/3 mr-4">
                        <ListGroup data={subCategories} headers={this.headers} url="/subcategories/:id/products"/>
                    </div>
                    <div className="w-1/3">
                        <CreateSubCategory categoryId={match.params.id}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchSubCategories: (categoryId) => dispatch(loadSubCategories(categoryId)),
});

const mapStateToProps = (state) => ({
    subCategories: getSubcategories(state)
})


export default connect(mapStateToProps, mapDispatchToProps)(Subcategories);