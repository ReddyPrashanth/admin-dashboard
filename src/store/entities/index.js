import { combineReducers } from "redux";
import usersReducer from './users';
import rolesReducer from './roles';
import permissionsReducer from './permissions';
import authReducer from './auth';

export default combineReducers({
    users: usersReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
    auth: authReducer,
});