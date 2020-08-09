import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import bookdetails from './bookdetails';

export default combineReducers({
    alert,
    auth,
    bookdetails
}); 