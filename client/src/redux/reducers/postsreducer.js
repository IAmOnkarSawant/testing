const initialState = {
    categories: [],
    posts: [],
    postIndividual: {},
    comments: [],
    followedCategories: [],
    percentage: 0,
    isLoading: false,
    hasMore: false
}

const postreducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'GET_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        case 'CLEAN_GET_CATEGORIES':
            return {
                ...state,
                categories: [],
            }
        case 'CREATE_CATEGORY':
            return {
                ...state,
                categories: [
                    action.payload,
                    ...state.categories,
                ],
            }
        case 'REPORT_CATEGORY':
            return {
                ...state,
                categories: state.categories.map(category => {
                    if (category._id === action.payload) {              //action.payload = categoryId
                        return {
                            ...category,
                            reports: [
                                ...category.reports,
                                action.userId                        //action.userId = logged user's userId
                            ]
                        }
                    }
                    return category
                })
            }
        case 'REPORT_POST':
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post._id === action.payload) {              //action.payload = categoryId
                        return {
                            ...post,
                            reports: [
                                ...post.reports,
                                action.userId                        //action.userId = logged user's userId
                            ]
                        }
                    }
                    return post
                })
            }
        ////////////////////////
        case 'GET_POSTS_BY_CAT_ID':
            return {
                ...state,
                posts: state.posts.concat(action.payload),
                isLoading: false
            }
        case 'POST_CREATE':
            return {
                ...state,
                posts: [
                    action.payload,
                    ...state.posts,
                ]
            }
        case 'POST_EDIT':
            return {
                ...state,
                postIndividual: {
                    ...state.postIndividual,
                    postContent: action.payload.postContent
                }
            }
        case 'POST_DELETE':
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            }
        case 'CLEAN_POSTS':
            return {
                ...state,
                posts: []
            }
        case 'GET_INDIVIDUAL_POST_BY_POST_ID':
            return {
                ...state,
                postIndividual: action.payload
            }
        case 'GET_COMMENTS_BY_POST_ID':
            return {
                ...state,
                comments: action.payload
            }
        case 'COMMENT_DELETE':
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.payload)
            }
        ////////////////////////
        case 'FOLLOW_CATEGORY':
            // console.log(action.categoryId,action.payload)
            return {
                ...state,
                categories: state.categories.map((category) => {
                    if (category._id === action.categoryId) {
                        return {
                            ...category,
                            followers: [
                                ...category.followers,
                                action.payload
                            ],
                        }
                    }
                    return category
                })
            }
        case 'UNFOLLOW_CATEGORY':
            return {
                ...state,
                categories: state.categories.map((category) => {
                    if (category._id === action.categoryId) {
                        return {
                            ...category,
                            followers: category.followers.filter(follower => follower !== action.payload)
                        }
                    }
                    return category
                })
            }
        //////////////////////////

        case 'UPVOTE_POST':
            return {
                ...state,
                posts: state.posts.map((post) => {
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
        case 'DOWNVOTE_POST':
            return {
                ...state,
                posts: state.posts.map((post) => {
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
                            upvotes: post.upvotes.filter(upvote => upvote !== action.payload)
                        }
                    }
                    return post
                })
            }
        case 'UPVOTE_POST_INDIVIDUAL':
            return {
                ...state,
                postIndividual: {
                    ...state.postIndividual,
                    upvotes: state.postIndividual.upvotes.includes(action.payload) ?
                        state.postIndividual.upvotes.filter(upvote => upvote !== action.payload) :
                        [
                            ...state.postIndividual.upvotes,
                            action.payload
                        ]
                    ,
                    downvotes: state.postIndividual.downvotes.filter(downvote => downvote !== action.payload)
                }
            }
        case 'DOWNVOTE_POST_INDIVIDUAL':
            return {
                ...state,
                postIndividual: {
                    ...state.postIndividual,
                    downvotes: state.postIndividual.downvotes.includes(action.payload) ?
                        state.postIndividual.downvotes.filter(udownvote => udownvote !== action.payload) :
                        [
                            ...state.postIndividual.downvotes,
                            action.payload
                        ]
                    ,
                    upvotes: state.postIndividual.upvotes.filter(upvote => upvote !== action.payload)
                }
            }
        case 'POST_COMMENT_INDIVIDUAL': {
            return {
                ...state,
                comments: [
                    action.payload,
                    ...state.comments,
                ]
            }
        }
        case 'CLEAN_COMMENTS':
            return {
                ...state,
                comments: []
            }
        case 'CLEAR_INDIVIDUAL_POST':
            return {
                ...state,
                postIndividual: []
            }

        //Filter categories
        case 'POPULAR_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        case 'LATEST_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }
        case 'OLDEST_CATEGORIES':
            return {
                ...state,
                categories: action.payload
            }

        case 'FETCHER':
            return {
                ...state,
                isLoading: true
            }
        case 'FOLLOWED_CATEGORIES':
            return {
                ...state,
                followedCategories: state.followedCategories.concat(action.payload),
                isLoading: false
            }
        case 'HAS_MORE':
            return {
                ...state,
                hasMore: action.hasMore
            }

        case 'CLEAR_FOLLOWED_CATEGORIES':
            return {
                ...state,
                followedCategories: [],
            }

        case 'REPORT_FOLLOWED_CATEGORY':
            return {
                ...state,
                followedCategories: state.followedCategories.map(category => {
                    if (category._id === action.payload) {
                        return {
                            ...category,
                            reports: [
                                ...category.reports,
                                action.userId
                            ]
                        }
                    }
                    return category
                })
            }
        case 'UNFOLLOW_FOLLOWED_CATEGORY':
            return {
                ...state,
                followedCategories: state.followedCategories.filter(category => category._id !== action.categoryId),
            }

        case 'PROGRESS':
            return {
                ...state,
                percentage: action.payload
            }
        case 'ALREADY_EXISTED_POST':
            return {
                ...state,
                categories: [
                    action.payload.existedCategory,
                ]
            }
        default:
            return state;
    }
}

export default postreducer;