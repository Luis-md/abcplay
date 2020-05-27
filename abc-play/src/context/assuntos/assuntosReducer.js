import {
    GET_ASSUNTOS,
    AUTH_ERROR

} from '../types'

export default (state, action) => {
    switch(action.type) {
        case GET_ASSUNTOS:
            return {
                ...state,
                assuntos: action.payload,
                loading: false
            }
        case AUTH_ERROR: 
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }

        default:
            return state
    }
}