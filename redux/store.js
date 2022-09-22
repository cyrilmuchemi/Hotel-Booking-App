import { applyMiddleware, createStore } from '@reduxjs/toolkit'; 
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import  thunkMiddleware from 'redux-thunk';
import reducers from './reducers/reducers';

const bindMiddleWare = (middleware) => {
    if(process.env.NODE_ENV != 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }

    return applyMiddleware(...middleware)
}

const reducer = (state, action) => {
    if(action.type == HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }

        return nextState
    }

    else {
        return reducers(state, action)
    }
}

const initStore = () => {
    return createStore(reducer, bindMiddleWare([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)