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
                    B
                </Avatar>
                }
                title={props.title}
                subheader={props.subheader}
            />
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
                    {props.builds && (
                        <CardContent>
                            <TableContainer size="small" component={Paper} className={classes.div_table}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>NUMBER</TableCell>
                                            <TableCell align="right">URL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.builds.map((build, i) => (
                                            <TableRow key={i}>
                                                <TableCell component="th" scope="row">{build.number}</TableCell>
                                                <TableCell align="right">{build.url}</TableCell>
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
