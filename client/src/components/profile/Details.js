import { Avatar, Card, CardContent, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { profileDetails } from '../../redux/actions/profileAction'
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import {  stringMinimizer } from '../../utils/utils';
import ProfileLoader from '../ProfileLoader';

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: '100%',
        margin: '70px 0 0 0'
    }
}));

function Details(props) {
    const classes = useStyles();
    const { profileDetails } = props
    useEffect(() => {
        profileDetails()
    }, [profileDetails])

    if (props.loading) {
        return (
            <ProfileLoader />
        )
    }

    return (
        <Container maxWidth="sm">
            <Card className={classes.root}>
                <div className="card_header">
                    <div className="card_header_content">
                        <span className="card_header_content_username" >
                            {props.details.userName}
                        </span>
                        <span className="card_header_content_role" >
                            {props.details.role}
                        </span>
                    </div>
                    <Avatar
                        className="details_avatar"
                        alt="profile_photo_in_details"
                        src={props.details.fileName ? `/posts/file/${props.details.fileName}/` : `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png`}
                    />
                </div>
                <CardContent>
                    <div className="links">
                        <span className="github_link">
                            <GitHubIcon className="github_icon" />
                            <span className="github_link_text" style={{ marginLeft: '10px' }}>
                                {
                                    props?.details?.socialHandles?.github === undefined ? (
                                        <p>Please..update your Github link</p>
                                    ) : (
                                            <a style={{ color: 'black' }} target='_blank' rel="noopener noreferrer" href={props?.details?.socialHandles?.github}>{stringMinimizer(String(props?.details?.socialHandles?.github), 40)}</a>
                                        )
                                }
                            </span>
                        </span>
                        <span className="linkedin_link">
                            <LinkedInIcon className="linkedin_icon" />
                            <span className="linkedin_link_text" style={{ marginLeft: '10px' }}>
                                {
                                    props?.details?.socialHandles?.linkedIn === undefined ? (
                                        <p>Please..update your LinkedIn link</p>
                                    ) : (
                                            <a style={{ color: 'black' }} target='_blank' rel="noopener noreferrer" href={props?.details?.socialHandles?.linkedIn}>{stringMinimizer(String(props?.details?.socialHandles?.linkedIn), 40)}</a>
                                        )
                                }
                            </span>
                        </span>
                        <span className="twitter_link">
                            <TwitterIcon className="twitter_icon" />
                            <span className="twitter_link_text" style={{ marginLeft: '10px' }}>
                                {
                                    props?.details?.socialHandles?.twitter === undefined ? (
                                        <p>Please..update your Twitter link</p>
                                    ) : (
                                            <a style={{ color: 'black' }} target='_blank' rel="noopener noreferrer" href={props?.details?.socialHandles?.twitter}>{stringMinimizer(String(props?.details?.socialHandles?.twitter), 40)}</a>
                                        )
                                }
                            </span>
                        </span>
                    </div>
                </CardContent>
            </Card>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        details: state.profile.details,
    }
}

export default connect(mapStateToProps, { profileDetails })(Details)

