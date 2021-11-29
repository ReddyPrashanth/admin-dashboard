import { combineReducers } from "redux";
import usersReducer from './users';
import rolesReducer from './roles';
import permissionsReducer from './permissions';

export default combineReducers({
    users: usersReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
});