import { createSlice, createSelector } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import { apiCallBegan } from '../api';

const slice = createSlice({
    name: 'roles',
    initialState: {
        columns: [
            {
                header: 'Role',
                name: 'name'
            },
            {
                header: 'Description',
                name: 'description'
            }
        ],
        formData: {
            name: "",
            description: ""
        },
        data: [],
        loading: false,
        limit: 10,
        page: 1,
        totalRoles: 0,
        error: null,
        role: null,
        attachablePermissions: [],
    },
    reducers: {
        rolesRequested: (roles, action) => {
            roles.attachablePermissions = [];
            roles.loading = true;
        },
        rolesReceived: (roles, action) => {
            roles.data = action.payload.data;
            roles.limit = action.payload.meta.limit;
            roles.page = action.payload.meta.page;
            roles.totalRoles = action.payload.meta.totalItems;
            roles.loading = false;
        },
        rolesRequestFailed: (roles, action) => {
            roles.loading = false;
        },
        roleCreationRequested: (roles, action) => {
            roles.loading = true;
        },
        roleSelected: (roles, action) => {
            roles.role = action.payload;
        },
        roleSelectionFailed: (roles, action) => {
            roles.role = null;
        },
        roleCreated: (roles, action) => {
            roles.loading = false;
            roles.error = null;
            roles.formData.name = "";
            roles.formData.description = "";
            toast.success(`Role ${action.payload.name} is created.`)
        },
        roleCreationFailed: (roles, action) => {
            roles.error = action.payload;
            roles.loading = false;
        },
        resetRoleError: (roles, action) => {
            roles.error = null;
        },
        attachablePermissionsRequested: (roles, action) => {
            roles.attachablePermissions = action.payload;
            roles.loading = false; 
        },
        permissionsAttached: (roles, action) => {
            const permIds = action.payload.map(ob => ob.permissionsId);
            const newPermissions = roles.attachablePermissions.filter(p => permIds.includes(p.id));
            if(roles.role && newPermissions.length > 0) {
                roles.role.permissions = [...roles.role.permissions, ...newPermissions];
            }
            roles.loading = false;
            roles.attachablePermissions = [];
        }
    }
});
export const {
    rolesRequested,
    rolesReceived,
    rolesRequestFailed,
    roleCreationRequested,
    roleSelected,
    roleCreated,
    roleCreationFailed,
    resetRoleError,
    attachablePermissionsRequested,
    permissionsAttached,
} = slice.actions;
export default slice.reducer;

const url = '/roles';

// Action creators

export const loadRoles = (limit,page) => apiCallBegan({
    url: `${url}?limit=${limit}&page=${page}`,
    method: 'get',
    onStart: rolesRequested.type,
    onSuccess: rolesReceived.type,
    onError: rolesRequestFailed.type
});

export const createRole = (formData) => apiCallBegan({
    url,
    method: 'post',
    data: formData,
    onStart: roleCreationRequested.type,
    onSuccess: roleCreated.type,
    onError: roleCreationFailed.type
});

export const fetchRole = (roleId) => apiCallBegan({
    url: `${url}/${roleId}`,
    method: 'get',
    onStart: rolesRequested.type,
    onSuccess: roleSelected.type,
    onError: roleCreationFailed.type
});

export const fetchAttachablePermissions = (roleId) => apiCallBegan({
    url: `/permissions/role/${roleId}`,
    method: 'get',
    onStart: rolesRequested.type,
    onSuccess: attachablePermissionsRequested.type,
    onError: roleCreationFailed.type
});

export const attachPermissionsForARole = (roleId, permissions) => apiCallBegan({
    url: `${url}/${roleId}/permissions`,
    method: 'post',
    data: {permissions},
    onStart: roleCreationRequested.type,
    onSuccess: permissionsAttached.type,
    onError: roleCreationFailed.type
});

// Selectors

export const getRoles = createSelector(
    state => state.entities.roles,
    roles => roles.data
);

export const getColumns = createSelector(
    state => state.entities.roles,
    roles => roles.columns
);

export const getLimit = createSelector(
    state => state.entities.roles,
    roles => roles.limit
);

export const getPage = createSelector(
    state => state.entities.roles,
    roles => roles.page
);

export const getRoleCount = createSelector(
    state => state.entities.roles,
    roles => roles.totalRoles
);

export const getFormData = createSelector(
    state => state.entities.roles,
    roles => roles.formData
);

export const getError = createSelector(
    state => state.entities.roles,
    roles => roles.error
);

export const getRole = createSelector(
    state => state.entities.roles,
    roles => roles.role
);

export const getAttachablePermissions = createSelector(
    state => state.entities.roles,
    roles => roles.attachablePermissions
)