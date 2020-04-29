import React, {Component, useEffect, useReducer} from 'react';
import Title from './title';
import Body from './body';
import Footer from './footer';
import * as DateUtil from '../common/date_util';
import * as NumberUtil from '../common/number_util';

/*
  stockInfo
  -----------------------------------
  stockTime : string '주식확인시간'
  stockName : string '주식명'
  stockCd   : string '주식코드'
  stockNowVal,ue : number '주식현재가'
  stockIncDecValue : number '증감금액'
  stockIncDecSign : string '부호( + or - )'
  stockIncDecRate : number '증감비율(%)'
*/

//주식정보
const initStockInfos = [
  {
  stockTime : DateUtil.getNowDate(),
  stockName : "더미데이터" ,
  stockCd   : "" ,
  stockNowValue : "10,000",
  stockIncDecValue : "800",
  stockIncDecSign : "▼",
  stockIncDecRate : "17",
  },
]

//주식정보 Reducer
const userReducerStockInfo = (state, action) => {
  switch (action.type) {
    case 'reset': {
      return action.payload;
    }
    default: {
      throw new Error(`unexpected action.type: ${action.type}`)
    }
  }
}

/**
 * 
 * @param {*} mode : real(운영,기본값), test(테스트용도)  
 */
function createController(mode = 'real'){
    let obj = {};

    switch(mode){
      case 'real' :
        break;
      
      case 'test' :
        obj.getData = (cbFn) => {
          let action = {};
          action.type = 'reset';
          action.payload = [];

          // 임시데이터 생성
          let itemCnt = NumberUtil.getRandomNumber(10);
          for (var i=0; i<itemCnt; i++){
            action.payload.push({
              stockTime : DateUtil.getNowDate() ,
              stockName : "임시생성" + i ,
              stockCd   : "" ,
              stockNowValue : NumberUtil.getRandomNumber(20000),
              stockIncDecValue : NumberUtil.getRandomNumber(1000),
              stockIncDecSign : "▼",
              stockIncDecRate : NumberUtil.getRandomNumber(30),
            });  
          }

          
          cbFn(action);
        }
        break;

      default :
        break;
    }

    return obj;
}

export default function index(){
  const [stockInfos, dispatchStockInfo] = useReducer(userReducerStockInfo, initStockInfos)
  console.log('index 시작');

  let stockController = createController('test');

  //마운트시 실행
  useEffect(() => {
    const id = setInterval(() => {
      console.log('startLoopStockInfo 시작');
      stockController.getData(dispatchStockInfo); 
    }, 1000);
    console.log('useEffect 시작');
    
    return () => {
      console.log('useEffect 종료');
      clearInterval(id);
    }
  }, []);

  return (
    <div>
      <Title></Title>
      <Body stockInfos={stockInfos}></Body>
      <Footer></Footer>
    </div>
  )
}
