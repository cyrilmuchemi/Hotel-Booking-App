import axios from "axios";

import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,

    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,

    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,

    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'


//Register User

export const registerUser = (userData) => async (dispatch) => {
    try {

    dispatch({ type: REGISTER_USER_REQUEST })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const { data } = await axios.post('/api/auth/register', userData, config)


       dispatch({
          type: REGISTER_USER_SUCCESS
       })
        
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
        
    }
}

//Load User

export const loadUser = () => async (dispatch) => {
    try {

    dispatch({ type: LOAD_USER_REQUEST })

    const { data } = await axios.get('/api/me')


       dispatch({
          type: LOAD_USER_SUCCESS,
          payload: data.user
       })
        
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
        
    }
}

//Update Profile

export const updateProfile = (userData) => async (dispatch) => {
    try {

    dispatch({ type: UPDATE_PROFILE_REQUEST })

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const { data } = await axios.put('/api/me/update', userData, config)


       dispatch({
          type: UPDATE_PROFILE_SUCCESS,
          payload: data.success
       })
        
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
        
    }
}


//forgot Password action

export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/password/forgot', email, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    } catch (error) {

        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}


export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}