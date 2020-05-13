import React, {Component, useReducer} from 'react'; //리액트공통
import * as NumberUtil from '../../common/number_util'; // 공통유틸

//Material Component
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

//메뉴추가
import CustomizedMenus from './customMenu';

import LinearProgress from '@material-ui/core/LinearProgress';

//Test
import * as Test from '../../common/stock_main/test';

const useStyles = makeStyles((theme) => ({
  div_root: {
    // flexGrow: 1,
    // display: 'flex',
    flex: 'none',
    maxHeight: '88vh',
    overflow : 'auto',
    minWidth:  '100%',    
  },

  expansionPanel: {
    border: '0px',
    width: '100%',
  },

  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },

  grid_root: {
    flex: 'none',
    overflow : 'auto',
    maxWidth: '100%',
  },

  grid_content: {
    flexWrap: 'nowrap',
  },

  paper_data: {
    maxWidth: '100%',
    flexItem: true,
    flexGrow: 1,
  },

  paper_chart: {
    height: 100,
    minWidth: 100,
  },

  chip: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(0.1),
    },
  },

  circularProgress: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },

}));

export default function Body({stockInfos}){
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
          <div className={classes.div_root} key={"body"}>
            {/* {stockInfos==null && <LinearProgress variant="query" color="secondary" />} */}
            <Grid container className={classes.grid_root} direction="column">
              {stockInfos!=null && stockInfos.map((stockInfo)=>(
                <ExpansionPanel key={stockInfo.stockName} className={classes.expansionPanel}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid item className={classes.grid_content} item container spacing={0} >
                      <Paper  className={classes.paper_chart} elevation={0}>
                        { MyResponsiveLine({data:Test.stock.createChartData()}) }
                      </Paper>
                      <Paper className={classes.paper_data} elevation={0}>
                        <Typography gutterBottom variant="h6" component="h2">
                        {stockInfo.stockName}({stockInfo.stockCd}) 
                        </Typography>
                        <Typography gutterBottom variant="body2" color="textSecondary" > 
                          {stockInfo.stockNowValue} {stockInfo.stockIncDecSign} {stockInfo.stockIncDecValue} ({stockInfo.stockIncDecRate}%) {stockInfo.stockTime}
                        </Typography> 
                        <div className={classes.chip} >
                          {stockInfo.stockStatusList.map((stockStatus)=>(
                            <Chip key={stockStatus.summary + NumberUtil.getRandomNumber(200)} variant="outlined" size="small" label={stockStatus.summary} color={NumberUtil.getRandomNumber(2) == 2? 'primary' : 'secondary'} />
                          ))}
                        </div>
                      </Paper>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                      <div>
                      {stockInfo.stockStatusList.map((stockStatus)=>(
                        <Typography key={stockStatus.summary + NumberUtil.getRandomNumber(200)}>
                        {stockStatus.summary}:{stockStatus.value}
                        </Typography>
                      ))}
                      </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
            </Grid>
            <Fab className={classes.fab} color="primary" aria-label="add" onClick={handleClick}>
              <AddIcon />
            </Fab>
            <CustomizedMenus anchorEl={anchorEl} handleClose={handleClose}/>
          </div>
  );
};
