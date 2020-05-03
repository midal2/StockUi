import React, {Component, useReducer} from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import * as NumberUtil from '../common/number_util';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 100,
    width: 100,
  },
  paper2: {
    height: 100,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
  chip: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Body({stockInfos}){
  const classes = useStyles();

  return (
      <Grid container className={classes.root} spacing={1} direction="column">
        {stockInfos.map((stockInfo)=>(
            <Grid item container spacing={0} direction="column">
              <Grid item container spacing={0} >
                <Paper className={classes.paper} xs={1}>
                  차트 놓일 장소
                </Paper>
                <Paper className={classes.paper2} xs={11}>
                  <Typography gutterBottom variant="h5" component="h2">
                  {stockInfo.stockName}({stockInfo.stockCd}) 
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" > 
                    {stockInfo.stockNowValue} {stockInfo.stockIncDecSign} {stockInfo.stockIncDecValue} ({stockInfo.stockIncDecRate}%)  <div style={{display:"inline"}}>{stockInfo.stockTime}</div>
                  </Typography>
                  {stockInfo.stockStatusList.map((stockStatus)=>(
                    <Chip variant="outlined" size="small" label={stockStatus.summary} color={NumberUtil.getRandomNumber(2) == 2? 'primary' : 'sencondary'} />
                  ))}
                </Paper>
              </Grid>
            </Grid>
        ))}
      </Grid>
  );
};
