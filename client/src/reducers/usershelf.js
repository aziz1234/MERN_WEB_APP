import {
    GET_REVIEWS,
    REVIEWS_FAIL,
    ADD_BOOK,
    BOOKADD_FAIL,
    GET_SHELF,
    SHELFLOAD_FAIL,
    DELETE_BOOK,
    BOOKDELETE_FAIL
} from '../actions/types'

const initialState ={
    shelf: null,
    loading: true
}

export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
        case GET_REVIEWS:
            return{
                ...state,
                loading: false,
                shelf: payload
            };
        case ADD_BOOK:
            return{
              ...state,
              loading: false  
            };
        case GET_SHELF:
            return{
                ...state,
                loading: false,
                shelf: payload
            };
        case DELETE_BOOK:
            return{
                ...state,
                loading: false
            }
        case BOOKDELETE_FAIL:
        case BOOKADD_FAIL:
            return{
                ...state,
                loading: false
            }
        case REVIEWS_FAIL:
            return{
                ...state,
                loading: false,
                shelf: payload
            };
        case SHELFLOAD_FAIL:
            return{
                ...state,
                loading: false,
                shelf: payload
            }
        default:
            return state;
    }
}