import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        loginRequested: (auth, action) => {
            auth.loading = true;
        },
        loginSucceded: (auth, action) => {
            auth.isAuthenticated = true;
            auth.user = action.payload;
            auth.loading = false;
        }, 
        loginFailed: (auth, action) => {
            auth.loading = false;
            auth.error = action.payload;
        },
        logoutUser: (auth, action) => {
            auth.isAuthenticated = false;
            auth.user = null;
        },
        resetAuthError: (auth, action) => {
            auth.error = null;
        }
    }
});

export const {loginRequested, loginSucceded, loginFailed, logoutUser, resetAuthError} = slice.actions;

export default slice.reducer;

const url = '/auth';

// Action Creators

export const authenticateUser = (credentials) => apiCallBegan({
    url: `${url}/signin`,
    method: 'post',
    data: credentials,
    onStart: loginRequested.type,
    onSuccess: loginSucceded.type,
    onError: loginFailed.type
});

export const logout = () => apiCallBegan({
    url: `${url}/logout`,
    method: 'post',
    onStart: loginRequested.type,
    onSuccess: logoutUser.type,
    onError: loginFailed.type
})

// Selectors

export const getUser = createSelector(
    state => state.entities.auth,
    auth => auth.user,
);

export const isAuthenticated = createSelector(
    state => state.entities.auth,
    auth => auth.isAuthenticated,
)

export const getLoginError = createSelector(
    state => state.entities.auth,
    auth => auth.error
)