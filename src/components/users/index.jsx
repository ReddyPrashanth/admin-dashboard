import React from "react";
import { connect } from "react-redux";
import { getColumns, getLimit, getPage, getUserCount, getUsers, loadUsers } from "../../store/entities/users";
import Pagination from "../shared/Pagination";
import Table from "../shared/Table";

class Users extends React.Component {

    name = "users";

    handlePagination = (page) => {
        const {limit} = this.props;
        this.props.loadUsers(limit, page);
    }

    componentDidMount() {
        const {limit, page} = this.props;
        this.props.loadUsers(limit, page);
    }

    render() {
        const {columns, users, limit, page, totalUsers} = this.props;
        return (
            <div>
                <Table columns={columns} items={users} name={this.name}/>
                <Pagination page={page} limit={limit} totalItems={totalUsers} onPaginate={this.handlePagination} name={this.name}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadUsers: (limit, page) => dispatch(loadUsers(limit, page)),
});

const mapStateToProps = (state) => ({
    users: getUsers(state),
    columns: getColumns(state),
    limit: getLimit(state),
    page: getPage(state),
    totalUsers: getUserCount(state),
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);