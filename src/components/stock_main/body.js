import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    maxWidth: 500,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function Body(){
  const [spacing, setSpacing] = React.useState(0);
  const classes = useStyles();

  return (
      <Grid container className={classes.root} spacing={2} direction="column">
        {[0, 1, 2].map((value)=>(
            <Grid item container spacing={0} >
              <Grid item container spacing={0} >
                <Grid item key={value}>
                  <Paper className={classes.paper} />
                </Grid>
                <Grid item key={value} >
                  <Paper className={classes.paper} />
                </Grid>
              </Grid>
              <Grid item container spacing={0} >
                <Grid item key={value}>
                  <Paper className={classes.paper} />
                </Grid>
              </Grid>
            </Grid>
        ))}
      </Grid>
  );
};
