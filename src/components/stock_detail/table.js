import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 200,
  },
}));

export default function DenseTable({props, stocks}){
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell>종목명</TableCell>
              <TableCell align="right">시간</TableCell>
              <TableCell align="right">현재가격</TableCell>
              <TableCell align="right">등락폭</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map(row => (
              <TableRow key={row.title}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{row.nowPrice}</TableCell>
                <TableCell align="right">{row.differAmt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
