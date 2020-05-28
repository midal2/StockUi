/**
 * INFO : props
 */
/* NODE Modules */
import React, { useState } from 'react';

/* material Modules */
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@material-ui/core';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

/* CUSTOM Style */
const useStyles = makeStyles((theme) => ({
    table: {
        flex: 'none',
        overflow : 'auto',
        // maxWidth: '100%',
    },
    table_cell: {
        fontSize: '8px',
        padding: '5px',
    },
    typography: {
        fontSize: '8px',
        padding: '5px',
    },
}));

const JenkinsDetailDialog = (props) => {
    const classes = useStyles();

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle id="scroll-dialog-title">{props.jobName} : {props.buildNumber}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    { props.detailData && (
                        <TableContainer size="small">
                            <Table className={classes.table} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.table_cell} >RESULT</TableCell>
                                        <TableCell className={classes.table_cell} align="right">DURA</TableCell>
                                        <TableCell className={classes.table_cell} align="right">DATE</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className={classes.table_cell}>
                                            <Typography className={classes.typography} color={props.detailData.status}>{props.detailData.result}</Typography>
                                        </TableCell>
                                        <TableCell className={classes.table_cell} align="right">{props.detailData.duration}</TableCell>
                                        <TableCell className={classes.table_cell} align="right">{props.detailData.timestamp}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
};


export default JenkinsDetailDialog;
