import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    ADD_DESEMPENHO,
    RESULTADO_TEMPORARIO,
    CLEAR_RESULTADO,
    DESEMPENHO_FAIL,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS,
    SET_LOADING
} from '../types'

export default (state, action) => {
    switch(action.type) {
        case USER_LOADED: 
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                desempenho: action.payload.desempenho
            }
        case DESEMPENHO_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL: 
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {    
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {    
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false
            }
        case ADD_DESEMPENHO: 
            console.log('desempenho -', action.payload)
            return {
                ...state,
                desempenho: action.payload
            }
        case REGISTER_FAIL:
        case LOGOUT: 
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case RESULTADO_TEMPORARIO:
            return {
                ...state,
                acertos: action.payload.acertos,
                erros: action.payload.erros
            }
        case CLEAR_RESULTADO:
            return {
                ...state,
                acertos: 0,
                erros: 0
            }
        case CLEAR_ERRORS: 
            return {
                ...state,
                error: null
            }
            case SET_LOADING:
                return {
                    ...state,
                    loading: true
                }  
        default:
            return state
    }
}