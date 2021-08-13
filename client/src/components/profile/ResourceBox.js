import { Box, Button, CircularProgress } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { profileResourceBox, profileResourceBoxDelete } from '../../redux/actions/profileAction'
import FlipMove from 'react-flip-move'
import moment from 'moment'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { Waypoint } from 'react-waypoint'
import { replaceURLWithHTMLLinks } from '../../utils/utils'

function ResourceBox(props) {

    const [pageNumber, setPageNumber] = useState(1);
    const fetcher = () => {
        setPageNumber(page => page + 1)
    }

    const { profileResourceBox } = props
    useEffect(() => {
        profileResourceBox(pageNumber)
    }, [profileResourceBox, pageNumber])

    const handleDeleteResource = (id) => {
        console.log(id)
        props.profileResourceBoxDelete(id)
    }

    const dispatch = useDispatch();
    useEffect(() => {
        return () => {
            dispatch({
                type: 'CLEAR_PROFILE_RESOURCEBOX'
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
                {props?.resourceBox && props?.resourceBox?.map(resource =>
                    <Box position="relative" className="resourceBox" key={resource._id} boxShadow={1}>
                        <div className="resourceBox_content">
                            <span className="resourceBox_createdAt">{moment(resource.createdAt).fromNow()}</span>
                            <span className="resourceBox_postContent">
                                <pre style={{ lineHeight: '28px' }} dangerouslySetInnerHTML={{ __html: replaceURLWithHTMLLinks(resource.postContent.replace(/<br\s*\/?>/gi, ' ')) }} />
                            </span>
                        </div>
                        <div className="resourceBox_buttons">
                            <Button className="resource__btns resourceBox_delete_button" color="secondary" variant="contained" size="small" onClick={() => handleDeleteResource(resource._id)} >
                                <DeleteOutlineIcon style={{ marginRight: '10px' }} />  Delete
                            </Button>
                            <Link to={`/post/${resource._id}/`}>
                                <Button className="resource__btns resourceBox_view" style={{ color: 'white' }} color="primary" variant="contained" size="small">
                                    <OpenInNewIcon style={{ marginRight: '10px' }} /> view
                                </Button>
                            </Link>
                        </div>
                    </Box>
                )}

                {props.hasMore === true && props.isLoading === false && <Waypoint onEnter={fetcher} />}

                <br />
                {/* progress */}
                {(props.hasMore === true && (

                    <div style={{ textAlign: "center" }}>
                        <CircularProgress size={50} thickness={3} />
                    </div>

                ))}
                <br />

            </FlipMove>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        resourceBox: state.profile.resourceBox,
        isLoading: state.profile.isLoading,
        hasMore: state.profile.hasMore,
    }
}

export default connect(mapStateToProps, { profileResourceBox, profileResourceBoxDelete })(ResourceBox)
