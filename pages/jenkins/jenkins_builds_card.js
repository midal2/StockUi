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
import clsx from 'clsx';

/* material Modules */
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, Avatar, CardContent, CardActions, IconButton, Collapse, Typography } from '@material-ui/core';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

/* CUSTOM Modules */
import JenkinsTable    from './jenkins_table';
import JenkinsTableRow from './jenkins_table_row';

/* CUSTOM Style */
const useStyles = makeStyles((theme) => ({
    div_root: {
        maxWidth: 360,
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    div_table: {
        padding: '0px',
        border: '0px',
        width: '100%',
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    table_cell: {
        fontSize: '8px',
        padding: '5px',
    },
}));

const JenkinsBuildsCard = (props) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.div_root}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {props.buildInfo.name}
                </Avatar>
                }
                title={props.buildInfo.name}
                subheader={'총 '+props.buildInfo.builds.length+' 건'}
            />
            <CardContent>
                <JenkinsTable>
                    <JenkinsTableRow key={props.buildInfo.name+'firstBuild'}            name='firstBuild'            number={props.buildInfo.firstBuild.number} />
                    <JenkinsTableRow key={props.buildInfo.name+'lastBuild'}             name='lastBuild'             number={props.buildInfo.lastBuild.number} />
                    <JenkinsTableRow key={props.buildInfo.name+'lastCompletedBuild'}    name='lastCompletedBuild'    number={props.buildInfo.completedBuild.number} />
                    <JenkinsTableRow key={props.buildInfo.name+'lastFailedBuild'}       name='lastFailedBuild'       number={props.buildInfo.failedBuild.number} />
                    <JenkinsTableRow key={props.buildInfo.name+'lastStableBuild'}       name='lastStableBuild'       number={props.buildInfo.stableBuild.number} />
                    <JenkinsTableRow key={props.buildInfo.name+'lastSuccessfulBuild'}   name='lastSuccessfulBuild'   number={props.buildInfo.successfulBuild.number} />
                    <JenkinsTableRow key={props.buildInfo.name+'lastUnsuccessfulBuild'} name='lastUnsuccessfulBuild' number={props.buildInfo.unsuccessfulBuild.number} />
                </JenkinsTable>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMore />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                    {props.buildInfo.builds && (
                        <CardContent>
                            <TableContainer size="small" component={Paper} className={classes.div_table}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.table_cell} >BUILD NUMBER</TableCell>
                                            <TableCell className={classes.table_cell} align="right">URL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.buildInfo.builds.map((build, i) => (
                                            <TableRow key={i+'-'+build.url}>
                                                <TableCell className={classes.table_cell} component="th" scope="row">{build.number}</TableCell>
                                                <TableCell className={classes.table_cell} align="right">{build.url}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            
                        </CardContent>
                    )}
            </Collapse>
        </Card>
    );
};

export default JenkinsBuildsCard;
