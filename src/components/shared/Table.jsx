import React from 'react';
import { Link } from 'react-router-dom';
import RightArrowIcon from '../../icons/RightArrow';

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
        const {columns, name, editRow} = this.props;
        return <tr key={item.id}>
            {columns.map(col => {
                if(col.name !== 'address') return <td key={col.name} className="px-6 py-4">{item[col.name]}</td>
                return <td key={col.name} className="px-6 py-4">{item[col.name].address1}</td>
            })}
            <td className="px-6 py-2">
                <Link to={`/${name}/${item.id}`}>
                    <button key="view" className="text-purple-600 hover:text-purple-800 border bg-gray-200 rounded p-2 hover:bg-gray-300">
                        <RightArrowIcon />
                    </button>
                </Link>
                {editRow &&<button onClick={() => editRow(item.id)} key="view" className="text-purple-600 hover:text-purple-800 border bg-gray-200 rounded p-2 ml-2 hover:bg-gray-300">
                        <RightArrowIcon />
                </button>}
            </td>
        </tr>
    }

    render() {
        const {columns, items} = this.props;
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
                    {items.map(d => this.createRow(d))}
                </tbody>
            </table>
        )
    }
}

export default Table;