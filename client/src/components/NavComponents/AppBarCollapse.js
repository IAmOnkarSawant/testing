import React from "react";
import { Button, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ButtonAppBarCollapse from "./ButtonAppBarCollapse";
import { NavLink, withRouter } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { connect } from "react-redux";
import { logoutUser } from './../../redux/actions/authActions'

const useStyles = makeStyles(theme => ({
    // root: {
    //     position: "absolute",
    //     right: 0
    // },
    buttonBar: {
        [theme.breakpoints.down("sm")]: {
            display: "none"
        },
        margin: "10px",
        paddingLeft: "16px",
        right: 0,
        position: "relative",
        width: "100%",
        background: "transparent"
    }
}));

const AppBarCollapse = props => {
    const classes = useStyles();

    const onLogout = (e) => {
        e.preventDefault()
        props.logoutUser(props.history)
    }
    const guestLinks = (
        <div className="navbar__right">
            <NavLink
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/auth/login/"
            >
                Log In
            </NavLink>
            <NavLink
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/auth/register/"
            >
                Sign Up
            </NavLink>
        </div>
    )

    const authLinks = (
        <div className="navbar__right">
            {
                props.auth.user.role === 'Admin' ? (
                    <MenuItem>
                        <NavLink
                            activeClassName="navbar__link--active"
                            className="navbar__link"
                            to="/admin/"
                        >
                            Admin
                        </NavLink>
                    </MenuItem>
                ) : (
                    null
                )
            }

            <NavLink
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/categories/"
            >
                Categories
            </NavLink>
            <NavLink
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/groups/"
            >
                Groups
            </NavLink>
            <NavLink
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/profile/"
            >
                Profile
            </NavLink>
            <span className="logout__button" onClick={onLogout} >Logout</span>
            <Avatar alt="" src={`/posts/file/${props.details.fileName}`} />
        </div>
    )
    // New Links
    const guestLinksCollapse = (
        <>
            <MenuItem
                component={NavLink}
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/auth/login/"
            >
                Log In
            </MenuItem>
            <MenuItem
                component={NavLink}
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/auth/register/"
            >
                Sign Up
            </MenuItem>
        </>
    )

    const authLinksCollapse = (
        <>
            <MenuItem>
                <Avatar alt="" src={`/posts/file/${props.details.fileName}`} />
            </MenuItem>
            {
                props.auth.user.role === 'Admin' ? (
                    <MenuItem
                        activeClassName="navbar__link--active"
                        className="navbar__link"
                        to="/admin/"
                    >
                        Admin
                    </MenuItem>
                ) : (
                    null
                )
            }

            <MenuItem
                component={NavLink}
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/categories/"
            >
                Categories
            </MenuItem>
            <MenuItem
                component={NavLink}
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/groups/"
            >
                Groups
            </MenuItem>
            <MenuItem
                component={NavLink}
                activeClassName="navbar__link--active"
                className="navbar__link"
                to="/profile/"
            >
                Profile
            </MenuItem>
            <MenuItem
                component={Button}
                variant="default"
                color="secondary"
                onClick={onLogout}
                style={{ color: 'red' }}
            >
                Logout
            </MenuItem>
        </>
    )
    return (
        < >
            <ButtonAppBarCollapse>
                {props.auth.isAuthenticated ? authLinksCollapse : guestLinksCollapse}
            </ButtonAppBarCollapse>
            <div className={classes.buttonBar} >
                {props.auth.isAuthenticated ? authLinks : guestLinks}
            </div>
        </>
    )
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        details: state.profile.details
    }
}

export default connect(mapStateToProps, { logoutUser })(withRouter(AppBarCollapse))
