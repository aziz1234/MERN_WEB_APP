import axios from 'axios';
import {setAlert} from './alert';
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR
} from './types';
import setAuthToken from '../utils/setAuthToken';

//Load user
export const loadUser = () => dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    axios.get('/api/auth')
         .then(res =>{
             dispatch({
                 type:USER_LOADED,
                 payload:res.data
             });
         })
         .catch(err=>{
             dispatch({
                 type: AUTH_ERROR
             });
         });
}

//Register user
export const register =({name, email , password}) => dispatch => {
    const config = {
        headers :{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({name, email, password});

    axios.post('/api/user',body,config)
         .then(res=> {
             dispatch({
                 type:REGISTER_SUCCESS,
                 payload: res.data
             })
        })
        .catch(err=>{
             const errors = err.response.data.errors;
             if(errors){
                 errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
             }
             dispatch({
                 type:REGISTER_FAIL
             });
        });
}