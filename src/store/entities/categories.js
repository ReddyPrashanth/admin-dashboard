import { apiCallBegan } from "../api";
import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'categories',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        categoriesRequested: (state, action) => {
            state.loading = true;
        },
        categoriesReceived: (state, action) => {
            state.data = action.payload.data;
            state.loading = false;
        },
        categoriesRequestFailed: (state, action) => {
            state.loading = false;
        },
        createCategoryRequested: (state, action) => {
            state.loading = true;
        },
        categoryCreated: (state, action) => {
            const {id, name, description} = action.payload;
            state.data.push({id, name, description});
            state.loading = false;
        },
        categoryCreationFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { 
    categoriesRequested, 
    categoriesReceived, 
    categoriesRequestFailed,
    createCategoryRequested,
    categoryCreated,
    categoryCreationFailed
} = slice.actions;
export default slice.reducer;

export const url = '/categories';

export const loadCategories = () => apiCallBegan({
    url,
    method: 'get',
    onStart: categoriesRequested.type,
    onSuccess: categoriesReceived.type,
    onError: categoriesRequestFailed.type
});

// selectors

export const getCategories = createSelector(
    state => state.entities.categories,
    categories => categories.data
);