import { combineReducers } from 'redux';
import ProgramReducer from './reducer_programs';
import RecentlyProgramReducer from './reducer_recently_programs';
import StockReducer from './reducer_stock';
import SelectedStockReducer from './reducer_selected_stock';
import StockDetailReducer from './reducer_stock_detail';

const rootReducer = combineReducers({
  programs : ProgramReducer,
  recently_programs: RecentlyProgramReducer,
  stocks: StockReducer,
  selectedStocks: SelectedStockReducer,
  stockDetail: StockDetailReducer,
});

export default rootReducer;
