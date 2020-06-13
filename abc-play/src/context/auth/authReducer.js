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
    SET_LOADING,
    GET_PROFESSORES,
    FILTER_PROFESSORES,
    ADD_PROFESSOR,
    DEL_PROFESSOR,
    CLEAR_FILTER,
    GET_ALUNO
} from '../types'

export default (state, action) => {
    switch(action.type) {
        case USER_LOADED: 
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload,
                desempenho: action.payload.desempenho,
                meusProfessores: action.payload.professores
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
        case GET_PROFESSORES: 
            return {
                ...state,
                professores: action.payload
            }
        case FILTER_PROFESSORES:
            return {
                ...state,
                filtered: state.professores.filter(professor => {
                const regex = new RegExp(`${action.payload}`, 'gi')
                return professor.username.match(regex) || professor.email.match(regex)
            })
        }

        case ADD_PROFESSOR:
            return {
                ...state,
                meusProfessores: action.payload
            }
        case DEL_PROFESSOR:
            return {
                ...state,
                meusProfessores: action.payload
            }
        case GET_ALUNO: 
        return {
            ...state,
            meuAluno: action.payload
        }
        case CLEAR_FILTER: 
        return {
            ...state,
            filtered: null
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