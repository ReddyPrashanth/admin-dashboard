import { createSlice, createSelector } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import { apiCallBegan } from "../api";

const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'false' ? false: true;

const slice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: isLoggedIn,
        loading: false,
        error: null,
    },
    reducers: {
        loginRequested: (auth, action) => {
            auth.loading = true;
        },
        loginSucceded: (auth, action) => {
            auth.isAuthenticated = true;
            sessionStorage.setItem('isLoggedIn', true);
            auth.user = action.payload;
            auth.loading = false;
        }, 
        loginFailed: (auth, action) => {
            auth.isAuthenticated = false;
            sessionStorage.setItem('isLoggedIn', false);
            auth.error = action.payload;
            auth.user = null;
            auth.loading = false;
        },
        signupSucceded: (auth, action) => {
            auth.loading = true;
            toast.success(`User ${action.payload.firstName} is created.`);
        },
        signupFailed: (auth, action) => {
            auth.error = action.payload;
            auth.loading = false;
        },
        logoutUser: (auth, action) => {
            auth.isAuthenticated = false;
            sessionStorage.setItem('isLoggedIn', false);
            auth.user = null;
            auth.loading = false;
        },
        resetAuthError: (auth, action) => {
            auth.error = null;
        }
    }
});

export const {
    loginRequested, 
    loginSucceded, 
    loginFailed, 
    logoutUser, 
    resetAuthError, 
    signupSucceded,
    signupFailed
} = slice.actions;

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

export const signup = (data) => {
    const {
        email, 
        firstName, 
        lastName, 
        password, 
        gender, 
        address1, 
        address2, 
        city, 
        state, 
        country, 
        zipCode, 
        phone
    } = data;
    const address = {address1, address2, city, state, country, zipCode, phone};
    const user = {email, firstName, lastName, password, gender, address };
    return apiCallBegan({
        url: `${url}/signUp`,
        data: user,
        method: 'post',
        onStart: loginRequested.type,
        onSuccess: signupSucceded.type,
        onError: signupFailed.type
    });
}
// Selectors

export const getUser = createSelector(
    state => state.entities.auth,
    auth => auth.user,
);

export const isAuthenticated = createSelector(
    state => state.entities.auth,
    auth => auth.isAuthenticated,
)

export const getError = createSelector(
    state => state.entities.auth,
    auth => auth.error
)