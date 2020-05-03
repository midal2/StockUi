import React, {Component, useEffect, useReducer} from 'react';
import * as XmlConverter from 'xml-js';
import axios from 'axios';
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
  stockStatusList : array '주식상황목록' 
                [ 
                    stockStatus
                    ----------------
                    summary : string '상태요약메세지'
                    value : string '세부상태명'
                ]
*/

//주식정보
const initStockInfos = [
  {
  stockTime : DateUtil.getNowDate(),
  stockName : "더미데이터" ,
  stockCd   : "777777" ,
  stockNowValue : "10,000",
  stockIncDecValue : "800",
  stockIncDecSign : "▼",
  stockIncDecRate : "17",
  stockStatusList : [],
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
          
          // console.log('axios');
          // axios('/servlet/krx.asp.XMLSise?code=035420')
          //   .then(function (response) {
          //     console.log(response.data)
          //   });
            
            
          // 임시데이터 생성
          let itemCnt = NumberUtil.getRandomNumber(10);
          action.payload = [];
          for (var i=0; i<itemCnt; i++){
            let obj = {};

            obj = {
              stockTime : DateUtil.getNowDate() ,
              stockName : "임시생성" + i ,
              stockCd   : "99999" + NumberUtil.getRandomNumber(9),
              stockNowValue : NumberUtil.getRandomNumber(20000),
              stockIncDecValue : NumberUtil.getRandomNumber(1000, -1000),
              stockIncDecSign : "▼",
              stockIncDecRate : NumberUtil.getRandomNumber(30),
              stockStatusList : [],
            };

            // 데이터상태생성
            let statusCnt = NumberUtil.getRandomNumber(5);
            for (var x=0; x<statusCnt; x++){
              let createdStatus = NumberUtil.getRandomNumber(3);   
              let createStatus = (summary, value) => {return {summary, value}};

              switch(createdStatus){
                case 1:
                  obj.stockStatusList.push(createStatus('10%증가', '10%'));
                  break;

                case 2:
                  obj.stockStatusList.push(createStatus('20%증가', '20%'));
                  break;
                
                case 3:
                  obj.stockStatusList.push(createStatus('30%증가', '30%'));
                  break;
                
                case 4:
                  obj.stockStatusList.push(createStatus('40%증가', '40%'));
                  break;
                
                case 5:
                  obj.stockStatusList.push(createStatus('50%증가', '50%'));
                  break;

                default:
                  console.log('createdStatus default[' + createdStatus + ']' );
                  obj.stockStatusList.push(createStatus('0%증가', '0%'));
                  break;
              }
            }
            
            console.dir(obj);
            action.payload.push(obj);
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
    }, 5000);
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
