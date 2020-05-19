/**
 * ------------------------------------------------------------------------
 * NAME : /pages/stock/index.js
 * DESC : 주식정보 확인 DashBoard
 * ------------------------------------------------------------------------
 * INFO :
 * REF  :
 * ------------------------------------------------------------------------
 */

//리액트&리덕스
import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

//컨트롤러
import * as Ctr from '../../controller/stock';

//UI
import { makeStyles } from '@material-ui/core/styles'; //MaterialUi Style
import BorderDrawer from '../../components/border'; // app bar & drawer
import Body from './body'; //메인화면

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
  const dispatch = useDispatch();
  const stockInfos = useSelector((state) => state.stock);

  Ctr.startMornitoring._stockInfos = stockInfos; //추가된주식정보를 반영(테스트를 위한 용도임)

  //마운트시 실행
  useEffect(() => {
    Ctr.startMornitoring(dispatch); //모니터링 시작
  }, []);

  const classes = useStyles();

  return (
      <BorderDrawer className={classes.root}>
        <Body stockInfos={stockInfos}></Body>
      </BorderDrawer>
  )
}
