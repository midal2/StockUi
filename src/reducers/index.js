import { combineReducers } from 'redux';
import ProgramReducer from './reducer_programs';
import RecentlyProgramReducer from './reducer_recently_programs';
import StockReducer from './reducer_stock';

const rootReducer = combineReducers({
  programs : ProgramReducer,
  recently_programs: RecentlyProgramReducer,
  stocks: StockReducer,
});

export default rootReducer;
