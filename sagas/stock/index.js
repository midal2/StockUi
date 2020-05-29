/**
 * ------------------------------------------------------------------------
 * NAME : sagas/stock/index.js
 * DESC : 주식메인화면 사가정보
 * ------------------------------------------------------------------------
 * INFO : 
 * REF  :
 * ------------------------------------------------------------------------
 */

 //환경설정 및 유틸
import Config from '../../config';
import * as ObjectUtil from '../../modules/common/util/object_util';

//Module
import * as StockModule from '../../modules/stock';

//Saga
import { all, fork, takeLatest, call, put, select } from 'redux-saga/effects';

//Reducer
import {loadStockInfoAction, LOAD_STOCK_INFO_TEST, REQUEST_STOCK_INFO} from '../../reducers/stock';
import {loadStockItemsAction, ADD_STOCK_ITEM, LOAD_STOCK_ITEM} from '../../reducers/stockItem';

//테스트
import * as Test from '../../modules/common/test/stock_main_test';

function* watchLoadMain() { 
    yield takeLatest(LOAD_STOCK_ITEM, adjustStockItem);         //주식항목정보가 로딩된경우 수행
    yield takeLatest(ADD_STOCK_ITEM, refreshStockInfo);         //주식항목정보가 로딩된경우 수행
    yield takeLatest(LOAD_STOCK_INFO_TEST, adjustStockInfo);    //주식정보가 추가되면 추가를 기반으로 갱신한다
    yield takeLatest(REQUEST_STOCK_INFO, requestStokInfo);      //주식상세내역요청
};

/**
 * 주식정보를 추가한다
 * @param {stockItem} action 
 */
function* refreshStockInfo(action){
    //Step 주식항목정보를 로딩
    let stockItem = yield select(state => {
        return state.stockItem;
    });

    //Step 화면표시된 주식정보를 로딩
    let stock = yield select(state => {
        return state.stock;
    });   

    //Step 추가로 등록된 주식항목을 추가
    stockItem.forEach(element => {
        let isAddedItem = false;
        for(var i in stock){
          if (element.stockCd == stock[i].stockCd){
            isAddedItem = true;
            break;  
          }
        } 
        
        if (!isAddedItem){
            stock.push(element);
        } 
    });

    yield put(loadStockInfoAction(stock));
}

/**
 * 주식항목정보로딩 후처리 보정
 * @param {stockItem} action 
 */
function* adjustStockItem(action){
    //Step 주식항목정보를 로딩
    let stockItem = yield select(state => {
        return state.stockItem;
    });

    // Step 주식항목정보가 없는경우(주식항목정보를 재등록)
    if (ObjectUtil.isEmpty(stockItem)){ 
        stockItem = Config.STOCK_ITEM;
        yield put(loadStockItemsAction(stockItem)); 
    }
}

/**
 * 테스트일경우 주식정보를 보정한다
 * @param {*} action 
 */
function* adjustStockInfo(action){
    let stockItem = yield select(state => {
        return state.stockItem;
    });

    yield put(loadStockInfoAction(Test.stock.refreshDummyData(stockItem)));
}

/**
 * 주식상세내역 요청
 */
function* requestStokInfo(){
    let stockItem = yield select(state => {
        return state.stockItem;
    });

    yield StockModule.getStockInfo(stockItem);
}

export default function* mainSaga() {
    yield all([
        fork(watchLoadMain),
    ]);
}
