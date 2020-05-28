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
import React, { Fragment, useState } from 'react';
import clsx from 'clsx';

/* material Modules */
import { makeStyles } from '@material-ui/core/styles';
import { Card
       , CardHeader
       , Avatar
       , CardContent
       , CardActions
       , IconButton
       , Collapse
       , Paper
       , Table
       , TableBody
       , TableCell
       , TableContainer
       , TableHead
       , TableRow 
       } from '@material-ui/core';

import { ExpandMore, AddCircleOutline } from '@material-ui/icons';
import { red } from '@material-ui/core/colors';

/* CUSTOM Modules */
import JenkinsTable        from './jenkins_table';
import JenkinsTableRow     from './jenkins_table_row';
import JenkinsDetailDialog from './jenkins_detail_dialog';
import JenKinsAPI          from '../../modules/jenkins_api';

/* CUSTOM Style */
const useStyles = makeStyles((theme) => ({
    div_root: {
        maxWidth: '100%',
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
    icon_root: {
        padding: '0px',
    },
}));

const JenkinsBuildsCard = (props) => {
    const classes = useStyles();

    const [expanded    , setExpanded]    = useState(false);
    const [open        , setOpen]        = useState(false);
    const [jobName     , setJobName]     = useState('');
    const [buildNumber , setBuildNumber] = useState('');
    const [detailData  , setDetailData]  = useState(null);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleDialogOpen = (jobName, buildNumber) => {
        console.log(' :: open :: jobName :: ', jobName, ' :: buildNumber :: ', buildNumber);
        
        setJobName(jobName);
        setBuildNumber(buildNumber);
        const dataPromise = JenKinsAPI.retrieveBuildDeatilInfo( jobName, buildNumber );
        dataPromise.then(( res )=>{
            const data = res.data;
            setDetailData(data);
        });

        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
        setJobName('');
        setBuildNumber('');
        setDetailData(null);
    };

    return (
        <Fragment>
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
                        <JenkinsTableRow key={props.buildInfo.name+'firstBuild'}            name='firstBuild'            summaryInfo={props.buildInfo.firstBuild}            />
                        <JenkinsTableRow key={props.buildInfo.name+'lastBuild'}             name='lastBuild'             summaryInfo={props.buildInfo.lastBuild}             />
                        <JenkinsTableRow key={props.buildInfo.name+'lastCompletedBuild'}    name='lastCompletedBuild'    summaryInfo={props.buildInfo.lastCompletedBuild}    />
                        <JenkinsTableRow key={props.buildInfo.name+'lastFailedBuild'}       name='lastFailedBuild'       summaryInfo={props.buildInfo.lastFailedBuild}       />
                        <JenkinsTableRow key={props.buildInfo.name+'lastStableBuild'}       name='lastStableBuild'       summaryInfo={props.buildInfo.lastStableBuild}       />
                        <JenkinsTableRow key={props.buildInfo.name+'lastSuccessfulBuild'}   name='lastSuccessfulBuild'   summaryInfo={props.buildInfo.lastSuccessfulBuild}   />
                        <JenkinsTableRow key={props.buildInfo.name+'lastUnsuccessfulBuild'} name='lastUnsuccessfulBuild' summaryInfo={props.buildInfo.lastUnsuccessfulBuild} />
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
                                                <TableCell className={classes.table_cell} >NUM</TableCell>
                                                <TableCell className={classes.table_cell} align="right">DETAIL</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {props.buildInfo.builds.map((build, i) => (
                                                <TableRow key={'expanded'+i}>
                                                    <TableCell className={classes.table_cell} component="th" scope="row">{build.number}</TableCell>
                                                    <TableCell className={classes.table_cell} align="right">
                                                        <IconButton className={classes.icon_root} size="small" onClick={() => handleDialogOpen(props.buildInfo.name, build.number)}>
                                                            <AddCircleOutline />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                
                            </CardContent>
                        )}
                </Collapse>
            </Card>
            <JenkinsDetailDialog open={open} onClose={handleDialogClose} jobName={jobName} buildNumber={buildNumber} detailData={detailData} />
        </Fragment>
    );
};

export default JenkinsBuildsCard;
