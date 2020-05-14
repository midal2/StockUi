/**
 * Desc : 이 파일은 무엇을 하는 파일입니다.
 */

/* NODE Modules */
import React, { useState } from 'react';

/* material Modules */
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

/* CUSTOM Modules */
import Header from './topappbar';
import LeftDrawer from './left_drawer';

/* CUSTOM Style */
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

const BorderDrawer = (props) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header open={open} onOpen={handleDrawerOpen} onClose={handleDrawerClose} />
            <LeftDrawer variant="persistent"
                        anchor="left" 
                        open={open} 
                        onClose={handleDrawerClose}
            />

            <div className={classes.content}
                 role="presentation"
                 onClick={handleDrawerClose}
                 onKeyDown={handleDrawerClose}
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </div>
        </div>
    );
};

export default BorderDrawer;