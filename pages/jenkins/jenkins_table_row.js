/**
 * INFO : props
 *        TableCell
 *        - name   : String
 *        - number : String
 */

/* NODE Modules */
import React from 'react';

/* material Modules */
import { TableCell, TableRow } from '@material-ui/core';

const JenkinsTableRow = (props) => {
    return (
        <TableRow key={props.name}>
            <TableCell component="th" scope="row">{props.name}</TableCell>
            <TableCell align="right">{props.number}</TableCell>
        </TableRow>
    );
};

export default JenkinsTableRow;
