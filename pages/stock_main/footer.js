import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: 'auto',
    height: '100',
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
