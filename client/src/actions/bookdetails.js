import axios from 'axios';
import {getReviews} from './usershelf';
import {setAlert} from './alert';
import {
    GET_BOOKDETAILS,
    BOOKDETAILS_FAIL,
    GET_BOOKBYGENRE,
    GET_BOOKBYID,
    BOOKTODB_SUCCESS,
    BOOKTODB_FAIL,
    DELETEBOOK_FROMDB,
    BOOKDELETE_FAIL,
    UPDATEDB_SUCCESS,
    UPDATEDB_FAIL
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
             dispatch(getReviews(id));
         })
         .catch(err=>{
            dispatch({
                type: BOOKDETAILS_FAIL,
                payload: { msg: err.response.statusText, status: err.response.status }
            })
        })
}

export const addBookToDb = (bookDetails) => dispatch => {

    const config = {
        headers :{
            'Content-Type':'application/json'
        }
    }
    console.log(bookDetails)
    const body = JSON.stringify(bookDetails);
    console.log(bookDetails)

    axios.post('/api/booksDetails',body,config)
         .then(res=>{
             dispatch({
                 type: BOOKTODB_SUCCESS,
                 payload: res.data
             })
             dispatch(setAlert("Book added to database successfully","success"));
         })
         .catch( err=> {
             dispatch({
                 type: BOOKTODB_FAIL,
                 payload:  { msg: err.response.statusText, status: err.response.status }
             })
            dispatch(setAlert("Couldn't add book to database","warning"));
         });
}

export const updateDatabase= (id,bookDetails) => dispatch => {

    const config = {
        headers :{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify(bookDetails);

    axios.put(`/api/booksDetails/${id}`,body,config)
         .then(res=>{
             dispatch({
                 type: UPDATEDB_SUCCESS,
                 payload: res.data
             })
             dispatch(setAlert("Book updated successfully","success"));
         })
         .catch( ()=> {
             dispatch({
                 type: UPDATEDB_FAIL,
             })
            dispatch(setAlert("Couldn't update book in database","warning"));
         });
}

export const deleteBookfromDatabase = (id) => dispatch =>{
    axios.delete(`/api/booksDetails/${id}`)
         .then(res=>{
             dispatch({
                 type: DELETEBOOK_FROMDB,
                 payload: res.data
             });
             dispatch(setAlert("Book deleted successfully","success"));
         })
         .then(res=>{
             dispatch({
                 type: UPDATEDB_FAIL
             })
             dispatch(setAlert("Book couldn't be deleted from database"));
         });
}

