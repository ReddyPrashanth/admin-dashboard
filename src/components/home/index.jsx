import React from "react";
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
                address: '5401 W 57th street'
            },
            {
                id: 2,
                email: 's.prasantreddy@gmail.com',
                firstName: 'prashanth',
                lastName: 'sreepathi',
                gender: 'male',
                address: '5401 W 57th street'
            }
        ]
    }

    render() {
        const {columns, data} = this.state;
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
                    {data.map(d => this.createRow(d))}
                </tbody>
            </table>
        )
    }
}

export default Home;