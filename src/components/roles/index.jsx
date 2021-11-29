import React from 'react';
import { connect } from 'react-redux';
import { getColumns, getLimit, getPage, getRoleCount, loadRoles, getRoles, getError } from '../../store/entities/roles';
import Pagination from "../shared/Pagination";
import Table from "../shared/Table";
import CreateRole from './CreateRole';

class RolesTable extends React.Component {

    name="roles";

    handlePagination = (page) => {
        const {limit} = this.props;
        this.props.loadRoles(limit, page);
    }

    componentDidMount() {
        const {limit, page} = this.props;
        this.props.loadRoles(limit, page);
    }

    render() {
        const {columns, roles, limit, page, totalRoles, error} = this.props;
        return (
            <div className="flex">
                <div className="w-2/3 mr-4">
                    <Table columns={columns} items={roles} name={this.name}/>
                    <Pagination page={page} limit={limit} totalItems={totalRoles} onPaginate={this.handlePagination} name={this.name}/>
                </div>
                <div className="w-1/3">
                    <CreateRole error={error}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadRoles: (limit, page) => dispatch(loadRoles(limit, page)),
});

const mapStateToProps = (state) => ({
    roles: getRoles(state),
    columns: getColumns(state),
    limit: getLimit(state),
    page: getPage(state),
    totalRoles: getRoleCount(state),
    error: getError(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(RolesTable);