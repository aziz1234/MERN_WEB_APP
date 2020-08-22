import axios from 'axios';
import {setAlert} from './alert';
import {getShelf} from './usershelf'
import{
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    DELETEUSER_SUCCESS,
    DELETEUSER_FAIL,
} from './types';


//Load user
export const loadUser = () => dispatch => {
    
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
             dispatch(loadUser());
             
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

//Login user
export const login =(email , password) => dispatch => {
    const config = {
        headers :{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email, password});

    axios.post('/api/auth',body,config)
         .then(res=> {
             dispatch({
                 type:LOGIN_SUCCESS,
                 payload: res.data
             })
             dispatch(loadUser());
        })
        .catch(err=>{
             const errors = err.response.data.errors;
             if(errors){
                 errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
             }
             dispatch({
                 type:LOGIN_FAIL
             });
        });
}

//Logout user
export const logout = () => dispatch => {
    dispatch({type:LOGOUT});
}

//Delete User Profile
export const deleteUser =() =>dispatch => {
    const config = {
        headers :{
            'Content-Type':'application/json'
        }
    }
    axios.delete('/api/user',config)
         .then(()=>{
             dispatch({
                 type: DELETEUSER_SUCCESS
             })
         })
         .catch(()=>{
             dispatch({
                 type: DELETEUSER_FAIL
             });
             dispatch(setAlert("Task Failure","Danger"));
         })
}
