import { combineReducers } from 'redux';
import userReducerStockInfo from './stock';

const rootReducer = combineReducers({
    userReducerStockInfo : userReducerStockInfo,
});

export default rootReducer;