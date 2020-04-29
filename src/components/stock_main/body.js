import React, {Component, useReducer} from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 70,
    width: 100,
  },
  paper2: {
    height: 70,
    width: 300,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Body({stockInfos}){
  const classes = useStyles();

  return (
      <Grid container className={classes.root} spacing={2} direction="column">
        {stockInfos.map((stockInfo)=>(
            <Grid item container spacing={0} direction="column">
              <Grid item container spacing={0} >
                <Paper className={classes.paper} xs={1}>
                  차트 놓일 장소
                </Paper>
                <Paper className={classes.paper2} xs={11}>
                  <Typography gutterBottom variant="subtitle1">
                    {stockInfo.stockName}<div style={{display:"inline"}}>{stockInfo.stockTime}</div>
                  </Typography>
                  <Typography gutterBottom variant="subtitle1">
                    {stockInfo.stockNowValue} {stockInfo.stockIncDecSign} {stockInfo.stockIncDecValue} ({stockInfo.stockIncDecRate}%)
                  </Typography>
                </Paper>
              </Grid>
              <Grid item spacing={0} >
                <Typography gutterBottom variant="subtitle1">
                  Standard license
                </Typography>
              </Grid>
            </Grid>
        ))}
      </Grid>
  );
};
