import { useSelector } from "react-redux";
import { getPermission } from "../../store/entities/permissions";

const Permission = ({match}) => {
    const id = match.params.id;
    const permission = useSelector(state => getPermission(state, Number.parseInt(id)));
    console.log(permission);
    if(permission) {
        return <div>
            <h4 className="font-semibold text-purple-600">Permission <span className="uppercase">{permission.name}</span></h4>
            <p className="text-sm">{permission.description}</p>
        </div>
    }
    return <div>
        <p className="text-red-600">Permission with id {id} not found.</p>
    </div>
}

export default Permission;