import React from 'react'
import '../../css/LoginRegister.css'
import { Tabs, Tab, AppBar, Container } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box'
import Login from './Login'
import Register from './Register'
import { motion } from "framer-motion";
import Layout from '../Layout';

function TabPanel(props) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const pageVariants = {
    initial: {
        opacity: 0,
        x: "-100vw",
        scale: 1
    },
    in: {
        opacity: 1,
        x: 0,
        scale: 1
    },
    out: {
        opacity: 0,
        y: "100vh",
        scale: 1.0
    }
};

const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.9
};

const pageStyle = {
    position: "relative"
};

function LoginRegister(props) {
    const { match, history } = props;
    const { params } = match;
    const { page } = params;

    const tabNameToIndex = {
        0: "login",
        1: "register"
    };

    const indexToTabName = {
        login: 0,
        register: 1
    };

    const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

    const handleChange = (event, newValue) => {
        history.push(`/auth/${tabNameToIndex[newValue]}`);
        setSelectedTab(newValue);
    };

    return (
        <>
            <Layout>
                <motion.div
                    style={pageStyle}
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}
                >
                    <Container maxWidth="sm" height="100vh" className="login__register">
                        <div className="wrapper">
                            <AppBar className="login__register_appbar" position="static" color="default">
                                <Tabs
                                    value={selectedTab}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    variant="fullWidth"
                                >
                                    <Tab label="Log In" className="tab__font" />
                                    <Tab label="Sign Up" className="tab__font" />
                                </Tabs>
                            </AppBar>
                            <TabPanel value={selectedTab} index={0} >
                                <Login />
                            </TabPanel>
                            <TabPanel value={selectedTab} index={1} >
                                <Register />
                            </TabPanel>
                        </div>
                    </Container>
                </motion.div>
            </Layout>
        </>
    )
}

export default LoginRegister
