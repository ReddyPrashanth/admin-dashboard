import React from 'react';
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
        const {columns} = this.props;
        return <tr key={item.id}>
            {columns.map(col => {
                if(col.name !== 'address') return <td key={col.name} className="px-6 py-4">{item[col.name]}</td>
                return <td key={col.name} className="px-6 py-4">{item[col.name].address1}</td>
            })}
            <td className="px-6 py-2">
                <button key="view" className="text-purple-600 hover:text-purple-800 border bg-gray-200 rounded p-2 hover:bg-gray-300">
                    <RightArrowIcon />
                </button>
            </td>
        </tr>
    }
}

export default Table;