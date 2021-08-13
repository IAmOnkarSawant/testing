import Axios from "axios"
import { toast } from "react-toastify"
import { AdminOptions, options } from "../../utils/utils"

export const reportCategory = (categoryId, userId) => {
    return (dispatch) => {
        Axios.post(`/category/report/`, { categoryId })
            .then(({ data }) => {
                dispatch({
                    type: 'REPORT_CATEGORY',
                    payload: categoryId,
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

export const reportFollowedCategory = (categoryId, userId) => {
    return (dispatch) => {
        Axios.post(`/category/report/`, { categoryId })
            .then(({ data }) => {
                dispatch({
                    type: 'REPORT_FOLLOWED_CATEGORY',
                    payload: categoryId,
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

export const reportPost = (postId, userId) => {
    return (dispatch) => {
        Axios.post(`/posts/report/`, { postId })
            .then(({ data }) => {
                dispatch({
                    type: 'REPORT_POST',
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

export const createCategory = (cat) => {
    return (dispatch) => {
        dispatch({
            type: 'LOADING',
            payload: true
        })
        Axios.post(`/category/`, cat)
            .then((response) => {
                dispatch({
                    type: 'CREATE_CATEGORY',
                    payload: response.data.category,
                    createdBy: response.data.category.createdBy
                })
                dispatch({
                    type: 'LOADING',
                    payload: false
                })
                console.log(response)
            })
            .catch((error) => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error
                });
                if (error.response.status === 400 && error.response.data.message === "The category you are trying to create exists already.Please consider following it instead.") {
                    dispatch({
                        type: 'LOADING',
                        payload: false
                    })
                    dispatch({
                        type: 'ALREADY_EXISTED_POST',
                        payload: {
                            existedCategory: error.response.data.category
                        }
                    })
                }
                toast.error(error.response.data.message, AdminOptions)
                console.log(error.response.data.message)
            })
    }
}

export const getCategories = () => {
    return (dispatch) => {
        dispatch({
            type: 'LOADING',
            payload: true
        })
        Axios.get(`/category`)
            .then((response) => {
                dispatch({
                    type: 'GET_CATEGORIES',
                    payload: response.data.categories
                })
                dispatch({
                    type: 'LOADING',
                    payload: false
                })
                // console.log(response.data.categories)
            })
            .catch((error) => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error
                });
                console.log(error)
            })
    }
}

export const getPosts = (categoryId, page) => {
    return (dispatch) => {
        dispatch({
            type: 'FETCHER'
        })
        Axios.get(`/category/getposts/${categoryId}/${page}`)
            .then(({ data: { category: { posts } } }) => {
                setTimeout(() => {
                    dispatch({
                        type: 'GET_POSTS_BY_CAT_ID',
                        payload: posts                 //reverse array 
                    })
                }, 2000)
                dispatch({
                    type: 'HAS_MORE',
                    hasMore: posts.length > 0
                })
                console.log(posts)
            })
            .catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error
                });
            })
    }
}

export const getPostComments = (postId) => {
    return (dispatch) => {
        Axios.get(`/posts/getcomments/${postId}`)
            .then(({ data: { comments } }) => {
                dispatch({
                    type: 'GET_COMMENTS_BY_POST_ID',
                    payload: comments.reverse()
                })
                console.log(comments)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}

export const postCreate = (data) => {
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
        // data is consist of newPost and categoryId
        Axios.post(`/posts/create/`, data, Options)
            .then(({ data }) => {
                dispatch({
                    type: 'POST_CREATE',
                    payload: data.newPost,
                    // newPostId: data._id
                })
                setTimeout(() => {
                    dispatch({
                        type: 'PROGRESS',
                        payload: 0
                    })
                }, 1200)
                console.log(data)
            })
            .catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data
                });
                console.log(error.response.data)
            })
    }
}

export const editPostContent = (postId, postContent) => {
    return (dispatch) => {
        Axios.patch(`/posts/edit/`, { postId, postContent })
            .then(({ data }) => {
                dispatch({
                    type: 'POST_EDIT',
                    payload: {
                        postContent
                    }
                })
                console.log(data);
            })
            .catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data
                });
                console.log(error.response.data)
                toast.error(error.response.data.message, AdminOptions)
            })
    }
}

export const getPostIndividual = (postId) => {
    return (dispatch) => {
        Axios.get(`/posts/getpost/${postId}`)
            .then(({ data: { postDetails } }) => {
                dispatch({
                    type: 'GET_INDIVIDUAL_POST_BY_POST_ID',
                    payload: postDetails
                })
            })
            .catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data
                });
                console.log(error.response.data)
            })
    }
}

export const postCommentFromIndividual = (commentData, postId) => {
    return (dispatch) => {
        Axios.post(`/posts/comment/`, commentData)
            .then(({ data }) => {
                dispatch({
                    type: 'POST_COMMENT_INDIVIDUAL',
                    payload: data.comment,
                    postId: postId
                })
                console.log(commentData)
                console.log(data)
                console.log(postId)
            })
            .catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data
                });
                console.log(error.response.data)
            })
    }
}

export const postDelete = (id) => {
    return (dispatch) => {
        Axios.delete(`/posts/delete/${id}`)
            .then(() => {
                dispatch({
                    type: 'POST_DELETE',
                    payload: id
                })
                toast.success('Post Deleted Successfully !', AdminOptions)
            })
            .catch(error => {
                dispatch({
                    type: 'GET_ERRORS',
                    payload: error.response.data
                });
                console.log(error.response.data)
            })
    }
}

export const deleteComment = (c_data) => {
    return (dispatch) => {
        Axios.delete(`/posts/comment/${c_data.postId}/${c_data.commentId}`)
            .then(({ data: { message } }) => {
                dispatch({
                    type: 'COMMENT_DELETE',
                    payload: c_data.commentId
                })
                console.log(message)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}

export const follow = (categoryId) => {
    return (dispatch) => {
        Axios.patch(`/category/follow/${categoryId}`)
            .then(({ data }) => {
                dispatch({
                    type: 'FOLLOW_CATEGORY',
                    payload: data.userId,               //userId
                    categoryId: categoryId          //categoryId
                })
                console.log(data)
            })
            .catch((error) => {
                console.log(error.response.data)
                toast.error(error.response.data.message, options)
            })
    }
}

export const unFollow = (categoryId) => {
    return (dispatch) => {
        Axios.patch(`/category/unfollow/${categoryId}`)
            .then(({ data }) => {
                dispatch({
                    type: 'UNFOLLOW_CATEGORY',
                    payload: data.userId,              //userId
                    categoryId: categoryId        //categoryId
                })
                console.log(data)
            })
            .catch((error) => {
                console.log(error.response.data)
                toast.error(error.response.data.message, options)
            })
    }
}

//upvotes
export const UpVote = (postId, userId) => {
    return (dispatch) => {
        Axios.patch(`/posts/upvote/`, { postId, userId })
            .then(({ data }) => {
                dispatch({
                    type: 'UPVOTE_POST',
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

export const UpVoteFromIndividual = (postId, userId) => {
    return (dispatch) => {
        Axios.patch(`/posts/upvote/`, { postId, userId })
            .then(({ data }) => {
                dispatch({
                    type: 'UPVOTE_POST_INDIVIDUAL',
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
                    type: 'DOWNVOTE_POST',
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
                    type: 'DOWNVOTE_POST_INDIVIDUAL',
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

export const addresourcebox = (postId) => {
    return (dispatch) => {
        Axios.post(`/posts/addtoresources/`, { postId })
            .then(({ data }) => {
                dispatch({
                    type: 'ADD_POST_TO_RESOURCE',
                    payload: postId
                })
                console.log(postId)
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}

export const removeFromResourceBox = (postId) => {
    return (dispatch) => {
        Axios.post(`/posts/removefromresources/`, { postId })
            .then(({ data }) => {
                dispatch({
                    type: 'REMOVE_POST_FROM_RESOURCE',
                    payload: postId
                })
                console.log(postId)
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}



//category filter
export const popularCategories = () => {
    return (dispatch) => {
        Axios.get(`/category/popular/`)
            .then(({ data }) => {
                dispatch({
                    type: 'POPULAR_CATEGORIES',
                    payload: data.categories
                })
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const latestCategories = () => {
    return (dispatch) => {
        Axios.get(`/category/latest/`)
            .then(({ data }) => {
                dispatch({
                    type: 'LATEST_CATEGORIES',
                    payload: data.categories
                })
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const oldestCategories = () => {
    return (dispatch) => {
        Axios.get(`/category/oldest/`)
            .then(({ data }) => {
                dispatch({
                    type: 'OLDEST_CATEGORIES',
                    payload: data.categories
                })
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const followedCategories = (pageNumber) => {
    return (dispatch) => {
        dispatch({ type: 'FETCHER' })
        Axios.get(`/category/followedCategories/${pageNumber}`)
            .then(({ data }) => {
                dispatch({
                    type: 'FOLLOWED_CATEGORIES',
                    payload: data.categories,
                })
                dispatch({
                    type: 'HAS_MORE',
                    hasMore: data.categories.length > 0
                })
                console.log(data)
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }
}

export const unFollowFollowedCategory = (categoryId) => {
    return (dispatch) => {
        Axios.patch(`/category/unfollow/${categoryId}`)
            .then(({ data }) => {
                dispatch({
                    type: 'UNFOLLOW_FOLLOWED_CATEGORY',
                    categoryId: categoryId        //categoryId
                })
                console.log(data)
            })
            .catch((error) => {
                console.log(error.response.data)
                toast.error(error.response.data.message, options)
            })
    }
}