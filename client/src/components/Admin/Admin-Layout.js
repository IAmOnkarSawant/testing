import React from 'react';
import '../../css/Admin.css'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink, withRouter } from 'react-router-dom'
import SettingsIcon from '@material-ui/icons/Settings';
import { Fab } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const drawerWidth = 285;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: 'black',
        color: 'white',
        borderBottom: '.3px solid grey'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: 'black'
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function AdminLayout(props) {
    const classes = useStyles();
    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className="admin__appbar__toolbar" >
                    <SettingsIcon className="admin__icon" />
                    <Typography variant="h6" noWrap>
                        Admin Panel
                    </Typography>
                    <Fab onClick={() => props.history.push('/categories/') } size="small" className="back__button" color="secondary" aria-label="edit">
                        <ArrowBackIcon />
                    </Fab>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <Toolbar />
                <div className={classes.drawerContainer}>
                    <div className="content__sidebar">
                        <NavLink to="/admin/userscoll/" className="sidebar__link" activeClassName="sidebar__link--active" >
                            <Typography>
                                Manage Users
                            </Typography>
                        </NavLink>
                        <NavLink to="/admin/spamposts/" className="sidebar__link" activeClassName="sidebar__link--active" >
                            <Typography>
                                Spam-Posts
                            </Typography>
                        </NavLink>
                        <NavLink to="/admin/spamcategories/" className="sidebar__link" activeClassName="sidebar__link--active" >
                            <Typography>
                                Spam-Categories
                            </Typography>
                        </NavLink>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default withRouter(AdminLayout)