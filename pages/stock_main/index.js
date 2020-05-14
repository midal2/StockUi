//리액트 공통
import React, {Component, useEffect, useReducer} from 'react';

//MaterialUi
import { makeStyles } from '@material-ui/core/styles';

//커스텀컴포넌트
// CUSTOM Modules
import BorderDrawer from '../../components/border'; // app bar & drawer
import Title from './title'; //타이틀바
import Body from './body'; //컨텐츠
import Footer from './footer'; //하단바

//컨트롤러 및 테스트
import * as Ctr from '../../controller/stock_main/index';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection : 'column',
    minHeight: '98vh',
  },
  body: {
    flex: 1,
  },
  footer: {
    height:'100',
    marginTop: 'auto',
    background: '#333'
  },

}))

export default function index(){
  /*
  stockInfo
  -----------------------------------
  stockTime : string '주식확인시간'
  stockName : string '주식명'
  stockCd   : string '주식코드'
  stockNowVal,ue : number '주식현재가'
  stockIncDecValue : number '증감금액'
  stockIncDecSign : string '부호( + or ▼ )'
  stockIncDecRate : number '증감비율(%)'
  stockStatusList : array '주식상황목록' 
                [ 
                    stockStatus 
                    ----------------
                    summary : string '상태요약메세지'
                    value : string '세부상태명'
                ]
  */
  const [stockInfos, dispatchStockInfo] = useReducer(Ctr.userReducerStockInfo, null)

  //마운트시 실행
  useEffect(() => {
    Ctr.startMornitoring(dispatchStockInfo); //모니터링 시작
  }, []);

  const classes = useStyles();

  return (
      <BorderDrawer className={classes.root}>
        <Body stockInfos={stockInfos}></Body>
      </BorderDrawer>
  )
}
