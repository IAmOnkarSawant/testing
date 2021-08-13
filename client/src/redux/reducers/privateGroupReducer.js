const initialState = {
    groups: [],
    groupsIndividualPosts: [],
    passcode: '',
    groupAdmin: '',
    isLoading : false,
    hasMore : false
}

const privategroupreducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCHER':
            return {
                ...state,
                isLoading : true
            }

        case 'HAS_MORE' : 
        return {
            ...state,
            hasMore : action.hasMore
        }
        case 'GET_PRIVATE_GROUPS':
            return {
                ...state,
                groups: action.payload
            }
        
        case 'CREATE_PRIVATE_GROUP':
            return {
                ...state,
                groups: [
                    action.payload,
                    ...state.groups,
                ],
                passcode: action.passcode
            }
        case 'GET_PRIVATE_POSTS_BY_GROUP_ID':
            return {
                ...state,
                groupsIndividualPosts: state.groupsIndividualPosts.concat(action.payload),
                groupAdmin: action.groupAdmin,
                isLoading: false
            }
        case 'CLEAR_INDIVIDUAL_POSTS':
            return {
                ...state,
                groupsIndividualPosts: []
            }
        case 'CREATE_PRIVATE_POST':
            return {
                ...state,
                groupsIndividualPosts: [
                    action.payload,
                    ...state.groupsIndividualPosts
                ]
            }

        //UPVOTES AND DOWNVOTES
        case 'UPVOTE_PRIVATE_POST':
            return {
                ...state,
                groupsIndividualPosts: state.groupsIndividualPosts.map(post => {
                    if (post._id === action.postId) {
                        return {
                            ...post,
                            upvotes: post.upvotes.includes(action.payload) ?
                                post.upvotes.filter(upvote => upvote !== action.payload) :
                                [
                                    ...post.upvotes,
                                    action.payload
                                ]
                            ,
                            downvotes: post.downvotes.filter(downvote => downvote !== action.payload)
                        }
                    }
                    return post
                })
            }
        case 'DOWNVOTE_PRIVATE_POST':
            return {
                ...state,
                groupsIndividualPosts: state.groupsIndividualPosts.map(post => {
                    if (post._id === action.postId) {
                        return {
                            ...post,
                            downvotes: post.downvotes.includes(action.payload) ?
                                post.downvotes.filter(downvote => downvote !== action.payload) :
                                [
                                    ...post.downvotes,
                                    action.payload
                                ]
                            ,
                            upvotes: post.upvotes.filter(upvote => upvote !== action.payload),
                        }
                    }
                    return post
                })
            }

        case 'DELETE_PRIVATE_POST':
            return {
                ...state,
                groupsIndividualPosts: state.groupsIndividualPosts.filter(post => post._id !== action.payload)
            }

        case 'CLEAN_PASSCODE':
            return {
                ...state,
                passcode: ''
            }

        case 'REPORT_PRIVATE_POST':
            return {
                ...state,
                groupsIndividualPosts: state.groupsIndividualPosts.map(post => {
                    if (post._id === action.payload) {
                        return {
                            ...post,
                            reports: [
                                ...post.reports,
                                action.userId
                            ]
                        }
                    }
                    return post
                })
            }
        default:
            return state;
    }
}

export default privategroupreducer;