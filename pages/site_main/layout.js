/* NODE Modules */
import React, { useState } from 'react';
import clsx from 'clsx';

/* material Modules */
import { CssBaseline } from '@material-ui/core';

/* material Styles */
import { makeStyles } from '@material-ui/core/styles';

/* CUSTOM Modules */
import Header from './header';

/* CUSTOM Style */
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
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

const Layout = (props) => {
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
            <main className={clsx(classes.content, {
                       [classes.contentShift]: open,
                    })}
                >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        </div>
    );
};

export default Layout;