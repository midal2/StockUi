import { all, fork, takeLatest, call, put, select } from 'redux-saga/effects';

import {loadStockAction, ADD_STOCK_INFO} from '../../reducers/stock';

//테스트
import * as Test from '../../common/test/stock_main_test';

function* watchLoadMain() { // takeLatest : 한번에 많은 LOAD_MAIN_REQUEST가 들어오면 마지막 요청일 때만 loadMain 함수를 실행합니다.
    yield takeLatest(ADD_STOCK_INFO, reloadStockInfos); //주식정보가 추가되면 추가를 기반으로 갱신한다
};

function* reloadStockInfos(action) {
    const stock = yield select(state => {
        return state.stock;
    });
    yield put(loadStockAction(Test.stock.refreshDummyData(stock)));
}

export default function* mainSaga() {
    yield all([
        fork(watchLoadMain),
    ]);
}
