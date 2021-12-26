import { createSlice, createSelector } from "@reduxjs/toolkit";
import { apiCallBegan } from "../api";

const slice = createSlice ({
    name: 'products',
    initialState: {
        columns: [
            {
                header: 'Name',
                name: 'name'
            },
            {
                header: 'Description',
                name: 'description'
            },
            {
                header: 'Price',
                name: 'price'
            },
            {
                header: 'Stock',
                name: 'stock'
            }
        ],
        data: [],
        loading: false,
        limit: 10,
        page: 1,
        totalProducts: 0,
        userId: null,
    },
    reducers: {
        productsRequested: (products, action) => {
            products.loading = true;
        },
        productsReceived: (products, action) => {
            products.data = action.payload.data;
            products.limit = action.payload.meta.limit;
            products.page = action.payload.meta.page;
            products.totalProducts = action.payload.meta.totalItems;
            products.loading = false;
        },
        productsrequestFailed: (products, action) => {
            products.loading = false;
        }
    }
});

export const { 
    productsRequested, 
    productsReceived, 
    productsrequestFailed
} = slice.actions;

export default slice.reducer;

export const url = '/products';

export const loadProducts = (limit, page) => apiCallBegan({
    url: `${url}?limit=${limit}&page=${page}`,
    method: 'get',
    onStart: productsRequested.type,
    onSuccess: productsReceived.type,
    onError: productsrequestFailed.type
});

// Selectors

export const getProducts = createSelector(
    state => state.entities.products,
    products => products.data
);

export const getColumns = createSelector(
    state => state.entities.products,
    products => products.columns
);

export const getLimit = createSelector(
    state => state.entities.products,
    products => products.limit
);

export const getPage = createSelector(
    state => state.entities.products,
    products => products.page
);

export const getProductCount = createSelector(
    state => state.entities.products,
    products => products.totalProducts
);

export const getProduct = createSelector(
    state => state.entities.products,
    (_,id) => id,
    (products, id) => products.data.find(p => p.id === id)
);