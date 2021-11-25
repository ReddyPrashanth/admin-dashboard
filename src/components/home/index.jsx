import React from "react";
import { connect } from "react-redux";
import { getColumns, getLimit, getPage, getUserCount, getUsers, loadUsers } from "../../store/users";
import Pagination from "../shared/Pagination";
import Table from "../shared/Table";

class Home extends Table{

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
                <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                        <tr>
                        {columns.map(col => this.createHeader(col))}
                        <th
                            scope="col" 
                            className="
                                px-6 
                                py-3 
                                text-left 
                                text-xs
                                font-medium
                                text-gray-500
                                uppercase
                                tracking-wider"
                            >
                            Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map(d => this.createRow(d))}
                    </tbody>
                </table>
                <Pagination page={page} limit={limit} totalItems={totalUsers} onPaginate={this.handlePagination}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);