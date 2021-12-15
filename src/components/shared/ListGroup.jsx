import { Link } from "react-router-dom";
import RightArrowIcon from "../../icons/RightArrow";

const ListGroup = ({data, headers, url}) => {
    return (
        <ul className="border rounded divide-y">
            <li className="flex items-center p-4">
                {headers.map((h, index) => <div key={index} className={`${h.width} font-semibold capitalize`}>{h.name}</div>)}
            </li>
            {data.map(c => <li key={c.id} className="flex items-center px-4 py-2">
                <div className="w-3/12">{c.name}</div>
                <div className="w-8/12">{c.description}</div>
                <div className="w-1/12">
                    <Link to={`${url.replace(':id', c.id)}?name=${c.name}`}>
                        <button key="view" className="border bg-gray-200 rounded p-2 hover:bg-gray-300">
                            <RightArrowIcon />
                        </button>
                    </Link>
                </div>
            </li>)}
            {data.length === 0 && <div className="text-center p-2 text-sm text-purple-600">No items found</div>}
        </ul>
    )
}

export default ListGroup;