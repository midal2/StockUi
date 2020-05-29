import { createAction, handleActions } from 'redux-actions';

  /*
  stockInfo
  -----------------------------------
  stockName : string '주식명'
  stockCd   : string '주식코드'
  */
 
//Action 상수정의
export const LOAD_STOCK_ITEM  = 'LOAD_STOCK_ITEM'; //주식항목 로드
export const ADD_STOCK_ITEM   = 'ADD_STOCK_ITEM';   //주식항목 추가

//Action 생성정의
export const loadStockItemsAction   = createAction(LOAD_STOCK_ITEM, stockInfos => stockInfos);
export const addStockItemAction     = createAction(ADD_STOCK_ITEM, stockInfo => stockInfo);

//Reducer 정의
export default handleActions({
  [LOAD_STOCK_ITEM] : 
    (state, action) => ([...action.payload]),

  [ADD_STOCK_ITEM] :
    (state, action) => {
      let _state = [...state];
      let _payload = [...action.payload];
      
      //기등록된 코드는 추가 하지 않음
      _payload.forEach(element => {
        let isAddedItem = false;
        for(var i in _state){
          if (element.stockCd == _state[i].stockCd){
            isAddedItem = true;
            break;  
          }
        } 
        if (!isAddedItem){
          _state.push(element);
        }           
      });
      
      return _state;
    },


}, null);