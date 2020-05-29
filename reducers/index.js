/**
 * ------------------------------------------------------------------------
 * NAME : reducers/stockItem
 * DESC : 리듀서 정의
 * ------------------------------------------------------------------------
 * INFO : 
 * REF  :
 * ------------------------------------------------------------------------
 */


// NODE Modules
import { combineReducers } from 'redux';

// Reducer Detail Modules
import stock from './stock';
import jenkinsMain from './jenkins';
import stockItem from './stockItem';

const rootReducer = combineReducers({
    stock,
    stockItem,
    jenkinsMain
});

export default rootReducer;