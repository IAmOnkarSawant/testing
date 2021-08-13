import { Box, Button, CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { profileMyPosts, deleteMyPost } from '../../redux/actions/profileAction'
import moment from 'moment'
import FlipMove from 'react-flip-move'
import { Link } from 'react-router-dom'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PublicIcon from '@material-ui/icons/Public';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Waypoint } from 'react-waypoint'
import { replaceURLWithHTMLLinks } from '../../utils/utils'

function Myposts(props) {

    const [pageNumber, setPageNumber] = useState(1);
    const fetcher = () => {
        setPageNumber(page => page + 1)
    }

    const { profileMyPosts } = props
    useEffect(() => {
        profileMyPosts(pageNumber)
    }, [profileMyPosts, pageNumber])

    const handleDeleteResource = (postId) => {
        console.log(postId)
        props.deleteMyPost(postId)
    }

    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch({
                type: 'CLEAR_PROFILE_MYPOSTS'
            })
        }
    }, [dispatch])

    const EnterticketNotVisibleState = {
        opacity: 0.1
    };
    const LeaveticketNotVisibleState = {
        opacity: 0.1
    };

    return (
        <>
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
                {props?.myposts && props?.myposts.map(post =>
                    <Box position="relative" className="myposts" key={post._id} boxShadow={1}>
                        <div className="my_post_content">
                            <span className="my_post_createdAt">{moment(post.createdAt).fromNow()}</span>
                            <span className="my_post_postContent">
                                <pre className="myposts_pre" style={{ lineHeight: '28px' }} dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(post?.postContent?.replace(/<br\s*\/?>/gi, ' ')) }} />
                            </span>
                        </div>
                        <span className="my_post_accessibilty" >  {post.accessibilty === 'private' ? <LockOpenIcon /> : <PublicIcon />}</span>
                        <div className="my_post_buttons">
                            <Button className="resource__btns my_post_delete_button" variant="contained" size="small" onClick={() => handleDeleteResource(post._id)} >
                                <DeleteOutlineIcon style={{ marginRight: '10px' }} />  Delete
                            </Button>
                            <Link to={`/post/${post._id}/`}>
                                <Button className="resource__btns my_post_delete_view" variant="contained" size="small">
                                    <OpenInNewIcon style={{ marginRight: '10px' }} />  view
                                </Button>
                            </Link>
                        </div>
                    </Box>
                )}
            </FlipMove>

            {props.hasMore === true && props.isLoading === false && <Waypoint onEnter={fetcher} />}

            <br />
            {/* progress */}
            {(props.hasMore === true && (

                <div style={{ textAlign: "center" }}>
                    <CircularProgress size={50} thickness={3} />
                </div>

            ))}
            <br />
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        myposts: state.profile.myposts,
        isLoading: state.profile.isLoading,
        hasMore: state.profile.hasMore,
    }
}

export default connect(mapStateToProps, { profileMyPosts, deleteMyPost })(Myposts)
