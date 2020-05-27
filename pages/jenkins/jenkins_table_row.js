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

/* CUSTOM Style */
const useStyles = makeStyles((theme) => ({
    table_cell: {
        fontSize: '8px',
        padding: '5px',
    },
}));

const JenkinsTableRow = (props) => {
    const classes = useStyles();
    
    return (
        <TableRow key={props.name}>
            <TableCell className={classes.table_cell} component="th" scope="row">{props.name}</TableCell>
            <TableCell className={classes.table_cell} align="right">{props.number}</TableCell>
        </TableRow>
    );
};

export default JenkinsTableRow;
