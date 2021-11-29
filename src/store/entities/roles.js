import { createSlice, createSelector } from "@reduxjs/toolkit";
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
    },
    reducers: {
        rolesRequested: (roles, action) => {
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
        roleCreated: (roles, action) => {
            roles.loading = false;
            roles.error = null;
            roles.formData.name = "";
            roles.formData.description = "";
        },
        roleCreationFailed: (roles, action) => {
            roles.error = action.payload;
            roles.loading = false;
        },
        resetRoleError: (roles, action) => {
            roles.error = null;
        }
    }
});
export const {
    rolesRequested,
    rolesReceived,
    rolesRequestFailed,
    roleCreationRequested,
    roleCreated,
    roleCreationFailed,
    resetRoleError,
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