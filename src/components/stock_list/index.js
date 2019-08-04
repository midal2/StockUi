import React, {Component, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Title from './title';
import Table from './table';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';

import * as stock from '../../actions/stock';
import SelectedStockInfo from './selected_stock_info';
import {Client} from '@stomp/stompjs';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  }
}))

const nowTime = () => {
  var time = new Date();
  return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
}

const createStockController = (mode = 'real') => {
  switch (mode) {
    case 'test': //테스트용으로 사용
      return {
        getData: (callBackFn) => {
          let i = 0;
          let data = new Array();
          for (i = 0; i < 30; i++) {
            data.push({
              title: '주식' + (
              i + 1),
              nowPrice: '65000',
              time: nowTime(),
              differAmt: '1000'
            });
          }
          callBackFn(data);
        }
      }
      break;
    case 'real': //실제서비스호출용으로 사용
      return {
        getData: (callBackFn) => {
          axios.get('http://localhost:9000/stock/getStockList', {
            timeout: '10000',
            params: {},
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
          }).then(response => {
            // console.dir(response.data);
            return; //의도적으로 주석처리
            var stockData = new Array();
            response.data.forEach((element, idx) => {
              const {title, nowPrice, time, differAmt} = element;
              var stockObj = { // ES6 의 object-shorthand 기법
                title,
                nowPrice,
                time,
                differAmt
              }
              stockData.push(stockObj);
            });

            // console.log(stockData);
            // callBackFn(stockData);
          }).catch(function(error) {
            console.log("error" + error);
          });
        }
      }
      break;
    default:
      break;
  }
}

//UI메인
const StockList = (props) => {

  let {actionStockData, stocks} = props;
  const classes = useStyles();
  const stockController = createStockController(); //'test' 지정시 dummy 데이터

  //자동타이머
  let isStoped = false;
  const startLoopStockInfo = () => {
    setTimeout(() => {
      if (isStoped) {
        return;
      };
      stockController.getData(actionStockData);
      startLoopStockInfo();
    }, 5000);
  }

  //마운트시 실행
  useEffect(() => {
    if (!isStoped) {
      //startLoopStockInfo();
    };

    //웹소켓설정
    const client = new Client();

    let subscription;
    client.configure({
      brokerURL: 'ws://localhost:9000/stockInfo/websocket',
      onConnect: () => {
        console.log('onConnect');

        subscription = client.subscribe('/topic/stockInfo', message => {
          console.log('receive msg#11##:' + message);
          var bodyMsg = JSON.parse(message.body);
          console.dir(bodyMsg);
          if (bodyMsg.payload != undefined){
            console.log('receive msg22###:' + bodyMsg.payload);
            return;
          }
          var stockData = new Array();
          bodyMsg.forEach((element, idx) => {
            const {title, stockCd, nowPrice, time, differAmt} = element;
            var stockObj = { // ES6 의 object-shorthand 기법
              title,
              stockCd,
              nowPrice,
              time,
              differAmt
            }
            stockData.push(stockObj);
          })
          actionStockData(stockData);
        })

        client.publish({destination: "/app/stocktest", body: "Hello, STOMP"});
      },
      // Helps during debugging, remove in production
      debug: (str) => {
        console.log(new Date(), str);
      }
    });

    // client.onConnect(() => {
    //   console.log('onConnect');
    //   client.subscribe('/topic/stockInfo', message => {
    //     console.log(message);
    //   })
    //   client.publish({destination: "/app/stockInfo", body: "Hello, STOMP"});
    // });

    client.activate();
    console.dir(client);

    return() => {
      if (subscription != undefined){
        subscription.unsubscribe();
      }
      isStoped = true;
    }; //언마운트 될때 정리할 함수
  }, []);

  return (<div>
    <Title/>
    <Table props={props} stocks={stocks}/>
    <div>
      <Button variant="contained" color="primary" fullWidth={true} className={classes.button}>
        데이터
        <Icon className={classes.rightIcon}>send</Icon>
      </Button>
    </div>
    <SelectedStockInfo/>
  </div>);
}

const mapStateToProps = state => {
  return {programs: state.programs, stocks: state.stocks}
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionStockData: stock.actionStockData,
    actionSelectStockData: stock.actionSelectStockData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList)
