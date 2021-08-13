import React from 'react';
import '../css/Navbar.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withRouter, Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import bookLogo from '../Images/favicon.png'
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions'
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBarCollapse from './NavComponents/AppBarCollapse';

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: "#39424E"
    },
    title: {
        fontSize: 24,
    },
    left: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    toolbar: {
        justifyContent: 'space-between',
    },
    navbarBrandContent: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    navbarBrandName: {
        fontSize: 24,
        fontWeight: '700',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(2)
    }
}))

function Navbar(props) {

    const classes = useStyles();
    return (
        <>
            <AppBar elevation={0} position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left}>
                        <div className={classes.navbarBrand}>
                            <Link
                                underline="none"
                                color="inherit"
                                className={classes.title}
                                to="/explore/"
                            >
                                <div className={classes.navbarBrandContent}>
                                    <img src={bookLogo} width="30px" height="30px" alt="" />
                                    <Typography className={classes.navbarBrandName}>
                                        <span style={{ color: 'white' }}>Source</span><span style={{ color: '#04A54C', fontWeight: '900', fontSize: '30px' }}>Zilla</span>
                                    </Typography>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className={classes.right}>
                        <AppBarCollapse />
                    </div>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        details: state.profile.details
    }
}

export default connect(mapStateToProps, { logoutUser })(withRouter(Navbar))
