import React from 'react'
import '../../css/PostIndividual.css'
import { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import Layout from '../Layout'
import { profileDetails } from '../../redux/actions/profileAction'
import { getPostIndividual, postCommentFromIndividual, deleteComment, getPostComments, UpVoteFromIndividual, DownVoteFromIndividual, addresourcebox, removeFromResourceBox } from '../../redux/actions/postsActions'
import { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { red } from "@material-ui/core/colors";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SendIcon from "@material-ui/icons/Send";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderOutlinedIcon from "@material-ui/icons/BookmarkBorderOutlined";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { Box, Button, Container, Fab } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from "@material-ui/core/Divider";
import { ApplicationFormat, AudioAllFormat, TextFormat, ImageFormat, VideoFormat, replaceURLWithHTMLLinks, replaceURLWithHTMLLinksForComments } from '../../utils/utils';
import moment from 'moment'
import FlipMove from 'react-flip-move'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ModalImage from "react-modal-image";
import ReactPlayer from 'react-player'
import ReactAudioPlayer from 'react-audio-player';
import EditIcon from '@material-ui/icons/Edit';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PublicIcon from '@material-ui/icons/Public';
import Loader from '../Loader'
import Drawer from './Drawer'
import { useCallback } from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        // maxWidth: 345,
        marginTop: '25px',
        marginBottom: '25px'
    },
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: "rotate(180deg)"
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
    comments_count: {
        marginLeft: '10px',
    },
    dialog: {
        padding: '30px'
    },
    update_comment_btn: {
        marginTop: '15px'
    }
}));

function PostIndividual(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState('')

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [commentBody, setCommentBody] = useState('')

    console.log(props.match.params.postId)

    const { getPostIndividual, getPostComments, profileDetails, match: { params: { postId } } } = props

    useEffect(() => {
        getPostIndividual(postId)
        getPostComments(postId)
        setExpanded(true)
    }, [getPostIndividual, getPostComments, profileDetails, postId])

    const dispatch = useDispatch();
    useEffect(() => {

        profileDetails()

        return () => {
            dispatch({ type: 'CLEAR_INDIVIDUAL_POST' })
            dispatch({ type: 'CLEAN_COMMENTS' })
        }
    }, [profileDetails, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault()
        const CommentData = {
            commentBody,
            postId: props.match.params.postId
        }
        props.postCommentFromIndividual(CommentData, CommentData.postId)
        setCommentBody('')
    }

    const handleDeleteComment = (id) => {
        const CommentData = {
            postId: props.match.params.postId,
            commentId: id
        }
        props.deleteComment(CommentData)
        console.log(CommentData)
    }

    const handleUpvoteFromIndividual = (id) => {
        console.log(id)
        props.UpVoteFromIndividual(id, props.auth.user.userId)
    }

    const handleDownvoteFromIndividual = (id) => {
        console.log(id)
        props.DownVoteFromIndividual(id, props.auth.user.userId)
    }

    const addResourceToIndividual = (id) => {
        console.log(id)
        props.addresourcebox(id)
    }

    const RemoveResourceFromIndividual = (id) => {
        console.log(id)
        props.removeFromResourceBox(id)
    }

    const handleEdit = useCallback((id) => {
        setEdit(state => !state)
        setEditId(id)
    }, [setEditId, setEdit])

    if (props.loading === true) {
        return (
            <Loader />
        )
    }

    console.log(props.postIndividual.accessibilty)
    return (
        <Layout>
            <Container maxWidth="lg">
                <Card className={classes.root + ' post_card'} >
                    <CardHeader
                        avatar={
                            <Avatar
                                className="post_user_profile_photo"
                                alt="profile__photo"
                                src={`/posts/file/${props.postIndividual.profileImage}`}
                            />
                        }
                        action={
                            <div className="postInd_btnss_right">
                                {props.auth.isAuthenticated && props.auth.user.userId === props.postIndividual.postBy ? (
                                    <IconButton disableFocusRipple={true} disableRipple={true} onClick={() => handleEdit(props.postIndividual._id)}  >
                                        <EditIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton disabled disableFocusRipple={true} disableRipple={true}>
                                        <EditIcon />
                                    </IconButton>
                                )
                                }
                                {props.postIndividual.accessibilty === 'public' ? (
                                    props?.details?.resourceBox?.includes(props?.match?.params?.postId) ? (
                                        <IconButton disableFocusRipple={true} disableRipple={true} style={{ color: '#05A54B' }} onClick={() => RemoveResourceFromIndividual(props.match.params.postId)} size="small" variant="contained" color="primary" >
                                            <BookmarkIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton disableFocusRipple={true} disableRipple={true} style={{ color: '#05A54B' }} onClick={() => addResourceToIndividual(props.match.params.postId)} size="small" variant="contained" color="primary" >
                                            <BookmarkBorderOutlinedIcon />
                                        </IconButton>
                                    )
                                ) : (
                                    null
                                )
                                }
                                {props.postIndividual.accessibilty === "private" ? (
                                    <IconButton disabled disableFocusRipple={true} disableRipple={true}>
                                        <LockOpenIcon />
                                    </IconButton>
                                ) : (
                                    <IconButton disabled disableFocusRipple={true} disableRipple={true}>
                                        <PublicIcon />
                                    </IconButton>
                                )}
                            </div>
                        }
                        title={props.postIndividual.postByUserName}
                        subheader={moment(props.postIndividual.createdAt).fromNow()}
                    />
                    <CardContent>
                        <Typography style={{ marginBottom: '20px' }} variant="body2" color="textSecondary" component="p">
                            <pre dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(props?.postIndividual?.postContent?.replace(/<br\s*\/?>/gi, ' ')) }} />
                        </Typography>
                        {ImageFormat?.includes(props?.postIndividual?.fileContentType) && props?.postIndividual?.fileName && (
                            <ModalImage
                                small={process.env.NODE_ENV === 'development' ? `/posts/file/${props?.postIndividual?.fileName}` : `/posts/file/${props?.postIndividual?.fileName}`}
                                medium={process.env.NODE_ENV === 'development' ? `/posts/file/${props?.postIndividual?.fileName}` : `/posts/file/${props?.postIndividual?.fileName}`}
                                showRotate
                                imageBackgroundColor="transparent"
                                alt=""
                            />
                        )}
                        {ApplicationFormat?.includes(props?.postIndividual?.fileContentType) && props?.postIndividual?.fileName && (
                            <a className="link_button" style={{ color: 'black', textDecoration: 'none' }} rel="noopener noreferrer" href={process.env.NODE_ENV === 'development' ? `http://localhost:4000/posts/file/${props?.postIndividual?.fileName}` : `/posts/file/${props?.postIndividual?.fileName}`} target="_blank" >
                                <Button className="link_button_file" variant="contained" size="small">
                                    View Document
                                </Button>
                            </a>
                        )}
                        {TextFormat?.includes(props?.postIndividual?.fileContentType) && props?.postIndividual?.fileName && (
                            <a className="link_button" style={{ color: 'black', textDecoration: 'none' }} rel="noopener noreferrer" href={process.env.NODE_ENV === 'development' ? `http://localhost:4000/posts/file/${props?.postIndividual?.fileName}` : `/posts/file/${props?.postIndividual?.fileName}`} target="_blank" >
                                <Button className="link_button_file" variant="contained" size="small">
                                    View Document
                                </Button>
                            </a>
                        )}
                        {AudioAllFormat?.includes(props?.postIndividual?.fileContentType) && props?.postIndividual?.fileName && (
                            <ReactAudioPlayer
                                src={`/streamer/live/${props?.postIndividual?.fileName}`}
                                controls
                                controlsList="nodownload"
                            />
                        )}
                        {VideoFormat?.includes(props?.postIndividual?.fileContentType) && props?.postIndividual?.fileName && (
                            <ReactPlayer
                                className='react-player fixed-bottom'
                                url={`/streamer/live/${props?.postIndividual?.fileName}`}
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
                            props?.postIndividual?.upvotes?.includes(props?.auth?.user?.userId) ? (
                                <div className="down__vote">
                                    <IconButton disableFocusRipple={true} disableRipple={true} onClick={() => handleUpvoteFromIndividual(props.match.params.postId)} aria-label="add to favorites" style={{ color: `${props?.postIndividual?.upvotes?.includes(props?.auth?.user?.userId) ? "#0eaa49" : ""}` }}>
                                        <ThumbUpAltIcon />
                                        <Typography className={classes.up_votes_count} variant="h6" component="h6">
                                            {props?.postIndividual?.upvotes?.length}
                                        </Typography>
                                    </IconButton>
                                    <IconButton disableFocusRipple={true} disableRipple={true} onClick={() => handleDownvoteFromIndividual(props.match.params.postId)} aria-label="remove from favorites">
                                        <ThumbDownAltIcon />
                                        <Typography className={classes.down_votes_count} variant="h6" component="h6">
                                            {props?.postIndividual?.downvotes?.length}
                                        </Typography>
                                    </IconButton>
                                </div>
                            ) : (
                                <div className="up__vote">
                                    <IconButton disableFocusRipple={true} disableRipple={true} onClick={() => handleUpvoteFromIndividual(props.match.params.postId)} aria-label="add to favorites">
                                        <ThumbUpAltIcon />
                                        <Typography className={classes.up_votes_count} variant="h6" component="h6">
                                            {props?.postIndividual?.upvotes?.length}
                                        </Typography>
                                    </IconButton>
                                    <IconButton disableFocusRipple={true} disableRipple={true} onClick={() => handleDownvoteFromIndividual(props.match.params.postId)} aria-label="remove from favorites" style={{ color: `${props?.postIndividual?.downvotes?.includes(props?.auth?.user?.userId) ? "#0eaa49" : ""}` }}>
                                        <ThumbDownAltIcon />
                                        <Typography className={classes.down_votes_count} variant="h6" component="h6">
                                            {props?.postIndividual?.downvotes?.length}
                                        </Typography>
                                    </IconButton>
                                </div>
                            )
                        }
                        <IconButton
                            disableFocusRipple={true} disableRipple={true}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ChatBubbleOutlineIcon />
                            <Typography className={classes.comments_count} variant="h6" component="h6">
                                {props?.comments?.length}
                            </Typography>
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Divider />
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <form onSubmit={handleSubmit} >
                                <div className="comment__area">
                                    <TextField
                                        multiline
                                        className="text__field"
                                        id="standard-basic"
                                        label="Add a comment..."
                                        type="text"
                                        value={commentBody}
                                        onChange={(e) => setCommentBody(e.target.value)}
                                        name="commentBody"
                                    />
                                    <IconButton
                                        className={commentBody ? 'send__button' : 'disabled_color'}
                                        variant="contained"
                                        size="small"
                                        type="button"
                                        disabled={!commentBody}
                                        onClick={handleSubmit}
                                    >
                                        <SendIcon />
                                    </IconButton>
                                </div>
                            </form>
                            <div className="comments">
                                <FlipMove>
                                    {    //remain
                                        props.comments && props.comments.map((comment, index) => {
                                            return (
                                                <Box elevation={0} className="comment" key={index} >
                                                    <div className="content__comment">
                                                        <span className="commentBy">
                                                            {comment.commentBy}
                                                        </span>
                                                        <span dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinksForComments(comment.commentBody) }} className="commentBody" />
                                                        <span className="commentCreatedAt">
                                                            {moment(comment.commentCreatedAt).fromNow()}
                                                        </span>
                                                    </div>
                                                    {
                                                        (props.auth.user.userId === comment.commentByUser_id) ? (
                                                            <IconButton disableFocusRipple={true} disableRipple={true} className="post_delete" onClick={() => handleDeleteComment(comment._id)} color="default" aria-label="delete">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        ) : (
                                                            <IconButton disableFocusRipple={true} disableRipple={true} className="post_delete" disabled onClick={() => handleDeleteComment(comment._id)} color="default" aria-label="delete">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        )
                                                    }
                                                </Box>
                                            )
                                        })
                                    }
                                </FlipMove>
                            </div>
                        </CardContent>
                    </Collapse>
                </Card>
            </Container>
            <Fab
                className="go_back_button"
                onClick={() => props.history.goBack()}
            >
                <ArrowBackIcon />
            </Fab>

            {
                edit && (
                    <Drawer
                        edit={edit}
                        setEdit={setEdit}
                        editId={editId}
                    />
                )
            }
        </Layout>
    )
}

const mapStateToProps = (state) => {
    return {
        postIndividual: state.posts.postIndividual,
        auth: state.auth,
        comments: state.posts.comments,
        details: state.profile.details,
        loading: state.loading.loading
    }
}

export default connect(mapStateToProps, {
    profileDetails,
    getPostIndividual,
    postCommentFromIndividual,
    deleteComment,
    getPostComments,
    UpVoteFromIndividual,
    DownVoteFromIndividual,
    addresourcebox,
    removeFromResourceBox
})(PostIndividual)
