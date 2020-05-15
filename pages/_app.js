import React from "react";
import withRedux from 'next-redux-wrapper';
import { Provider } from 'react-redux'; 
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga'; // redux-saga를 생성하기 위한 라이브러리
import withReduxSaga from 'next-redux-saga'; // next와 redux-saga를 연결하기 위한 라이브러리

import reducer from '../reducers';
import rootSaga from '../sagas';

const App = ({Component, store}) => {
  return (
    <Provider store={store}>
      <Component/>
    </Provider>
  );
};

const configureStore = (initialState, options) => {
  // const middlewares = []; // 미들웨어들을 넣으면 된다.
  const sagaMiddleware = createSagaMiddleware(); // 리덕스 사가 생성
  const middlewares    = [sagaMiddleware]; // 미들웨어 연결

  const enhancer       = process.env.NODE_ENV === 'production' 
                       ? compose( applyMiddleware(...middlewares) )
                       : composeWithDevTools( applyMiddleware(...middlewares) );

  const store          = createStore(reducer, initialState, enhancer);
  store.sagaTask       = sagaMiddleware.run(rootSaga); // store에 rootSaga를 넣은 sagaMiddleware를 실행시켜준다.
  return store;

}

// 각 Component 별 getInitialProps 실행 설정
App.getInitialProps = async ( context ) => {
  console.log('context', context);
  const { ctx, Component } = context;
  
  let pageProps = {};

  if (Component.getInitialProps) {
      pageProps = await context.Component.getInitialProps(ctx); 
  }
  return {pageProps};
};


// export default withRedux(configureStore)(App); 를 아래와 같이 변경
// next가 redux 와 redux-saga가 적용되어 돌아가게 해준다.
// export default withRedux(configureStore)(App);
export default withRedux(configureStore)(withReduxSaga(App));