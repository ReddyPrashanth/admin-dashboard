import RefreshIcon from "../../icons/Refresh";

const ListServices = ({services, healthCheck}) => {
    return (
        <ul className="border rounded divide-y w-2/3 mr-2">
            <li className="flex items-center py-4">
                <h4 className="w-1/5 mx-2 font-semibold text-sm">SERVICE</h4>
                <h4 className="w-3/5 mr-2 font-semibold text-sm">DESCRIPION <button title="Refresh health check" onClick={healthCheck} className="border p-1 m-1 text-purple-500 rounded hover:bg-gray-100"><RefreshIcon /></button></h4>
                <h4 className="w-1/5 mr-2 font-semibold text-sm">STATUS</h4>
            </li>
            {
                services.map(service => <li className="flex items-center py-2" key={service.id}>
                <div className="w-1/5 mx-2">{service.name}</div>
                <div className="w-3/5 mr-4">{service.description}</div>
                <div className={service.status === 'up' ? 'w-1/5 mr-2 text-green-500 uppercase text-sm' : 'w-1/5 mr-2 text-red-500 uppercase text-sm'}>{service.status}</div>
            </li>)
            }
        </ul>
    )
}

export default ListServices;