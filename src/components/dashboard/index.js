import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import {browserHistory} from 'react-router';
import selectProgram from '../../actions/index';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Programs from './programs';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 100,
    height: 450,
    overflowY: 'auto',
  },
};

function test2(history){
  //history.push('/test');

  return{
    type : 'PROGRAM_SELECTED',
    payload : 'test',
  }
};

const nowTime = ()=>{
    var time = new Date();
    return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds();
}

const DashBoard = ({test, history}) => (
  <div>
    <Card>
      <CardMedia
        overlay={<CardTitle title={nowTime()} subtitle="이시각 주식 상황" />}
      >
        <img src="src/resource/img/main_dashboard.png" style={styles.gridList} alt="" />
      </CardMedia>
      <CardTitle title="주요이슈상황" subtitle="등락폭/급상승" />
      <CardText>
        오늘 등락폭 변동이 심한 주식내역들 : 1개<br/>
        최근 한달동안 계속 상승하고 있는 내역들 : 5개<br/>
        최근 한달동안 계속 하락하는 내역들 : 4개
      </CardText>
      <CardActions>
        <FlatButton label="어떤걸 여기에 넣을까?(불필요시 삭제)1" onClick={()=>{test(history)}}/>
        <FlatButton label="어떤걸 여기에 넣을까?(불필요시 삭제)">
          <Link to="/test">여기어떤</Link>
        </FlatButton>
      </CardActions>
    </Card>

    <Programs/>
  </div>
);

const mapDispatchToProps = dispatch => {
  return  bindActionCreators({test:test2},dispatch);
};

function mapStateToProps(state){
  return {
    programs : state.programs
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
