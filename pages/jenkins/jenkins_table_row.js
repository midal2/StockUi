/**
 * INFO : props
 *        TableCell
 *        - name   : String
 *        - number : String
 */

/* NODE Modules */
import React from 'react';

/* material Modules */
import { makeStyles } from '@material-ui/core/styles';
import { TableCell, TableRow } from '@material-ui/core';
import { Typography } from '@material-ui/core';

/* CUSTOM Style */
const useStyles = makeStyles((theme) => ({
    table_cell: {
        fontSize: '8px',
        padding: '5px',
    },
    typography: {
        fontSize: '8px',
        padding: '5px',
    },
}));

const JenkinsTableRow = (props) => {
    const classes = useStyles();
    
    return (
        <TableRow key={props.name}>
            <TableCell className={classes.table_cell} component="th" scope="row">
                {props.name}
            </TableCell>
            <TableCell className={classes.table_cell} align="right">
                {props.summaryInfo.number}
            </TableCell>
            <TableCell className={classes.table_cell} align="right">
                {props.summaryInfo.duration}
            </TableCell>
            <TableCell className={classes.table_cell} align="right">
                {props.summaryInfo.timestamp}
            </TableCell>
            <TableCell className={classes.table_cell} align="right">
                <Typography className={classes.typography} color={props.summaryInfo.status}>{props.summaryInfo.result}</Typography>
            </TableCell>
        </TableRow>
    );
};

export default JenkinsTableRow;
