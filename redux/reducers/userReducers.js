import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

//Auth reducer

export const authReducer = (state={ user: null }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:

        return {
            loading: true
        }

        case REGISTER_USER_SUCCESS:

        return {
            load: false,
            success: true
        }

        case REGISTER_USER_FAIL:
            return {
                load: false,
                error: action.payload
            }
        
        
        case CLEAR_ERRORS: 
            return {
                ... state,
                error: null
            }
        
        default:
            return state
    }
}

export const loadedUserReducer = (state={ loading: true, user: null }, action) => {
    switch (action.type) {

        case LOAD_USER_REQUEST:

        return {
            loading: true,
            isAuthenticated: false
        }

        case LOAD_USER_SUCCESS:

        return {
            loading: false,
            isAuthenticated: true,
            user: action.payload
        }
        
        case LOAD_USER_FAIL:

            return {
               loading: false,
               isAuthenticated: false,
               error: action.payload
        }
        
        case CLEAR_ERRORS: 
            return {
                ... state,
                error: null
            }
        
        default:
            return state
    }
}


//User Reducer
export const userReducer = (state={}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:

        return {
            loading: true
        }

        case UPDATE_PROFILE_SUCCESS:

        return {
            load: false,
           isUpdated: true
        }

        case UPDATE_PROFILE_RESET:

        return {
            load: false,
            isUpdated: false
        }

    
        case UPDATE_PROFILE_FAIL:
            return {
                load: false,
                error: action.payload
            }
        
        case CLEAR_ERRORS: 
            return {
                ... state,
                error: null
            }
        
        default:
            return state
    }
}


export const forgotPasswordReducer = (state={}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:

        return {
            loading: true
        }

        case FORGOT_PASSWORD_SUCCESS:

        return {
            load: false,
            message: action.payload
        }

    
        case FORGOT_PASSWORD_FAIL:
            return {
                load: false,
                error: action.payload
            }
        
        case CLEAR_ERRORS: 
            return {
                ... state,
                error: null
            }
        
        default:
            return state
    }
}