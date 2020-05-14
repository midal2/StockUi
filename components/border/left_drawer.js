/* NODE Modules */
import React from 'react';

/* material Modules */
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChevronLeft, Inbox, Mail } from '@material-ui/icons';

/* CUSTOM Object */
const menuList = [
    {text:'홈',url:'/'},
    {text:'배포확인',url:'/jenkins_main'},
    {text:'주식목록',url:'/stock'}    
];

/* CUSTOM Style */
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
}));

const LeftDrawer = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Drawer open={props.open}
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={props.onClose}>
                        <ChevronLeft />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {menuList.map((ele, index) => (
                        <ListItem button key={ele.text} component="a" href={ele.url} >
                            <ListItemIcon>{index % 2 === 0 ? <Inbox /> : <Mail />}</ListItemIcon>
                            <ListItemText primary={ele.text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
            </Drawer>
        </div>
    );
};

export default LeftDrawer;
