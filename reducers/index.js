// NODE Modules
import { combineReducers } from 'redux';

// CUSTOM Modules
import stock from './stock';
import jenkinsMain from './jenkins';

const rootReducer = combineReducers({
    stock,
    jenkinsMain
});

export default rootReducer;