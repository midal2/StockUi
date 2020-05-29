/**
 * ------------------------------------------------------------------------
 * NAME : modules/stock/index.js
 * DESC : 주식DashBoard Module
 * ------------------------------------------------------------------------
 * INFO : 
 * REF  :
 * ------------------------------------------------------------------------
 */

//환경설정 및 유틸
import Config from '../../config';
import * as ObjectUtil from '../../common/util/object_util';

//웹소켓(Stomp)
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

//리듀서
import {requestStockInfoAction, loadStockInfoAction, loadStockInfoActionTest} from '../../reducers/stock';
import {loadStockItemsAction, addStockItemAction} from '../../reducers/stockItem';

/**
 * 모니터링을 시작한다
 * @param {*} dispatch 
 */
export function startMornitoring(dispatch){
  //최초모니터링 시작시 모니터링 중단을 초기화한다(모니터링이 가능하도록 설정)
  window.localStorage.setItem("_STOCK_MORNITORING_ENABLE", "Y");

  //증권항목을 등록한다
  dispatch(loadStockItemsAction(Config.STOCK_ITEM)); 

  //모니터링모드에 따른 유형별 모니터링을 시작한다
  switch(Config.STOCK_MONITORING_MODE){
    case 'TEST' :
      startMornitoringForTest(dispatch);
      break;
    case 'REAL' :
      startMornitoringForAp(dispatch);
      break;
    }
}
    
var startMornitoringForTest = (dispatch) => {
  //Step 테스트용 증권데이터load
  dispatch(loadStockInfoActionTest());

  //Step 다시 재호출
  setTimeout(() => {startMornitoringForTest(dispatch)}, Config.STOCK_MONITORING_PERIOD);
}

export let getStockInfo = (stockInfos) => {
  let myStorage = window.localStorage;
  if (myStorage.getItem("_STOCK_MORNITORING_ENABLE") == "N"){ // App(Native)에서 모니터링 중단을 설정한경우 대기후 다시실행
    setTimeout(()=>{getStockInfo(stockInfos)}, Config.STOCK_MONITORING_PERIOD) 
  }else{
    stompClient.send("/pub/monitoring/StockMonitor/getStockInfo",{},JSON.stringify(stockInfos));
  }
}

let sockJS = new SockJS(Config.STOCK_WEBSOCKET_URL + "/stock-ws");
let stompClient = Stomp.over(sockJS);
stompClient.debug= () => {};

var startMornitoringForAp = (dispatch) => {
  //Step WebSocket 연결 
  stompClient.connect({},()=>{

    //연결후 Topic의 구독을 지정한다
    stompClient.subscribe('/sub/monitoring/StockInfoList',(data)=>{
      const payload = JSON.parse(data.body);
      dispatch(loadStockInfoAction(payload));
      setTimeout(()=>{ dispatch(requestStockInfoAction())}, Config.STOCK_MONITORING_PERIOD)
    });

    dispatch(requestStockInfoAction());
  })
}

/**
 * 모니터링 주식 추가
 * @param {*} dispatch 
 * @param {array[StockInfo]} stockInfoArr 추가될 주식정보
 */
export function addStockInfo(dispatch, stockInfoArr){
  if (ObjectUtil.isEmpty(stockInfoArr) || !Array.isArray(stockInfoArr)){
    return;
  }

  let payload = [];
  stockInfoArr.forEach(element => {
    let obj = {
      stockName : element.title,
      stockCd   : element.stockCd,   
    }
    payload.push(obj);
  });

  dispatch(addStockItemAction(payload));
}