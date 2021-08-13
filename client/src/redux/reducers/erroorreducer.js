const initialState = {
    Errors: {}
}

const errorreducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ERRORS':
            return {
                ...state,
                Errors: action.payload
            }
        case 'CLEAN_ERRORS':
            return {
                ...state,
                Errors: []
            }
        default:
            return state;
    }
}

export default errorreducer