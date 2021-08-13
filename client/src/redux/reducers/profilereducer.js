const initialState = {
    details: {},
    myposts: [],
    resourceBox: [],
    // socialHandles: [],
    privateJoinGroups: [],
    isLoading: false,
    hasMore: false
}

const profilereducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCHER':
            return {
                ...state,
                isLoading: true
            }
        case 'HAS_MORE':
            return {
                ...state,
                hasMore: action.hasMore,
            }

        case 'PROFILE_MYPOSTS':
            return {
                ...state,
                myposts: state.myposts.concat(action.payload),
                isLoading: false,
                hasMore: action.hasMore,
            }
        case 'CLEAR_PROFILE_MYPOSTS':
            return {
                ...state,
                myposts: [],
            }

        case 'PROFILE_DELETE_MYPOST':
            return {
                ...state,
                myposts: state.myposts.filter(mypost => mypost._id !== action.payload)
            }

        case 'PROFILE_RESOURCEBOX':
            return {
                ...state,
                resourceBox: state.resourceBox.concat(action.payload),
                isLoading: false,
                hasMore: action.hasMore,
            }
        case 'CLEAR_PROFILE_RESOURCEBOX':
            return {
                ...state,
                resourceBox: [],
            }

        case 'PROFILE_DETAILS':
            return {
                ...state,
                details: action.payload
            }
        // case 'CLEAR_PROFILE_DETAILS':
        //     return {
        //         ...state,
        //         details: {}
        //     }
        case 'PROFILE_RESOURCEBOX_DELETE':
            return {
                ...state,
                resourceBox: state.resourceBox.filter(resource => resource._id !== action.payload)
            }
        case 'ADD_POST_TO_RESOURCE':
            return {
                ...state,
                details: {
                    ...state.details,
                    resourceBox: [
                        ...state.details.resourceBox,
                        action.payload
                    ]
                }
            }
        case 'REMOVE_POST_FROM_RESOURCE':
            return {
                ...state,
                details: {
                    ...state.details,
                    resourceBox: state.details.resourceBox.filter(resource => resource !== action.payload)
                }
            }
        case 'CHANGE_USERNAME':
            return {
                ...state,
                details: {
                    ...state.details,
                    userName: action.payload
                }
            }
        //
        case 'CHANGE_GITHUB':
            return {
                ...state,
                details: {
                    ...state.details,
                    socialHandles: {
                        ...state.details.socialHandles,
                        github: action.payload.github
                    }
                }
            }
        case 'CHANGE_LINKEDIN':
            return {
                ...state,
                details: {
                    ...state.details,
                    socialHandles: {
                        ...state.details.socialHandles,
                        linkedIn: action.payload.linkedIn
                    }
                }
            }
        case 'CHANGE_TWITTER':
            return {
                ...state,
                details: {
                    ...state.details,
                    socialHandles: {
                        ...state.details.socialHandles,
                        twitter: action.payload.twitter
                    }
                }
            }

        case 'CHANGE_PROFILE_PHOTO':
            return {
                ...state,
                details: {
                    ...state.details,
                    fileName: action.payload
                }
            }
        // new private group added to myPrivateGroups Array
        case 'GROUP_ADDED':
            return {
                ...state,
                details: {
                    ...state.details,
                    myPrivateGroups: [
                        ...state.details.myPrivateGroups,
                        action.payload
                    ]
                }
            }

        case 'LEAVE_PRIVATE_GROUP':
            return {
                ...state,
                details: {
                    ...state.details,
                    myPrivateGroups: state.details.myPrivateGroups.filter(privateGroup => privateGroup !== action.payload)
                }
            }

        // case 'PRIVATE_JOIN_GROUPS_TEMPORARY_ARRAY':
        //     return {
        //         ...state,
        //         privateJoinGroups: [
        //             ...state.privateJoinGroups,
        //             action.payload
        //         ]
        //     }
        default:
            return state;
    }
}

export default profilereducer;