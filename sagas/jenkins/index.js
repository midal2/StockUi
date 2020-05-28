/**
 * ------------------------------------------------------------------------
 * NAME : sagas/jenkins/index.js
 * DESC : 젠킨스 메인 관련 리덕스 사가 설정
 * ------------------------------------------------------------------------
 * INFO : StockAp API 호출
 * REF  : https://wlsdud2194.github.io/posts/CORS-%ED%81%AC%EB%A1%9C%EC%8A%A4-%EB%8F%84%EB%A9%94%EC%9D%B8-%EC%9D%B4%EC%8A%88/
 * ------------------------------------------------------------------------
 */

// NODE Modules
import axios from 'axios';
import { all, fork, takeLatest, call, put } from 'redux-saga/effects';

// CUSTOM Modules
import { LOAD_MAIN_REQUEST, loadMainSuccessAction, loadMainFailureAction } from '../../reducers/jenkins';
import JenKinsAPI from '../../modules/jenkins_api';


function* watchLoadMain() { // takeLatest : 한번에 많은 LOAD_MAIN_REQUEST가 들어오면 마지막 요청일 때만 loadMain 함수를 실행합니다.
    yield takeLatest(LOAD_MAIN_REQUEST, loadMain);
};

function* loadMain(action) {
    try { // call로 loadMainAPI 를 실행합니다. 인자로 action.data를 넘깁니다. call대신 fork를 쓰면 비동기적으로 지나가버려서 result에 값이 없어서 에러가 납니다.
        // const result = yield call(loadMainAPI, action.data);
        const result = yield call(JenKinsAPI.retrieveBuildsInfo, action.data);
        console.log(' :: loadMain :: result :: ', result, ' :: action :: ', action);
        yield put(loadMainSuccessAction(result.data));
    }  // put은 dispatch와 같은 역할을 합니다. 결과의 data를 Success로 보내줍니다.
    catch (e) {
        console.error(e);
        yield put(loadMainFailureAction(e));
    }
};

/**
 * *과 yield 은 제네레이터 문법입니다.
 * 비동기를 처리 할 수 있게 합니다.
 * 
 * "all과 call은 saga 문법으로 all 안에 적힌 모든 saga들을 call(동기) 적으로 실행하겠다" 
 * 이런 뜻으로 이해하면 될 것 같아요.
 * 
 * fork는 비동기적으로 실행돼요.
 */
export default function* mainSaga() {
    yield all([ // watchLoadPosts를 비동기적으로 실행합니다. 밑에 더 많은 함수들을 적을 수 있어요.
        fork(watchLoadMain),
    ]);
};