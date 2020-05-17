//테스트
import * as Test from '../../common/test/stock_main_test';

//유틸
import * as ObjectUtil from '../../common/util/object_util';

//리듀서
import {LOAD_STOCK_INFOS} from '../../reducers/stock';


/**
 * WebSocket 생성
 * @param {*} dispatchStockInfo 
 */
export function createWebSocket(dispatchStockInfo){
  
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
              let action = {};
              action.type = 'reset';
              action.payload = eval(event.data);
              dispatchStockInfo(action);
            }else{
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

/**
 * 모니터링을 시작한다
 */
var _stockInfos; //증권정보
export function startMornitoring(dispatch){
    const mode = 'test'; //########test or real
    
    switch(mode){
      case 'test' :
        startMornitoringForTest(dispatch);
        break;
      case 'real' :
        startMornitoringForAP(dispatch);
        break;
      default :
        return;
    }
}

var startMornitoringForTest = (dispatch) => {
  //Step 증권목록을 생성한다(증권목록이 없을경우)
  if (ObjectUtil.isEmpty(_stockInfos)){
    _stockInfos = Test.stock.createDummyDataWithObject(Test.stockInfo);  
  }
  
  //Step 증권세부내역을 갱신한후 UI에 적용한다
  dispatch({
    type    : LOAD_STOCK_INFOS,
    payload : Test.stock.refreshDummyData(_stockInfos), //데이터갱신
  });
  
  //Step 다시 재호출
  setTimeout(() => {startMornitoringForTest(dispatch)}, 3000);
}

var startMornitoringForAp = (dispatchStockInfo) => {

}