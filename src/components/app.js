import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//react material을 추가하기 위한 부분
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//component 구간
import StockList from './stock_list/index';
import DashBoard from './dashboard/index';
import StockDetail from './stock_detail/index';
import StockMain from './stock_main/index';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Route exact path="/test" component={DashBoard}/>
          <Route exact path="/stock_detail/:rownum" component={StockDetail}/>
          <Route exact path="/stockList" component={StockList}/>
          <Route exact path="/" component={StockMain}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
