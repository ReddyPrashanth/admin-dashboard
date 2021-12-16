import { combineReducers } from "redux";
import usersReducer from './users';
import rolesReducer from './roles';
import permissionsReducer from './permissions';
import authReducer from './auth';
import categoriesReducer from './categories';
import subcategoriesReducer from './subcategories';

export default combineReducers({
    users: usersReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
    auth: authReducer,
    categories: categoriesReducer,
    subcategories: subcategoriesReducer
});