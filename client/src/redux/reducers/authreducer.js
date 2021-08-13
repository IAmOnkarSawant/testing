import isEmpty from '../../validations/is-empty'

const initialState = {
    isAuthenticated: false,
    user: {}
}

const authreducer = (state = initialState, action) => {
    // console.log(action)
    switch (action.type) {
        case 'SET_CUREENT_USER':
            return {
                ...state,
                isAuthenticated: !isEmpty(action.payload),
                user: action.payload,
            }
        case 'REGISTER_SUCCESS':
            return state;
        case 'LOGIN_SUCCESS':
            return state
        case 'LOGOUT_SUCCESS':
            return state;
        default:
            return state;
    }
}

export default authreducer;