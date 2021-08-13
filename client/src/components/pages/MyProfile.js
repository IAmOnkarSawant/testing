import React from 'react'
import '../../css/Myprofile.css'
import { Tabs, Tab, AppBar, IconButton, Button, TextField } from "@material-ui/core";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box'
import Layout from '../Layout';
import Myposts from '../profile/Myposts';
import ResourceBox from '../profile/ResourceBox';
import Details from '../profile/Details';
import { profileDetails, changeUsername, changeDpOfUser, changeGithub, changeLinkedIn, changeTwitter } from '../../redux/actions/profileAction'
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'material-ui-image'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ScrollToTop from 'react-scroll-up';

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

function MyProfile(props) {
    const { match, history } = props;
    const { params } = match;
    const { page } = params;

    const tabNameToIndex = {
        0: "Myposts",
        1: "Resourcebox",
        2: "Details",
    };

    const indexToTabName = {
        Myposts: 0,
        Resourcebox: 1,
        Details: 2,
    };

    const [selectedTab, setSelectedTab] = React.useState(indexToTabName[page]);

    const handleChange = (event, newValue) => {
        history.push(`/profile/${tabNameToIndex[newValue]}`);
        setSelectedTab(newValue);
    };

    const { profileDetails } = props
    useEffect(() => {
        profileDetails()
    }, [profileDetails])

    const [newUserName, setnewUserName] = useState('')
    const [newDp, setnewDp] = useState('')
    const [gitHub, setgitHub] = useState('')
    const [linkedIn, setlinkedIn] = useState('')
    const [twitter, settwitter] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newUserName)
        props.changeUsername(newUserName)
        setnewUserName('')
    }

    const handleSubmitGithub = (e) => {
        e.preventDefault()
        console.log(gitHub)
        props.changeGithub(gitHub)
        setgitHub('')
    }

    const handleSubmitLinkedIn = (e) => {
        e.preventDefault()
        console.log(linkedIn)
        props.changeLinkedIn(linkedIn)
        setlinkedIn('')
    }

    const handleSubmitTwitter = (e) => {
        e.preventDefault()
        console.log(twitter)
        props.changeTwitter(twitter)
        settwitter('')
    }

    const handleChangeDp = (e) => {
        e.preventDefault()
        console.log(newDp)

        const newFormData = new FormData()
        newFormData.append("file", newDp)

        props.changeDpOfUser(newFormData)
        setnewDp('')
    }

    return (
        <Layout>
            <div className="myprofile">
                <div className="edit__profile">
                    <h3 className="profile__name">Name:{props.details.userName}</h3>
                    <Image
                        loading
                        color="transparent"
                        src={props.details.fileName ? `/posts/file/${props.details.fileName}/` : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`}
                        alt="profile__image"
                        name="profile__image"
                        className="profile__image"
                        cover
                    />
                    <div className="follo__info">
                        <h3>Categories Followed : <span>{props?.details?.categoriesFollowed?.length}</span></h3>
                    </div>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography >Change Profile Photo</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div className="changeDp">
                                <form onSubmit={handleChangeDp} >
                                    <input
                                        type="file"
                                        id="icon-button-file"
                                        name="file"
                                        onChange={(e) => setnewDp(e.target.files[0])}
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <IconButton aria-label="upload picture" component="span">
                                            <PhotoCamera style={{ color: '#07A84D' }} />
                                        </IconButton>
                                    </label>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                        fullWidth
                                        disabled={!newDp}
                                        className={newDp ? 'change__dp__button' : 'disabled_change__dp__button'}
                                    >
                                        Change
                                    </Button>
                                </form>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography >Change Username</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="change_username">
                            <div className="changeUsername">
                                <form onSubmit={handleSubmit} >
                                    <TextField
                                        type="text"
                                        name="newUserName"
                                        placeholder={props.details.userName}
                                        value={newUserName}
                                        style={{ flex: 1, marginRight: '10px' }}
                                        onChange={(e) => setnewUserName(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                        disabled={!newUserName}
                                        className={newUserName ? 'change__username__button' : 'disabled_change__username__button'}
                                    >
                                        <PersonAddIcon />
                                    </Button>
                                </form>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography >Add Social Accounts</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="update_social_links">
                            <div className="changeGithub">
                                <form onSubmit={handleSubmitGithub} >
                                    <TextField
                                        type="text"
                                        name="addGithub"
                                        placeholder={props?.details?.socialHandles?.github}
                                        value={gitHub}
                                        style={{ flex: 1, marginRight: '10px' }}
                                        onChange={(e) => setgitHub(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                        disabled={!gitHub}
                                        className={gitHub ? 'change__github__button' : 'disabled_change__github__button'}
                                    >
                                        <GitHubIcon />
                                    </Button>
                                </form>
                            </div>
                            <div className="changeLinkedIn">
                                <form onSubmit={handleSubmitLinkedIn} >
                                    <TextField
                                        type="text"
                                        name="addlinkedIn"
                                        placeholder={props?.details?.socialHandles?.linkedIn}
                                        value={linkedIn}
                                        style={{ flex: 1, marginRight: '10px' }}
                                        onChange={(e) => setlinkedIn(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                        disabled={!linkedIn}
                                        className={linkedIn ? 'change__linkedIn__button' : 'disabled_change__linkedIn__button'}
                                    >
                                        <LinkedInIcon />
                                    </Button>
                                </form>
                            </div>
                            <div className="changetwitter">
                                <form onSubmit={handleSubmitTwitter} >
                                    <TextField
                                        type="text"
                                        name="addtwitter"
                                        placeholder={props?.details?.socialHandles?.twitter}
                                        value={twitter}
                                        style={{ flex: 1, marginRight: '10px' }}
                                        onChange={(e) => settwitter(e.target.value)}
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                        disabled={!twitter}
                                        className={twitter ? 'change__twitter__button' : 'disabled_change__twitter__button'}
                                    >
                                        < TwitterIcon />
                                    </Button>
                                </form>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <div className="profile__tabs">
                    <AppBar position="static" color="default">
                        <Tabs
                            value={selectedTab}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            className="tabs_style"
                        >
                            <Tab label="Myposts" icon={<MenuBookIcon />} className="" />
                            <Tab label="Resourcebox" icon={<BookmarksIcon />} className="" />
                            <Tab label="More Details" icon={<AccountBoxIcon />} className="" />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={selectedTab} index={0} >
                        <Myposts loading={props.loading} />
                    </TabPanel>
                    <TabPanel value={selectedTab} index={1} >
                        <ResourceBox loading={props.loading} />
                    </TabPanel>
                    <TabPanel value={selectedTab} index={2} >
                        <Details loading={props.loading} />
                    </TabPanel>
                </div>
            </div>
            <ScrollToTop
                style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    cursor: 'pointer',
                    transitionDuration: '0.2s',
                    transitionTimingFunction: 'linear',
                    transitionDelay: '0s',
                    backgroundColor: '#04A44B',
                    borderRadius: '50%'
                }}
                showUnder={160}
            >
                <IconButton>
                    <ArrowUpwardIcon style={{ color: 'white' }} />
                </IconButton>
            </ScrollToTop>
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        details: state.profile.details,
        loading: state.loading.loading
    }
}

export default connect(mapStateToProps, {
    profileDetails,
    changeUsername,
    changeDpOfUser,
    changeGithub,
    changeLinkedIn,
    changeTwitter
})(MyProfile)
