import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Title from './title';
import Table from './table';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

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

function test2(){
  return{
    type : 'STOCK',
    payload : 'test',
  }
}

const StockList2 = ({test}) => {
  const classes = useStyles();

  return (
    <div>
      <Title/>
      <Table/>
      <div>
        <Button onClick={test} variant="contained" color="primary" fullWidth={true} className={classes.button}>
          데이터
          {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
      programs : state.programs
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
                            test:test2
                            }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StockList2)
