import React from 'react';
import { connect } from 'react-redux';
import { getColumns, getLimit, getPage, getPermissionCount, loadPermissions, getPermissions, getError } from '../../store/entities/permissions';
import Pagination from "../shared/Pagination";
import Table from "../shared/Table";
import CreatePermission  from './CreatePermission';

class PermissionsTable extends React.Component {

    name="permissions";

    handlePagination = (page) => {
        const {limit} = this.props;
        this.props.loadPermissions(limit, page);
    }

    componentDidMount() {
        const {limit, page} = this.props;
        this.props.loadPermissions(limit, page);
    }

    render() {
        const {columns, permissions, limit, page, totalPermissions, error} = this.props;
        return (
            <div className="flex">
                <div className="w-2/3 mr-4">
                    <Table columns={columns} items={permissions} name={this.name}/>
                    <Pagination page={page} limit={limit} totalItems={totalPermissions} onPaginate={this.handlePagination} name={this.name}/>
                </div>
                <div className="w-1/3">
                    <CreatePermission error={error}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadPermissions: (limit, page) => dispatch(loadPermissions(limit, page)),
});

const mapStateToProps = (state) => ({
    permissions: getPermissions(state),
    columns: getColumns(state),
    limit: getLimit(state),
    page: getPage(state),
    totalPermissions: getPermissionCount(state),
    error: getError(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(PermissionsTable);