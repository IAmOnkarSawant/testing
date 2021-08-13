import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-scroll'
import { Container } from '@material-ui/core';
import Logo from './../../../Images/favicon.png'

export default function HideAppBar(props) {
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar style={{ backgroundColor: 'white', color: 'black' }} >
                <Container maxWidth="xl">
                    <Toolbar className="toolbar_explore">
                        <div className="toolbarLeft">
                            <img className="navbar__logo" src={Logo} width="30px" height="30px" alt="" />
                            <a href='/' className="navbar__brand">
                                <span style={{ color: 'black' }}>Source</span><span style={{ color: '#04A54C', fontWeight: '900', fontSize: '30px' }}>Zilla</span>
                            </a>
                        </div>
                        <div className="toolbarRight">
                            <Link activeClass="active" className="home" to="Home" spy={true} smooth={true} duration={300} >
                                Home
                                </Link>
                            <Link activeClass="active" className="aboutus" to="AboutUs" spy={true} smooth={true} duration={300} >
                                Motivation
                                </Link>
                            <Link activeClass="active" className="features" to="Features" spy={true} smooth={true} duration={300} >
                                Features
                                </Link>
                            <Link activeClass="active" className="developers" to="Developers" spy={true} smooth={true} duration={300} >
                                Our Team
                            </Link>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            <Toolbar />
        </React.Fragment>
    );
}