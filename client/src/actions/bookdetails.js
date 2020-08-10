import axios from 'axios';
import {
    GET_BOOKDETAILS,
    BOOKDETAILS_FAIL,
    GET_BOOKBYGENRE,
    GET_BOOKBYID
} from './types';

export const getBookDetails = () => dispatch =>{
    axios.get('/api/booksDetails')
         .then(res=>{
             dispatch({
                 type: GET_BOOKDETAILS,
                 payload: res.data
             })
         })
         .catch(err=>{
             dispatch({
                 type: BOOKDETAILS_FAIL,
                 payload: { msg: err.response.statusText, status: err.response.status }
             })
         })
}

export const getBookByGenre = (genre) => dispatch => {
    axios.get(`/api/booksDetails/bygenre/${genre}`)
         .then(res=>{
             dispatch({
                 type: GET_BOOKBYGENRE,
                 payload: res.data
             })
         })
         .catch(err=>{
            dispatch({
                type: BOOKDETAILS_FAIL,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        })
}

export const getBookById = (id) => dispatch => {
    axios.get(`/api/booksDetails/${id}`)
         .then(res=>{
             dispatch({
                 type: GET_BOOKBYID,
                 payload: res.data
             })
         })
         .catch(err=>{
            dispatch({
                type: BOOKDETAILS_FAIL,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        })
}