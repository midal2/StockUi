/* NODE Modules */
import React from 'react';
import clsx from 'clsx';

/* material Modules */
import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core';

/* material Styles */
import { fade, makeStyles } from '@material-ui/core/styles';

/* material Icons */
import { Menu, Search } from '@material-ui/icons';

/* CUSTOM Modules */
import LeftDrawer from './left_drawer';

/* CUSTOM Style */
const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },    
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
}));

/**
 * 페이지 왼쪽 메뉴
 */
const Header = (props) => {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: props.open,
                    })}
            >
                <Toolbar>
                    <IconButton edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={props.onOpen}
                    >
                        <Menu />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        관심대상 주식목록
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search />
                        </div>
                        <InputBase placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'Search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <LeftDrawer variant="persistent"
                        anchor="left" 
                        open={props.open} 
                        onClose={props.onClose}
            />
        </div>
    );
};

export default Header;