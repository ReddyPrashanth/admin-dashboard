import {createSlice, createSelector} from '@reduxjs/toolkit';
import { apiCallBegan } from './api';

const slice = createSlice({
    name: 'users',
    initialState: {
        columns: [
            {
                header: 'Email',
                name: 'email'
            },
            {
                header: 'First Name',
                name: 'firstName'
            },
            {
                header: 'Last Name',
                name: 'lastName'
            },
            {
                header: 'Gender',
                name: 'gender'
            },
            {
                header: 'Address',
                name: 'address'
            }
        ],
        data: [],
        loading: false,
    },
    reducers: {
        usersRequested: (users, action) => {
            users.loading = true;
        },
        usersReceived: (users, action) => {
            users.data = action.payload.data;
            users.loading = false;
        },
        usersRequestFailed: (users, action) => {
            users.loading = false;
        }
    }
});

export const {usersRequested, usersReceived, usersRequestFailed} = slice.actions;
export default slice.reducer;

const url = '/users?limit=10&page=1';

export const loadUsers = () => apiCallBegan({
    url,
    method: 'get',
    onStart: usersRequested.type,
    onSuccess: usersReceived.type,
    onError: usersRequestFailed.type
});

// selectors

export const getUsers = createSelector(
    state => state.entities.users,
    users => users.data
);

export const getColumns = createSelector(
    state => state.entities.users,
    users => users.columns
);
