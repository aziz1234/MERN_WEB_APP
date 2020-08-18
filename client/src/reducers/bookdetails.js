import {
    GET_BOOKDETAILS,
    BOOKDETAILS_FAIL,
    GET_BOOKBYGENRE,
    GET_BOOKBYID,
    BOOKTODB_SUCCESS,
    BOOKTODB_FAIL,
    UPDATEDB_FAIL,
    UPDATEDB_SUCCESS,
    DELETEBOOK_FROMDB
} from '../actions/types';
const initialState = {
    bookDetails:null,
    loading:true,
}

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_BOOKDETAILS:
        case GET_BOOKBYGENRE:
        case GET_BOOKBYID:
        case BOOKTODB_SUCCESS:
        case UPDATEDB_SUCCESS: 
        case DELETEBOOK_FROMDB:
            return{
                ...state,
                loading: false,
                bookDetails: payload
            }
        
       
        case UPDATEDB_FAIL:
            return{
                ...state,
                loading: false 
            }
        case BOOKTODB_FAIL:
        case BOOKDETAILS_FAIL:
            return{
                ...state,
                loading: false,
                bookDetails: payload
            }
        default:
            return state;
    }

}