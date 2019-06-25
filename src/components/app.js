import React, { Component } from 'react';
import { Route } from 'react-router-dom';

//react material을 추가하기 위한 부분
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

//component 구간
import DashBoard from './dashboard';
import Programs from './programs';
import StockList from './stock_list';

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Route exact path="/" component={DashBoard}/>
          <Route exact path="/test" component={StockList}/>
        </div>
      </MuiThemeProvider>
    );
  }
}
