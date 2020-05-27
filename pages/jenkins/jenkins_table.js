/**
 * INFO : props
 *        CardHeader
 *        - title     : String
 *        - subheader : String
 *        CardContent
 *        - content   : String
 *        Collapse
 *        - builds    : List
 */
/* NODE Modules */
import React from 'react';

/* material Modules */
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

/* CUSTOM Style */
const useStyles = makeStyles((theme) => ({
    table: {
        flex: 'none',
        overflow : 'auto',
        // maxWidth: '100%',
    },
}));

const JenkinsTable = (props) => {
    const classes = useStyles();

    return (
        <TableContainer size="small" component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>NAME</TableCell>
                    <TableCell align="right">NUMBER</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {props.children}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default JenkinsTable;
