/**
 * ------------------------------------------------------------------------
 * NAME : controller/stock/index.js
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
import {loadStockAction, addStockInfoAction} from '../../reducers/stock';

//테스트
import * as Test from '../../common/test/stock_main_test';


/**
 * 모니터링을 시작한다
 * @param {*} dispatch 
 */
export function startMornitoring(dispatch){
  switch(Config.STOCK_MONITORING_MODE){
    case 'TEST' :
      startMornitoringForTest(dispatch);
      break;
    case 'REAL' :
      startMornitoringForAp(dispatch);
      break;
      default :
      return;
    }
}
startMornitoring._stockInfos = null;
    
var startMornitoringForTest = (dispatch) => {
  let _stockInfos = (startMornitoring._stockInfos == null) ? null : [...startMornitoring._stockInfos];
  
  //Step 증권목록을 생성한다(증권목록이 없을경우)
  if (ObjectUtil.isEmpty(_stockInfos)){
    _stockInfos = Test.stock.createDummyDataWithObject(Test.stockInfo);  
  }
  
  //Step 증권세부내역을 갱신한후 UI에 적용한다
  dispatch(loadStockAction(Test.stock.refreshDummyData(_stockInfos)));
  
  //Step 다시 재호출
  setTimeout(() => {startMornitoringForTest(dispatch)}, 3000);
}
    
let sockJS = new SockJS(Config.STOCK_WEBSOCKET_URL + "/stock-ws");
let stompClient = Stomp.over(sockJS);
stompClient.debug= () => {};

var startMornitoringForAp = (dispatch) => {
  let myStorage = window.localStorage;
  
  const getStockInfo = (stockInfos) => {

    if (myStorage.getItem("_STOCK_MORNITORING_ENABLE") == "N"){ // App(Native)에서 모니터링 중단을 설정한경우 대기후 다시실행
      setTimeout(()=>{getStockInfo(stockInfos)}, Config.STOCK_MONITORING_PERIOD) 
    }else{
      stompClient.send("/pub/monitoring/StockMonitor/getStockInfo",{},JSON.stringify(stockInfos));
    }

  }

  //최초모니터링 시작시 모니터링 중단을 초기화한다(모니터링이 가능하도록 설정)
  myStorage.setItem("_STOCK_MORNITORING_ENABLE", "Y");

  //Step WebSocket 연결 
  stompClient.connect({},()=>{

    //연결후 Topic의 구독을 지정한다
    stompClient.subscribe('/sub/monitoring/StockInfoList',(data)=>{
      const payload = JSON.parse(data.body);
      console.log(payload);
      dispatch(loadStockAction(payload));
      setTimeout(()=>{getStockInfo(_stockInfos)}, Config.STOCK_MONITORING_PERIOD)
    });

    let _stockInfos = (startMornitoring._stockInfos == null) ? null : [...startMornitoring._stockInfos];
    
    //Step 증권목록을 생성한다(증권목록이 없을경우)
    if (ObjectUtil.isEmpty(_stockInfos)){
      _stockInfos = Test.stock.createDummyDataWithObject(Test.stockInfo);  
    }   

    getStockInfo(_stockInfos);
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

  dispatch(addStockInfoAction(payload));
}