/* NODE Modules */
import React, { useState } from 'react';

/* material Modules */
import {AppBar, Toolbar, IconButton, InputBase, Typography} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import {Menu, Search} from '@material-ui/icons';

/* CUSTOM Components */
import LeftDrawer from './left_drawer';

/* CUSTOM Styles */
const useStyles = makeStyles(theme => ({
    root: {
    },
    menuButton: {
      marginRight: theme.spacing(2),
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
 * 페이지 헤더
 */
const Header = () => {
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={handleDrawerOpen}
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
                        <InputBase
                        placeholder="Search…"
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
                        open={open} 
                        onClose={handleDrawerClose}
            />
        </div>
    );

};

export default Header;
