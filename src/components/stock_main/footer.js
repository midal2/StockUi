import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection : 'column',
    minHeight: '100vh',
  },
  body: {
    flex: 1,
  },
  footer: {
    marginTop: 'auto',
  },

}))

export default function Footer(){
  const classes = useStyles();

  return (
    <div className={classes.footer}>
      footer
    </div>
  );
};
