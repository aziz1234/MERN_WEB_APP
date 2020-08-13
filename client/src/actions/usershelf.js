import axios from 'axios';
import {setAlert} from './alert';
import {
    GET_REVIEWS,
    REVIEWS_FAIL,
    ADD_BOOK, 
    BOOKADD_FAIL,
    GET_SHELF,
    SHELFLOAD_FAIL
} from './types'

export const getReviews = id => dispatch =>{
    
    axios.get(`/api/booksDetails/reviews/${id}`)
         .then(res =>{
             dispatch({
                 type: GET_REVIEWS,
                 payload: res.data
             })
         })
         .catch(err=>{
             dispatch({
                 type: REVIEWS_FAIL,
                 payload: { msg: err.response.statusText, status: err.response.status }
             })
         })
}

export const addBook = ({status,rating,review,bookid}) => dispatch =>{

    const config = {
        headers :{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({status, rating, review});

    axios.post(`/api/userShelf/${bookid}`,body, config)
         .then(res=>{
             dispatch({
                 type: ADD_BOOK
             });
             dispatch(setAlert("Book added successfully to your shelf","success"));
         })
         .catch(err=>{
             dispatch({
                 type: BOOKADD_FAIL
             })
             dispatch(setAlert("Shelf did not update, please add book again"));
         })     
}

export const getShelf = () => dispatch =>{

    axios.get(`/api/userShelf/mybooks`)
         .then(res=>{
             dispatch({
                 type: GET_SHELF,
                 payload: res.data
             })
         })
         .catch(err=>{
             dispatch({
                 type: SHELFLOAD_FAIL,
                 payload: { msg: err.response.statusText, status: err.response.status }
             })
         })
}