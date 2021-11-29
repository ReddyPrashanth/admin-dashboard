import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from '../api';

const slice = createSlice({
    name: 'permissions',
    initialState: {
        columns: [
            {
                header: 'Permission',
                name: 'name'
            },
            {
                header: 'Description',
                name: 'description'
            }
        ],
        data: [],
        loading: false,
        limit: 10,
        page: 1,
        totalPermissions: 0,
        error: null,
    },
    reducers: {
        permissionsRequested: (permissions, action) => {
            permissions.loading = true;
        },
        permissionsReceived: (permissions, action) => {
            permissions.data = action.payload.data;
            permissions.limit = action.payload.meta.limit;
            permissions.page = action.payload.meta.page;
            permissions.totalRoles = action.payload.meta.totalItems;
            permissions.loading = false;
        },
        permissionsRequestFailed: (permissions, action) => {
            permissions.loading = false;
        },
        permissionCreationRequested: (permissions, action) => {
            permissions.loading = true;
        },
        permissionCreated: (permissions, action) => {
            permissions.loading = false;
            permissions.error = null;
        },
        permissionCreationFailed: (permissions, action) => {
            permissions.error = action.payload;
            permissions.loading = false;
        },
        resetPermissionError: (permissions, action) => {
            permissions.error = null;
        }
    }
});
export const {
    permissionsRequested,
    permissionsReceived,
    permissionsRequestFailed,
    permissionCreationRequested,
    permissionCreated,
    permissionCreationFailed,
    resetPermissionError,
} = slice.actions;
export default slice.reducer;

const url = '/permissions';

// Action Creators
export const loadPermissions = (limit,page) => apiCallBegan({
    url: `${url}?limit=${limit}&page=${page}`,
    method: 'get',
    onStart: permissionsRequested.type,
    onSuccess: permissionsReceived.type,
    onError: permissionsRequestFailed.type
});

export const createPermission= (formData) => apiCallBegan({
    url,
    method: 'post',
    data: formData,
    onStart: permissionCreationRequested.type,
    onSuccess: permissionCreated.type,
    onError: permissionCreationFailed.type
});

// Selectors
export const getPermissions = createSelector(
    state => state.entities.permissions,
    permissions => permissions.data
);

export const getColumns = createSelector(
    state => state.entities.permissions,
    permissions => permissions.columns
);

export const getLimit = createSelector(
    state => state.entities.permissions,
    permissions => permissions.limit
);

export const getPage = createSelector(
    state => state.entities.permissions,
    permissions => permissions.page
);

export const getPermissionCount = createSelector(
    state => state.entities.permissions,
    permissions => permissions.totalPermissions
);

export const getError = createSelector(
    state => state.entities.permissions,
    permissions => permissions.error
);