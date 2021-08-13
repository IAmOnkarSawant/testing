import { Button, CircularProgress, Container, Fab } from '@material-ui/core'
import React from 'react'
import '../../css/PostByCategoryId.css'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FlagIcon from '@material-ui/icons/Flag';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';

import { getprivateGroupPostsById, createPrivateGroupPost, UpVote, DownVote, DeletePrivatePost, leavePrivateGroup, reportPrivateGroupPost } from '../../redux/actions/privategroupAction'
import { profileDetails, } from '../../redux/actions/profileAction'

import { useState } from 'react'
import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import Layout from '../Layout'
import { ApplicationFormat, AudioAllFormat, TextFormat, ImageFormat, VideoFormat, replaceURLWithHTMLLinks, capitalizeFirstLetter } from '../../utils/utils';
import FlipMove from 'react-flip-move'
import store from '../../redux/store'
import AttachmentIcon from '@material-ui/icons/Attachment';
import CreateIcon from '@material-ui/icons/Create';
import LaunchIcon from '@material-ui/icons/Launch';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import ReactPlayer from 'react-player/lazy'
import ReactAudioPlayer from 'react-audio-player';
import { Progress } from 'react-sweet-progress'
import ScrollToTop from 'react-scroll-up'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Loader from '../Loader';
import { Toggle } from "react-toggle-component"
import { Waypoint } from 'react-waypoint'

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        marginBottom: 15,
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    avatar: {
        backgroundColor: red[500]
    },
    up_votes_count: {
        marginLeft: '10px',
    },
    down_votes_count: {
        marginLeft: '10px',
    },
    leave_button: {
        marginTop: 0
    },
    input: {
        display: 'none',
    },
    LeaveButton: {
        background: 'linear-gradient( to right, rgb(4, 167, 77) 0%, #04795d 0%, #1db853 )',
        border: 0,
        borderRadius: 20,
        color: 'white',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    }
}));

function PostsBycategory(props) {
    // console.log('ID : ', props.match.params.groupId)
    const classes = useStyles();
    if (props.errors.message) {
        props.history.push('/groups/')
    }

    const [pagenumber, setpagenumber] = useState(1);
    const fetcher = () => {
        setpagenumber(page => page + 1)
    }

    const [toggle, setToggle] = useState(true)
    const [postContent, setpostContent] = useState('')
    const [file, setFile] = useState('')

    const { getprivateGroupPostsById, profileDetails, match: { params: { groupId } } } = props

    useEffect(() => {
        getprivateGroupPostsById(groupId, pagenumber)
        profileDetails()

        store.dispatch({ type: 'CLEAR_INDIVIDUAL_POST' })
        store.dispatch({ type: 'CLEAN_COMMENTS' })     //clean comments state everytime when this component mount !
    }, [getprivateGroupPostsById, profileDetails, groupId, pagenumber])

    const dispatch = useDispatch()
    useEffect(() => {
        return () => {
            dispatch({
                type: 'CLEAR_INDIVIDUAL_POSTS'
            })
        }
    }, [dispatch])

    const handleSubmitPost = (e) => {
        e.preventDefault()
        const data = {
            postContent,
            categoryId: props.match.params.groupId
        }

        var formData = new FormData();

        formData.append('postContent', data.postContent)
        formData.append('categoryId', data.categoryId)
        formData.append('file', file)

        props.createPrivateGroupPost(formData)        // Private post created
        console.log(file, data)

        setpostContent('')
    }
    // console.log(props.errors.message)

    const handleUpvotePrivatePost = (id) => {
        props.UpVote(id, props.auth.user.userId)
    }

    const handleDownvotePrivatePost = (id) => {
        props.DownVote(id, props.auth.user.userId)
    }

    const handleDeletePrivatePost = (id) => {
        props.DeletePrivatePost(id)
    }

    const handleLeaveGroup = (privateGroupId) => {
        props.leavePrivateGroup(privateGroupId, props.history)
    }

    const handleReportPost = (id) => {
        props.reportPrivateGroupPost(id, props.auth.user.userId)
    }

    const EnterticketNotVisibleState = {
        opacity: 0.1
    };
    const LeaveticketNotVisibleState = {
        opacity: 0.1
    };

    if (props.loading === true) {
        return (
            <Loader />
        )
    }

    return (
        <Layout>
            <Container maxWidth="lg" >
                {props.groupAdmin === props.auth.user.userId && (
                    <p className="groupAdmin_name">Group Admin</p>
                )}
                <div className="imp_private-info">
                    <Button startIcon={<ExitToAppIcon />} disableElevation className={classes.LeaveButton} onClick={() => handleLeaveGroup(props.match.params.groupId)} size="medium" variant="contained" color="default"  >
                        Leave
                    </Button>
                    <Typography gutterBottom variant="h4" color="default">
                        {capitalizeFirstLetter(props.match.params.groupName)}
                    </Typography>
                    <div htmlFor="toggle-1">
                        <Toggle
                            name="toggle-1"
                            leftBackgroundColor="#04A54B"
                            leftBorderColor="#04A44B"
                            rightBorderColor="grey"
                            rightKnobColor="grey"
                            leftKnobColor="white"
                            onToggle={() => setToggle((state) => !state)}
                        />
                    </div>
                </div>
                {toggle && (
                    <div className="create__post__">
                        <form onSubmit={handleSubmitPost} className="post_create_content" >
                            <textarea
                                type="text"
                                className="styled__textarea"
                                name="postContent"
                                value={postContent}
                                onChange={(e) => setpostContent(e.target.value)}
                            />
                            <input
                                className={classes.input}
                                id="contained-button-file"
                                type="file"
                                name="file"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                            <div className="buttons_post">
                                <label htmlFor="contained-button-file" className="only_upload_button" >
                                    <Button fullWidth className="upload_button" size="small" variant="contained" component="span">
                                        <AttachmentIcon style={{ marginRight: '8px' }} /> <span style={{ fontWeight: '700' }} >Upload</span>
                                    </Button>
                                </label>
                                <Button className={postContent ? 'post_submit_button' : 'disabled_post_submit_button'} disabled={!postContent} size="small" variant="contained" type="submit" >
                                    <CreateIcon style={{ marginRight: '8px' }} />  <span style={{ fontWeight: '700' }}>Create Post</span>
                                </Button>
                            </div>
                            <Progress
                                style={{ marginTop: '15px' }}
                                percent={props.percentage}
                                theme={{
                                    active: {
                                        color: '#04A34A'
                                    },
                                    success: {
                                        symbol: '✅',
                                        color: '#04A34A'
                                    },
                                    default: {
                                        symbol: '❌',
                                    }
                                }}
                            />
                        </form>
                    </div>
                )}
                <div className="posts_div">
                    <FlipMove
                        enterAnimation={{
                            from: EnterticketNotVisibleState,
                            to: {}
                        }}
                        leaveAnimation={{
                            from: {},
                            to: LeaveticketNotVisibleState
                        }}
                    >
                        {
                            props.groupsIndividualPosts && props.groupsIndividualPosts.map(post =>
                                <Card key={post._id} className={classes.root + " post_card"}>
                                    <div className={`${post.spamFlag === true ? 'bg-content' : ''}`} style={{ position: 'relative' }}>
                                        <CardHeader
                                            avatar={
                                                <Avatar
                                                    alt={post.postBy.toLocaleUpperCase()}
                                                    src={`/posts/file/${post.profileImage}`}
                                                />
                                            }
                                            action={
                                                <div className="post_right_buttons">
                                                    {
                                                        props.auth.user.userId === post.postByUserId ? (
                                                            <IconButton disableFocusRipple={true} disableRipple={true} className="delete_button" onClick={() => handleDeletePrivatePost(post._id)} size="small" variant="contained"  >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton disableFocusRipple={true} disableRipple={true} className="delete_button" disabled onClick={() => handleDeletePrivatePost(post._id)} size="small" variant="contained" >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        )
                                                    }
                                                    {
                                                        // post.spamFlag === false &&
                                                        (
                                                            post.reports.includes(props.auth.user.userId) ? (
                                                                <IconButton disableFocusRipple={true} disableRipple={true} style={{ color: '#0FAB4A' }} disabled onClick={() => handleReportPost(post._id)} size="small" variant="contained"  >
                                                                    <FlagIcon />
                                                                </IconButton>
                                                            ) : (
                                                                <IconButton disableFocusRipple={true} disableRipple={true} style={{ color: '#0FAB4A' }} onClick={() => handleReportPost(post._id)} size="small" variant="contained"  >
                                                                    <FlagOutlinedIcon />
                                                                </IconButton>
                                                            )
                                                        )
                                                    }
                                                </div>
                                            }
                                            title={post.postBy}
                                            subheader={moment(post.createdAt).fromNow()}
                                        />
                                        <CardContent>
                                            <Typography style={{ marginBottom: '20px' }} variant="body2" color="textSecondary" component="p">
                                                <pre style={{ textDecoration: 'none' }} dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(post.postContent.replace(/<br\s*\/?>/gi, ' ')) }} />
                                            </Typography>
                                            {ImageFormat?.includes(post?.fileContentType) && post?.fileName && (
                                                <img
                                                    height="300px"
                                                    width="450px"
                                                    src={`/posts/file/${post.fileName}`}
                                                    alt=""
                                                />
                                            )}
                                            {ApplicationFormat?.includes(post?.fileContentType) && post?.fileName && (
                                                <a className="link_button" style={{ color: 'black', textDecoration: 'none' }} rel="noopener noreferrer" href={process.env.NODE_ENV === 'development' ? `http://localhost:4000/posts/file/${post.fileName}` : `/posts/file/${post.fileName}`} target="_blank" >
                                                    <Button className="link_button_file" variant="contained" size="small">
                                                        View Document
                                                    </Button>
                                                </a>
                                            )}
                                            {TextFormat?.includes(post?.fileContentType) && post?.fileName && (
                                                <a className="link_button" style={{ color: 'black', textDecoration: 'none' }} rel="noopener noreferrer" href={process.env.NODE_ENV === 'development' ? `http://localhost:4000/posts/file/${post.fileName}` : `/posts/file/${post.fileName}`} target="_blank" >
                                                    <Button className="link_button_file" variant="contained" size="small">
                                                        View Document
                                                    </Button>
                                                </a>
                                            )}
                                            {AudioAllFormat?.includes(post?.fileContentType) && post?.fileName && (
                                                <ReactAudioPlayer
                                                    src={`/streamer/live/${post.fileName}`}
                                                    controls
                                                    controlsList="nodownload"
                                                />
                                            )}
                                            {VideoFormat?.includes(post?.fileContentType) && post?.fileName && (
                                                <ReactPlayer
                                                    className='react-player fixed-bottom'
                                                    url={`/streamer/live/${post.fileName}`}
                                                    width='500px'
                                                    height='300px'
                                                    controls={true}
                                                    onContextMenu={e => e.preventDefault()}
                                                    config={{ file: { attributes: { controlsList: 'nodownload' } } }}
                                                />
                                            )}
                                        </CardContent>
                                        <CardActions disableSpacing>
                                            {
                                                post?.upvotes?.includes(props?.auth?.user?.userId) ? (
                                                    <div className="down__vote">
                                                        <IconButton disableFocusRipple={true} disableRipple={true} onClick={() => handleUpvotePrivatePost(post._id)} aria-label="add to favorites" style={{ color: `${post?.upvotes?.includes(props?.auth?.user?.userId) ? "#0eaa49" : ""}` }}>
                                                            <ThumbUpAltIcon />
                                                            <Typography className={classes.up_votes_count} variant="h6" component="h6">
                                                                {post.upvotes.length}
                                                            </Typography>
                                                        </IconButton>
                                                        <IconButton disableFocusRipple={true} disableRipple={true} onClick={() => handleDownvotePrivatePost(post._id)} aria-label="remove from favorites">
                                                            <ThumbDownAltIcon />
                                                            <Typography className={classes.down_votes_count} variant="h6" component="h6">
                                                                {post.downvotes.length}
                                                            </Typography>
                                                        </IconButton>
                                                    </div>
                                                ) : (
                                                    <div className="up__vote">
                                                        <IconButton disableFocusRipple={true} disableRipple={true} onClick={() => handleUpvotePrivatePost(post._id)} aria-label="add to favorites">
                                                            <ThumbUpAltIcon />
                                                            <Typography className={classes.up_votes_count} variant="h6" component="h6">
                                                                {post.upvotes.length}
                                                            </Typography>
                                                        </IconButton>
                                                        <IconButton disableFocusRipple={true} disableRipple={true} onClick={() => handleDownvotePrivatePost(post._id)} aria-label="remove from favorites" style={{ color: `${post?.downvotes?.includes(props?.auth?.user?.userId) ? "#0eaa49" : ""}` }}>
                                                            <ThumbDownAltIcon />
                                                            <Typography className={classes.down_votes_count} variant="h6" component="h6">
                                                                {post.downvotes.length}
                                                            </Typography>
                                                        </IconButton>
                                                    </div>
                                                )
                                            }

                                            <Link to={`/post/${post._id}`} >
                                                <IconButton disableFocusRipple={true} disableRipple={true} style={{ marginLeft: '10px' }} size="small" variant="contained" color="default" >
                                                    <LaunchIcon />
                                                </IconButton>
                                            </Link>
                                        </CardActions>
                                    </div>
                                    <div className={`${post.spamFlag === true ? 'fg-content' : 'hide-content'}`}>
                                        <div className="fg-content-container">
                                            <VisibilityOffOutlinedIcon className="visibility-icon" />
                                            <span>Post has been reported for inappropriate content</span>
                                        </div>
                                    </div>
                                </Card>
                            )
                        }
                    </FlipMove>
                </div>
            </Container>
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

            {props.hasMore === true && props.isLoading === false && <Waypoint onEnter={fetcher} />}

            <br />
            {/* progress */}
            {(props.hasMore === true && (

                <div style={{ textAlign: "center" }}>
                    <CircularProgress size={70} thickness={3} />
                </div>

            ))}
            <br />
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        groupsIndividualPosts: state.groups.groupsIndividualPosts,
        groupAdmin: state.groups.groupAdmin,
        errors: state.errors.Errors,
        auth: state.auth,
        isLoading: state.groups.isLoading,
        hasMore: state.groups.hasMore,
        percentage: state.posts.percentage
    }
}

export default connect(mapStateToProps, {
    profileDetails,
    getprivateGroupPostsById,
    createPrivateGroupPost,
    UpVote,
    DownVote,
    DeletePrivatePost,
    leavePrivateGroup,
    reportPrivateGroupPost
})(withRouter(PostsBycategory))
