import Axios from 'axios'
import { toast } from 'react-toastify'
import { AdminOptions } from '../../utils/utils'

export const reportPrivateGroupPost = (postId, userId) => {
    return (dispatch) => {
        Axios.post(`/posts/report/`, { postId })
            .then(({ data }) => {
                dispatch({
                    type: 'REPORT_PRIVATE_POST',
                    payload: postId,
                    userId: userId
                })
                console.log(data)
                toast.success(data.message, AdminOptions)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}

export const getprivateGroups = () => {
    return (dispatch) => {
        dispatch({
            type: 'LOADING',
            payload: true
        })
        Axios.get(`/privategroup/`)
            .then(({ data }) => {
                dispatch({
                    type: 'GET_PRIVATE_GROUPS',
                    payload: data.groups
                })
                dispatch({
                    type: 'LOADING',
                    payload: false
                })
                console.log(data)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }
}

export const createprivateGroup = (groupName) => {
    return (dispatch) => {
        dispatch({
            type: 'LOADING',
            payload: true
        })
        Axios.post(`/privategroup/create/`, { groupName })
            .then(({ data }) => {
                dispatch({
                    type: 'CREATE_PRIVATE_GROUP',
                    payload: data.newGroupDetails,
                    passcode: data.passcode
                })
                dispatch({
                    type: 'GROUP_ADDED',
                    payload: data.newGroupDetails._id
                })
                dispatch({
                    type: 'LOADING',
                    payload: false
                })
                toast.success(data.message, AdminOptions)
                console.log(data)
            })
            .catch(err => {
                console.log(err)
            })
    }
}

export const getprivateGroupPostsById = (privateGroupId, page) => {            //
    return (dispatch) => {
        dispatch({
            type: 'FETCHER',
        })
        Axios.get(`/privategroup/view/${privateGroupId}/${page}`)
            .then(({ data }) => {
                dispatch({
                    type: 'GET_PRIVATE_POSTS_BY_GROUP_ID',
                    payload: data.groupsPosts,
                    groupAdmin: data.groupAdmin
                })
                dispatch({
                    type: 'HAS_MORE',
                    hasMore: data.groupsPosts.length > 0
                })
                console.log(data.groupAdmin)
                console.log(data)
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: err.response.data
                })
                err.response.data.message && toast.error('👂 ' + err.response.data.message, AdminOptions)
                console.log(err.response.data)
            })
    }
}

export const createPrivateGroupPost = (data) => {
    return (dispatch) => {
        const Options = {
            onUploadProgress: (ProgressEvent) => {
                const { loaded, total } = ProgressEvent
                let percentage = Math.floor((loaded * 100) / total)
                console.log(percentage)
                dispatch({
                    type: 'PROGRESS',
                    payload: percentage
                })
            }
        }
        Axios.post(`/posts/create/`, data, Options)
            .then(({ data: { newPost } }) => {
                dispatch({
                    type: 'CREATE_PRIVATE_POST',
                    payload: newPost
                })
                setTimeout(() => {
                    dispatch({
                        type: 'PROGRESS',
                        payload: 0
                    })
                }, 1200)
                console.log(newPost)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}

export const joinPrivateGroup = (Joindata, history) => {
    return (dispatch) => {
        Axios.post(`/privategroup/join/`, Joindata)
            .then(({ data }) => {
                toast.success(data.message, AdminOptions)
                console.log(data)

                history.push(`/groups/${Joindata.groupName}/${Joindata.privateGroupId}/`)
            })
            .catch(error => {
                toast.error(error.response.data.message, AdminOptions)
                console.log(error.response)
            })
    }
}

export const leavePrivateGroup = (privateGroupId, history) => {
    return (dispatch) => {
        Axios.patch(`/privategroup/leave/`, { privateGroupId })
            .then(({ data }) => {
                dispatch({
                    type: 'LEAVE_PRIVATE_GROUP',
                    payload: privateGroupId
                })
                history.push('/groups/')
                toast.success(data.message, AdminOptions)
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}

//upvotes and downvotes

export const UpVote = (postId, userId) => {
    return (dispatch) => {
        Axios.patch(`/posts/upvote/`, { postId, userId })
            .then(({ data }) => {
                dispatch({
                    type: 'UPVOTE_PRIVATE_POST',
                    payload: userId,
                    postId: postId
                })
                console.log(postId)
                console.log(data)
            })
            .catch(error => {
                console.log(error)
                console.log(postId)
            })
    }
}

export const UpVoteFromIndividual = (postId, userId) => {
    return (dispatch) => {
        Axios.patch(`/posts/upvote/`, { postId, userId })
            .then(({ data }) => {
                dispatch({
                    type: 'UPVOTE_PRIVATE_POST_INDIVIDUAL',
                    payload: userId,
                    postId: postId
                })
                console.log(postId)
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.data)
                console.log(postId)
            })
    }
}

//downvotes
export const DownVote = (postId, userId) => {
    return (dispatch) => {
        Axios.patch(`/posts/downvote/`, { postId, userId })
            .then(({ data }) => {
                dispatch({
                    type: 'DOWNVOTE_PRIVATE_POST',
                    payload: userId,
                    postId: postId
                })
                console.log(data)
                console.log(postId)
            })
            .catch(error => {
                console.log(error.response.data)
                console.log(postId)
            })
    }
}

export const DownVoteFromIndividual = (postId, userId) => {
    return (dispatch) => {
        Axios.patch(`/posts/downvote/`, { postId, userId })
            .then(({ data }) => {
                dispatch({
                    type: 'DOWNVOTE_PRIVATE_POST_INDIVIDUAL',
                    payload: userId,
                    postId: postId
                })
                console.log(postId)
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.data)
                console.log(postId)
            })
    }
}

export const DeletePrivatePost = (postId) => {
    return (dispatch) => {
        Axios.delete(`/posts/delete/${postId}/`)
            .then(data => {
                dispatch({
                    type: 'DELETE_PRIVATE_POST',
                    payload: postId
                })
                toast.success('Post Deleted Successfully !', AdminOptions)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}


// export const privateJoinGroupstemperaryArray = (id) => {
//     return (dispatch) => {
//         dispatch({
//             type: 'PRIVATE_JOIN_GROUPS_TEMPORARY_ARRAY',
//             payload: id
//         })
//     }
// }