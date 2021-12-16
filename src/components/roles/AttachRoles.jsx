import React from 'react';

const AttachRoles = ({permissions, role, fetchPermissions, onChecked, onAttachPermissions}) => {
    return (
        <React.Fragment>
            <div className="flex items-center justify-around text-sm bg-gray-50 p-2">
                <h4 className="text-gray-500 uppercase">ATTACH PERMISSIONS FOR {role}</h4>
                <button onClick={fetchPermissions} className="border rounded p-1 bg-purple-600 text-white uppercase">fetch permissions</button>
            </div>
            <ul className="space-y-2 divide-y h-auto overflow-y-scroll">
                {permissions.map(per => <li key={per.id} className="flex items-center p-1">
                    <input type="checkbox" className="m-2" name={per.name} value={per.id} onChange={onChecked}/>
                    <div>
                        <h4 className="font-semibold text-sm">{per.name}</h4>
                        <p className="text-sm">{per.description}</p>
                    </div>
                </li>)}
                {permissions.length === 0 && <li className="flex items-center p-3 text-sm text-purple-600">Permissions are not available to display. You can click on the fetch button to fetch them if available</li>}
            </ul>
            <div className="p-4 flex justify-around border-t">
                <button onClick={onAttachPermissions} className="border text-sm rounded p-1 bg-green-500 text-white hover:bg-green-600 uppercase">attach permissions</button>
            </div>
        </React.Fragment>
    )
}

export default AttachRoles;