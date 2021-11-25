import React from 'react';

class Table extends React.Component {
    createHeader(th) {
        return <th 
                    key={th.header}
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
                    {th.header}
                </th>
    }

    createRow(item) {
        const {columns} = this.state;
        return <tr key={item.id}>
            {columns.map(col => {
                if(col.name !== 'address') return <td key={col.name} className="px-6 py-4">{item[col.name]}</td>
                return <td key={col.name} className="px-6 py-4">{item[col.name].address1}</td>
            })}
            <td className="px-6 py-4">
                <button key="view" className="text-purple-600 hover:text-purple-800">view</button>
            </td>
        </tr>
    }
}

export default Table;