import axios from 'axios';
import * as actions from '../api';

const api = ({ dispatch }) => next => async action => {
    if(action.type !== actions.apiCallBegan.type) return next(action);

    const {url, method, data, onStart, onSuccess, onError} = action.payload;

    if(onStart) dispatch({type: onStart});

    next(action);

    try{
        const response = await axios.request({
            baseURL: "http://127.0.0.1:3000",
            url,
            method,
            data,
            withCredentials: true,
        });
        dispatch(actions.apiCallSuccess(response.data));

        if(onSuccess) dispatch({type: onSuccess, payload: response.data});
    }catch(error) {
        const {message} = error.response.data;
        dispatch(actions.apiCallFailed(message));
        if(onError) dispatch({type: onError, payload: message});
    }
}

export default api;