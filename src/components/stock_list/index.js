import React, {Component, useEffect} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Title from './title';
import Table from './table';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import * as stock from '../../actions/stock';
import SelectedStockInfo from './selected_stock_info';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  leftIcon: {
    marginRight: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconSmall: {
    fontSize: 20,
  },
}))

const nowTime = ()=>{
    var time = new Date();
    return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
}

//주식정보를 가져온다 임시
const createDummyData = (callbackFn) => {
  let data = [{
      title: '주식333',
      nowPrice: '65000',
      time: nowTime(),
      differAmt: '1000',
    },
    {
      title: '주식2',
      nowPrice: '65000',
      time: '13:45',
      differAmt: '1000',
    },
    {
      title: '주식3',
      nowPrice: '65000',
      time: nowTime(),
      differAmt: '1000',
    },
    {
      title: '주식4',
      nowPrice: '65000',
      time: '13:45',
      differAmt: '1000',
    },
  ];

  callbackFn(data);
}

//주식정보를 가져온다
const getStockData = (callbackFn) => {
  axios.get('http://localhost:9000/stock/getAllInfo', {
    timeout: '10000',
    params: {},
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    }
  })
  .then(response => {
    // console.dir(response.data[0]);
    let data = response.data[0].TBL_TimeConclude.TBL_TimeConclude;
    let titleDesc = response.data[0].TBL_StockInfo.JongName;
    var stockData = new Array();
    data.forEach((element, idx)=>{
      // console.log(element);
      var stockObj = {
        title: titleDesc + idx,
        nowPrice: element.negoprice,
        time: element.time,
        differAmt: element.Debi
      }
      // console.log(stockObj);
      stockData.push(stockObj);
    });

    console.log(stockData);
    callbackFn(stockData);
  }).catch(function(error) {
    console.log("error" + error);
  });
}

//UI메인
const StockList = (prop) => {
  const classes = useStyles();

  const getData = (mode='default') => {
    const data = (mode == 'test') ? createDummyData(prop.actionStockData) : getStockData(prop.actionStockData);
  }

  //자동타이머
  const startLoopStockInfo = () => {
    setTimeout(() => {
      getData('test'); //'test' 지정시 dummy 데이터
      startLoopStockInfo();
    }, 5000);
  }

  //마운트시 실행
  useEffect(startLoopStockInfo,[]);

  return (
    <div>
      <Title/>
      <Table stocks={prop.stocks}/>
      <div>
        <Button variant="contained" color="primary" fullWidth={true} className={classes.button}>
          데이터
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </div>
      <SelectedStockInfo/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      programs : state.programs,
      stocks : state.stocks,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
                            actionStockData:stock.actionStockData,
                            }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList)
