import { apiCallBegan } from "../api";
import { createSlice, createSelector } from '@reduxjs/toolkit';

const slice = createSlice({
    name: 'subcategories',
    initialState: {
        data: [],
        loading: false,
        error: null
    },
    reducers: {
        subcategoriesRequested: (state, action) => {
            state.loading = true;
        },
        subcategoriesReceived: (state, action) => {
            state.data = action.payload.data;
            state.loading = false;
        },
        subCategoriesFailed: (state, action) => {
            state.loading = false;
        },
        createSubCategoryRequested: (state, action) => {
            state.loading = true;
        },
        subCategoryCreated: (state, action) => {
            const {id, name, description, categoryId} = action.payload;
            state.data.push({id, name, description, categoryId});
            state.loading = false;
        },
        subCategoryCreationFailed: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const { 
    subcategoriesRequested, 
    subcategoriesReceived, 
    subCategoriesFailed,
    createSubCategoryRequested,
    subCategoryCreated,
    subCategoryCreationFailed
} = slice.actions;
export default slice.reducer;

export const url = '/subcategories';

export const loadSubCategories = (categoryId) => apiCallBegan({
    url: `categories/${categoryId}${url}`,
    method: 'get',
    onStart: subcategoriesRequested.type,
    onSuccess: subcategoriesReceived.type,
    onError: subCategoriesFailed.type
});

export const getSubcategories = createSelector(
    state => state.entities.subcategories,
    subcategories => subcategories.data
);