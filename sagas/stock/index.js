import { all, fork, takeLatest, call, put } from 'redux-saga/effects';

import {LOAD_STOCK_INFOS, } from '../../reducers/stock';

function* watchLoadMain() { // takeLatest : 한번에 많은 LOAD_MAIN_REQUEST가 들어오면 마지막 요청일 때만 loadMain 함수를 실행합니다.
    yield takeLatest(LOAD_STOCK_INFOS, log);
};

function* log(action) {
    yield console.log('LOAD_STOCK_INFOS mornitoring');
}

export default function* mainSaga() {
    yield all([
        fork(watchLoadMain),
    ]);
}
