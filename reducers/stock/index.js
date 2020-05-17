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

//Action 생성정의
export const changeInputAction = createAction(LOAD_STOCK_INFOS, stockInfos => stockInfos);

//Reducer 정의
export default handleActions({
  [LOAD_STOCK_INFOS] : 
    (state, action) => ([...action.payload])
}, null);