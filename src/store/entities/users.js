import {createSlice, createSelector} from '@reduxjs/toolkit';
import { apiCallBegan } from '../api';

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
        limit: 10,
        page: 1,
        totalUsers: 0,
        userId: null,
    },
    reducers: {
        usersRequested: (users, action) => {
            users.loading = true;
        },
        usersReceived: (users, action) => {
            users.data = action.payload.data;
            users.limit = action.payload.meta.limit;
            users.page = action.payload.meta.page;
            users.totalUsers = action.payload.meta.totalItems;
            users.loading = false;
        },
        usersRequestFailed: (users, action) => {
            users.loading = false;
        },
        userSelected: (users, action) => {
            users.userId = action.payload;
        }
    }
});

export const {
    usersRequested, 
    usersReceived, 
    usersRequestFailed,
    userSelected,
} = slice.actions;
export default slice.reducer;

const url = '/users';

export const loadUsers = (limit,page) => apiCallBegan({
    url: `${url}?limit=${limit}&page=${page}`,
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

export const getLimit = createSelector(
    state => state.entities.users,
    users => users.limit
);

export const getPage = createSelector(
    state => state.entities.users,
    users => users.page
);

export const getUserCount = createSelector(
    state => state.entities.users,
    users => users.totalUsers
);

export const getUser = createSelector(
    state => state.entities.users,
    users => {
        const {userId, data} = users;
        return data.find(user => user.id === userId);
    }
)
