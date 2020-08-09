import {
    GET_BOOKDETAILS,
    BOOKDETAILS_FAIL,
    GET_BOOKBYGENRE
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
            return{
                ...state,
                loading: false,
                bookDetails: payload
            }
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