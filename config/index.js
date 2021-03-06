/**
 * ------------------------------------------------------------------------
 * NAME : config/index.js
 * DESC : 환경변수목록
 * ------------------------------------------------------------------------
 * INFO : 환경변수 사용이 필요할경우 아래의 형태로 환경값을 추가
 * 
 * DEFAULT : 기본값(운영)-필수
 * TEST    : 테스트환경값(미구성시 DEFAULT가 사용됨)
 * 
 * ex)
 * "Variable" : { DEFAULT  : "Value"   //기본값(운영)-필수
 *                DEV      : "Value"   //개발(미구성시 DEFAULT가 사용됨)
 *              }
 * REF  :
 * ------------------------------------------------------------------------
 */
import getConfig from 'next/config';

var config={
    STOCK_MONITORING_MODE: //모니터링모드(TEST[가상] or REAL[실제AP통신])
    {
        DEFAULT :'TEST',
    },

    STOCK_MONITORING_PERIOD: //모니터링주시(1000=1초)
    {
        DEFAULT :'10000',
    },

    STOCK_ITEM: //주식항목정보(모니터링대상)
    {
        DEFAULT : [
            { title: '테스트1', stockCd: '053580' },
            { title: '테스트2', stockCd: '067160' }, 
            { title: '테스트3', stockCd: '068279' },
            { title: '테스트4', stockCd: '068769' }, 
        ]
    },

    STOCK_LIST: //주식목록정보(전체주식목록)
    {
        DEFAULT : [
            { title: '웹케시'      , stockCd: '053580' },
            { title: '셀트리온'     , stockCd: '068270' },
            { title: '셀트리온제약'  , stockCd: '068760' }, 
            { title: '아프리카TV'   , stockCd: '067160' }, 
          ]
    },

    STOCK_WEBSOCKET_URL: //StockAp 모니터링용 URL정보
    { 
        DEFAULT :'http://3.23.207.139:8080',
        DEV     :'http://0.0.0.0:8080',
    },

    STOCK_SERVICE_URL: //StockAp 서비스용 URL정보
    { 
        DEFAULT :'http://3.34.36.200:8888',
        DEV     :'http://0.0.0.0:8888',
    },   
    JENKINS_SERVICE_URL: // Jenkins 정보 조회 서비스 (StockAp) URL 정보
    {
        DEFAULT :'http://3.23.207.139:8080',
        DEV     :'http://3.23.207.139:8080',
    },
    
}

export default (()=>{
    let {publicRuntimeConfig} =  getConfig();
    let _NODE_ENV = publicRuntimeConfig.NODE_ENV; //NODE_ENV는 npm run 실행시 정의된 Script의 NODE_ENV값임

    let mode = _NODE_ENV == 'DEV' ? 'DEV' : 'DEFAULT'; 
    
    let _config = {NODE_ENV : mode}; // config생성시작
    for(var prop in config){
        if (config[prop][mode] == undefined){ //별도 설정값을 추가하지 않은경우 기본값(DEFAULT)으로 읽도록 유도
            _config[prop] = config[prop]['DEFAULT'];    
        }else{
            _config[prop] = config[prop][mode];
        }
    }

    return _config;
})()