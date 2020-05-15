// NODE Modules
import { combineReducers } from 'redux';

// CUSTOM Modules
import userReducerStockInfo from './stock';
import jenkinsMain from './jenkins_main';

const rootReducer = combineReducers({
    userReducerStockInfo : userReducerStockInfo,
    jenkinsMain : jenkinsMain,
});

export default rootReducer;