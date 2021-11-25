import React from "react";
import { connect } from "react-redux";
import { getColumns, getUsers, loadUsers } from "../../store/users";
import Table from "../shared/Table";

class Home extends Table{
    state = {
        columns: [
            {
                header: 'Email',
                name: 'email'
            },
            {
                header: 'First Name',
                name: 'firstName'
            },
            {
                header: 'Last Name',
                name: 'lastName'
            },
            {
                header: 'Gender',
                name: 'gender'
            },
            {
                header: 'Address',
                name: 'address'
            }
        ],
        data: [
            {
                id: 1,
                email: 's.prasantreddy@gmail.com',
                firstName: 'prashanth',
                lastName: 'sreepathi',
                gender: 'male',
                address: {
                    address1: '5401 W 57th street'
                }
            },
            {
                id: 2,
                email: 's.prasantreddy@gmail.com',
                firstName: 'prashanth',
                lastName: 'sreepathi',
                gender: 'male',
                address: {
                    address1: '5401 W 57th street'
                }
            }
        ]
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    render() {
        const {columns, users} = this.props;
        return (
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
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    loadUsers: () => dispatch(loadUsers()),
});

const mapStateToProps = (state) => ({
    users: getUsers(state),
    columns: getColumns(state)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);