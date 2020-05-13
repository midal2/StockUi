/* NODE Modules */
import React from 'react';
import Link from 'next/link';

/* material Modules */
import { Drawer, IconButton
       , List, ListItem, ListItemIcon, ListItemText 
       , Divider
       } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { ChevronLeft, Mail,MoveToInbox } from '@material-ui/icons';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
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
}));

/**
 * 페이지 왼쪽 메뉴
 */
const LeftDrawer = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div>
            <Drawer className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    classes={{
                        paper: classes.drawerPaper,
                    }}              
                    open={props.open}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={props.onClose}>
                        <ChevronLeft />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {[{text:'배포확인', url:'/jenkins_main'}, {text:'주가확인', url:'/stock_main'}].map((ele, index) => (
                        <ListItem button key={index} component="a" href={ele.url}>
                            <ListItemIcon>{index % 2 === 0 ? <MoveToInbox /> : <Mail />}</ListItemIcon>
                            <ListItemText primary={ele.text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <Link href='/jenkins_main'>
                        <a>
                            <ListItem button>
                                <ListItemIcon> <Mail /> </ListItemIcon>
                                <ListItemText primary='배포확인' />
                            </ListItem>
                        </a>
                    </Link>
                </List>
            </Drawer>
        </div>
    );
};

export default LeftDrawer;