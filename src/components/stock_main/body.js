import React, {Component, useReducer} from 'react';

// 공통유틸
import * as NumberUtil from '../common/number_util';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

//하단FAB  버튼
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

// 확장패널용
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//Nivo 차트
import MyResponsiveLine from './MyRespnsiveLine';

//Test
import * as Test from './test';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 'none',
    overflow : 'auto',
    maxWidth: '99%' 
  },
  paperAll: {
    // flexGrow: 1,
    maxHeight: '90vh',
    overflow : 'auto',
    minWidth: 98,
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
  expansionPanel: {
    width: '99%',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },

  div_root: {
    // flexGrow: 1,
    maxHeight: '90vh',
    overflow : 'auto',
    minWidth: 98,    
  },

  grid_root: {
    display: 'flex',
    flex: 'none',
    overflow : 'auto',
    maxWidth: '99%' 
  },

  paper_data: {
    // height: 100,
    minWidth: 250,
    flexItem: true,
    flexGrow: 1,
  },

  paper: {
    height: 100,
    minWidth: 100,
  },

  chip: {
    maxWidth: 260,
  }

}));

export default function Body({stockInfos}){
  const classes = useStyles();

  return (
          <div className={classes.div_root}>
            <Grid container className={classes.grid_root} spacing={1} direction="column">
              {stockInfos.map((stockInfo)=>(
                <Grid  item container spacing={0} direction="column">
                  <div className={classes.expansionPanel}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Grid  item container spacing={0} >
                          <Paper  className={classes.paper} xs={1} elevation={0}>
                            { MyResponsiveLine({data:Test.stock.createChartData()}) }
                          </Paper>
                          <Paper className={classes.paper_data} xs={11} elevation={1}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {stockInfo.stockName}({stockInfo.stockCd}) 
                            </Typography>
                            <Typography gutterBottom variant="body2" color="textSecondary" > 
                              {stockInfo.stockNowValue} {stockInfo.stockIncDecSign} {stockInfo.stockIncDecValue} ({stockInfo.stockIncDecRate}%)  <div style={{display:"inline"}}>{stockInfo.stockTime}</div>
                            </Typography>
                            <div className={classes.chip}>
                              {stockInfo.stockStatusList.map((stockStatus)=>(
                                <Chip variant="outlined" size="small" label={stockStatus.summary} color={NumberUtil.getRandomNumber(2) == 2? 'primary' : 'sencondary'} />
                              ))}
                            </div>
                          </Paper>
                        </Grid>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <Typography>
                          {stockInfo.stockStatusList.map((stockStatus)=>(
                            <div>{stockStatus.summary}:{stockStatus.value}</div>
                          ))}
                        </Typography>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </Grid>
              ))}
            </Grid>
            <Fab className={classes.fab} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
  );
};
