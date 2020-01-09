import { combineReducers } from 'redux';
import user from './userReducer';
import editUser from './editReducer';

const reducers = combineReducers({
    user,
    editUser
});

export default reducers;