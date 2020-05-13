import React, {Component, useEffect, useReducer} from 'react';
import Title from './title';
import Body from './body';
import Footer from './footer';
import { makeStyles } from '@material-ui/core/styles';

import * as Test from '../../common/test/stock_main_test';

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
const initStockInfos = Test.stock.createDummyData(10);

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
          action.payload = Test.stock.createDummyData(10);
          cbFn(action);
        }
        break;

      default :
        break;
    }

    return obj;
}

/**
 * WebSocket 생성
 */
function createWebSocket(dispatchStockInfo){
  
  function writeResponse(text){
    console.log('writeResponse[' + text + ']');
  }

  let wsObj = {
    ws:undefined,

    open(){
      if(this.ws!==undefined && this.ws.readyState!==WebSocket.CLOSED){
        writeResponse("WebSocket is already opened.");
        return;
      }
      //웹소켓 객체 만드는 코드
      this.ws=new WebSocket("ws://localhost:8080/ws/chat");
      
      this.ws.onopen=function(event){
        writeResponse('연결');
          if(event.data===undefined) return;
          writeResponse(event.data); 
      };
      
      this.ws.onmessage=function(event){
          console.log('onmessage event.data Type[' + typeof(event.data) + ']');
          var jsonObj = JSON.parse(event.data);

          if (jsonObj != undefined){
            console.log('json object'); 
          }else{
            console.log('json not object'); 
          }


          if(jsonObj != undefined){
            console.log('1111111');
            let action = {};
            action.type = 'reset';
            action.payload = eval(event.data);
            dispatchStockInfo(action);
          }else{
            console.log('22222222');
            writeResponse('onmessage:' + event.data);
          }
      };
      this.ws.onclose=function(event){
          writeResponse("Connection closed");
      }
    },

    send(text){
      if(this.ws==undefined){
        writeResponse("WebSocket is not opened.");
        return;
      }

      console.log('this.ws.readyState[' + this.ws.readyState + ']');

      this.ws.send(text);      
    },

    closeSocket(){
      if(this.ws==undefined){
        writeResponse("WebSocket is not opened.");
        return;
      }
      ws.close();
      this.ws = undefined;
    }

  };

  return wsObj;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection : 'column',
    minHeight: '98vh',
  },
  body: {
    flex: 1,
  },
  footer: {
    height:'100',
    marginTop: 'auto',
    background: '#333'
  },

}))

export default function index(){
  const [stockInfos, dispatchStockInfo] = useReducer(userReducerStockInfo, null)
  console.log('index 시작');

  let stockController = createController('test');
  let ws = createWebSocket(dispatchStockInfo);

  //마운트시 실행
  useEffect(() => {
    /* const id = setInterval(() => {
      console.log('startLoopStockInfo 시작');
      stockController.getData(dispatchStockInfo); 
    }, 5000);
    console.log('useEffect 시작');
    
    return () => {
      console.log('useEffect 종료');
      clearInterval(id);
    } */
    // ws.open();
    // setTimeout(() => {ws.send('text1sfsfsdfsf')}, 5000);
    setTimeout(() => {stockController.getData(dispatchStockInfo)}, 2000);
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Title/>
      <Body stockInfos={stockInfos}></Body>
      <Footer></Footer>
    </div>
  )
}
