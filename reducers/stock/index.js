import { createAction, handleActions } from 'redux-actions';

  /*
  stockInfo
  -----------------------------------
  stockTime : string '주식확인시간'
  stockName : string '주식명'
  stockCd   : string '주식코드'
  stockNowVal,ue : number '주식현재가'
  stockIncDecValue : number '증감금액'
  stockIncDecSign : string '부호( + or ▼ )'
  stockIncDecRate : number '증감비율(%)'
  stockStatusList : array '주식상황목록' 
                [ 
                    stockStatus 
                    ----------------
                    summary : string '상태요약메세지'
                    value : string '세부상태명'
                ]
  */
 
//Action 상수정의
export const LOAD_STOCK_INFOS = 'LOAD_STOCK_INFOS'; //주식목록 로드
export const ADD_STOCK_INFO   = 'ADD_STOCK_INFO';   //주식정보 추가

//Action 생성정의
export const loadStockAction    = createAction(LOAD_STOCK_INFOS, stockInfos => stockInfos);
export const addStockInfoAction = createAction(ADD_STOCK_INFO, stockInfo => stockInfo);

//Reducer 정의
export default handleActions({
  [LOAD_STOCK_INFOS] : 
    (state, action) => ([...action.payload]),

  [ADD_STOCK_INFO] :
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