import Axios from "axios"
import { toast } from "react-toastify"
import { AdminOptions } from "../../utils/utils"

export const profileDetails = () => {
    return (dispatch) => {
        dispatch({
            type: 'LOADING',
            payload: true
        })
        Axios.get(`/user/details/`)
            .then(({ data: { user } }) => {
                dispatch({
                    type: 'PROFILE_DETAILS',
                    payload: user
                })
                dispatch({
                    type: 'LOADING',
                    payload: false
                })
            })
            .catch(error => {
                console.log(error?.response?.data)
            })
    }
}

export const profileMyPosts = (page) => {
    return (dispatch) => {
        dispatch({
            type: 'FETHCER',
        })
        Axios.get(`/user/myposts/${page}`)
            .then(({ data: { posts } }) => {
                dispatch({
                    type: 'PROFILE_MYPOSTS',
                    payload: posts
                })
                dispatch({
                    type: 'HAS_MORE',
                    hasMore: posts.length > 0
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const profileResourceBox = (page) => {
    return (dispatch) => {
        dispatch({
            type: 'FETHCER',
        })
        Axios.get(`/user/resourcebox/${page}`)
            .then(({ data: { resourcebox } }) => {
                dispatch({
                    type: 'PROFILE_RESOURCEBOX',
                    payload: resourcebox
                })
                dispatch({
                    type: 'HAS_MORE',
                    hasMore: resourcebox.length > 0
                })
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}



export const profileResourceBoxDelete = (postId) => {
    return (dispatch) => {
        Axios.delete(`/user/resourcebox/${postId}`)
            .then(({ data }) => {
                dispatch({
                    type: 'PROFILE_RESOURCEBOX_DELETE',
                    payload: postId
                })
                toast.success('Post Deleted Successfully !', AdminOptions)
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}

export const changeUsername = (newUserName) => {
    return (dispatch) => {
        Axios.patch(`/user/changeusername/`, { newUserName })
            .then((data) => {
                dispatch({
                    type: 'CHANGE_USERNAME',
                    payload: newUserName
                })
            })
            .catch(error => {
                console.log(error.response.data)
                toast.error(error.response.data.message, AdminOptions)
            })
    }
}

export const changeDpOfUser = (file) => {
    return (dispatch) => {
        Axios.patch(`/user/changedp/`, file, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(({ data }) => {
                dispatch({
                    type: 'CHANGE_PROFILE_PHOTO',
                    payload: data.fileName
                })
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.data)
                toast.error(error.response.data.message, AdminOptions)
            })
    }
}

export const deleteMyPost = (postId) => {
    return (dispatch) => {
        Axios.delete(`/posts/delete/${postId}`)
            .then(({ data }) => {
                dispatch({
                    type: 'PROFILE_DELETE_MYPOST',
                    payload: postId
                })
                toast.success('Post Deleted Successfully !', AdminOptions)
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const changeGithub = (github) => {
    return (dispatch) => {
        Axios.patch(`/user/addgithub`, { github })
            .then(({ data }) => {
                dispatch({
                    type: 'CHANGE_GITHUB',
                    payload: {
                        github
                    }
                })
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.data)
                toast.error(error.response.data.message, AdminOptions)
            })
    }
}

export const changeLinkedIn = (linkedIn) => {
    return (dispatch) => {
        Axios.patch(`/user/addlinkedIn/`, { linkedIn })
            .then(({ data }) => {
                dispatch({
                    type: 'CHANGE_LINKEDIN',
                    payload: {
                        linkedIn
                    }
                })
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.data)
                toast.error(error.response.data.message, AdminOptions)
            })
    }
}

export const changeTwitter = (twitter) => {
    return (dispatch) => {
        Axios.patch(`/user/addtwitter/`, { twitter })
            .then(({ data }) => {
                dispatch({
                    type: 'CHANGE_TWITTER',
                    payload: {
                        twitter
                    }
                })
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.data)
                toast.error(error.response.data.message, AdminOptions)
            })
    }
}