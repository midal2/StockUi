/* NODE Modules */
import React from 'react';

/* material Modules */
import { makeStyles } from '@material-ui/core/styles';

/* CUSTOM Modules */
import BorderDrawer from '../../components/border';

/* CUSTOM Style */
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
}));

/**
 * -----------------------------------
 * jenkins_main index.js - Index
 * -----------------------------------
 * 
 * -----------------------------------
*/
export default function index(){
  const classes = useStyles();

  return (
      <div className={classes.root}>
          <BorderDrawer>
              <h1 className='example'>JENKINS MAIN</h1>
          </BorderDrawer>
      </div>
  )
}
