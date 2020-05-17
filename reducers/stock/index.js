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
export const LOAD_STOCK_INFOS = 'LOAD_STOCK_INFOS';

let nowData = [
    {
      title: '', //주식명
      nowPrice: '', //현재가
      time: 't', //현재시간
      differAmt: '', //등락폭
    },
  ];
  
export default function userReducerStockInfo(state=null, action){
  switch (action.type) {
    case LOAD_STOCK_INFOS: {
        return [...action.payload];
      }
      default: {
        return state;
      }
  }
}