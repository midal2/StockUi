/**
 * ------------------------------------------------------------------------
 * NAME : sagas/index.js
 * DESC : 리덕스 비동기 처리를 위한 리덕스 사가 설정
 *        비동기 처리가 필요할 경우 CUSTOM Modules 영역에 모듈을 추가한 후 사용한다.
 * ------------------------------------------------------------------------
 * INFO : redux-saga 는 리액트/리덕스 애플리케이션의 사이드 이펙트, 
 *        예를 들면 데이터 fetching이나 브라우저 캐시에 접근하는 순수하지 않은 비동기 동작들을 
 *        더 쉽고 좋게 만드는 것을 목적으로하는 라이브러리
 * 
 * REF  : https://velog.io/@jeonghoheo/Redux-Saga%EC%9D%98-%EA%B8%B0%EB%B3%B8
 * ------------------------------------------------------------------------
 */

// NODE Modules
import { all, call } from 'redux-saga/effects';

// CUSTOM Modules
import jenkinsMain from './jenkins';
import stock from './stock';

/**
 * *과 yield 은 제네레이터 문법입니다.
 * 비동기를 처리 할 수 있게 합니다.
 * "all과 call은 saga 문법으로 all 안에 적힌 모든 saga들을 call(동기) 적으로 실행하겠다" 이런 뜻으로 이해하면 될 것 같아요.
 * fork는 비동기적으로 실행돼요.
 */
export default function* RootSaga() {
    yield all([
        call(jenkinsMain),
        call(stock),
    ])
};
/**
 * redux-saga는 비동기작업을 못 하는 redux를 비동기 작업을 할 수 있게 해주는 미들웨어이다.
 * next에서 redux-saga를 연결하려면 next-redux-saga를 설치해주고 세팅해주면 된다.
 * saga에서 REQUEST, SUCCESS, FAILURE를 액션을 만들어서 성공했을 때 처리, 실패 했을 때 에러 처리를 해주면 된다!
 */