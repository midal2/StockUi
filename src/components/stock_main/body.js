import React, {Component, useReducer} from 'react';

// 공통유틸
import * as NumberUtil from '../common/number_util';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// 확장패널용
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// nivo(차트)
import { ResponsiveLine } from '@nivo/line';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flex: 'none',
    overflow : 'auto',
    maxWidth: '99%' 
  },
  paperAll: {
    flexGrow: 1,
    maxHeight: '90vh',
    overflow : 'auto',
    minWidth: 98,
  },
  paper: {
    height: 100,
    minWidth: 100,
  },
  paper2: {
    height: 100,
    minWidth: 300,
    flexItem: true,
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
    width: '100%',
  },
}));

const data = () => {return [
  {
    "id": "japan",
    "color": "hsl(128, 70%, 50%)",
    "data": [
      {
        "x": "plane",
        "y": NumberUtil.getRandomNumber(100)
      },
      {
        "x": "helicopter",
        "y": NumberUtil.getRandomNumber(100)
      },
      {
        "x": "boat",
        "y": NumberUtil.getRandomNumber(100)
      },
      {
        "x": "boat1",
        "y": NumberUtil.getRandomNumber(100)
      },
      {
        "x": "plane1",
        "y": NumberUtil.getRandomNumber(100)
      },
      {
        "x": "helicopter2",
        "y": NumberUtil.getRandomNumber(100)
      },
      {
        "x": "boat3",
        "y": NumberUtil.getRandomNumber(100)
      },
      {
        "x": "boat12",
        "y": NumberUtil.getRandomNumber(100)
      },
      {
        "x": "boat31",
        "y": NumberUtil.getRandomNumber(100)
      },
      {
        "x": "boat123",
        "y": NumberUtil.getRandomNumber(100)
      },
    ]
  },
  
]}

const MyResponsiveLine = ({ data /* see data tab */ }) => (
  <ResponsiveLine
      data={data}
      margin={{ top: 5, right: 5, bottom: 5, left: 20 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
      axisTop={null}
      axisRight={null}
      axisBottom={null}
      axisLeft={{
          orient: 'left',
          tickSize: 0,
          tickPadding: 0,
          tickRotation: 0,
          legend: 'count',
          legendOffset: -40,
          legendPosition: 'middle'
      }}
      colors={{ scheme: 'nivo' }}
      enablePoints={false}
      enableGridX={false}
      enableGridY={true}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
          {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                  {
                      on: 'hover',
                      style: {
                          itemBackground: 'rgba(0, 0, 0, .03)',
                          itemOpacity: 1
                      }
                  }
              ]
          }
      ]}
  />
)

export default function Body({stockInfos}){
  const classes = useStyles();

  return (
          <Paper className={classes.paperAll}>
            <Grid container className={classes.root} spacing={1} direction="column">
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
                            { MyResponsiveLine({data:data()}) }
                          </Paper>
                          <Paper  className={classes.paper2} xs={11} elevation={1}>
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
          </Paper>
  );
};
