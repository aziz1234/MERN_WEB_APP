import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import bookdetails from './bookdetails';
import usershelf from './usershelf'

export default combineReducers({
    alert,
    auth,
    bookdetails,
    usershelf
}); 