//테스트
import * as Test from '../../common/test/stock_main_test';

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
 * 주식정보 Reducer
 * @param {*} state 
 * @param {*} action 
 */
export function userReducerStockInfo(state, action){
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
 * 모니터링을 시작한다
 */
export function startMornitoring(dispatchStockInfo){
    let stockController = createController('test');
    setTimeout(() => {stockController.getData(dispatchStockInfo)}, 2000);

    // let ws = Ctr.createWebSocket(dispatchStockInfo);
    // ws.open();
}