import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DELETEUSER_SUCCESS,
    DELETEUSER_FAIL
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
              ...state,
              ...payload,
              isAuthenticated: true,
              loading: false
            };
        case DELETEUSER_SUCCESS:
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        case DELETEUSER_FAIL:
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
              };
        case LOGIN_FAIL:
        case AUTH_ERROR:
        case REGISTER_FAIL:
        case LOGOUT:
            return{
                ...state,
                token:null,
                isAuthenticated:false,
                loading:false
            };
        default:
            return state;
    }

}