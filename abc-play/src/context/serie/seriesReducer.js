import {
    GET_SERIE,
    SET_QUIZ,
    SET_ASSUNTOS,
    CLEAR_ASSUNTOS,
    AUTH_ERROR

} from '../types'

export default (state, action) => {
    switch(action.type) {
        case GET_SERIE:
            return {
                ...state,
                series: action.payload,
                loading: false
            }

        case SET_ASSUNTOS: {
            return {
                ...state,
                assuntos: state.series[action.payload].assuntos,
            }
        }

        case SET_QUIZ: {
            return {
                ...state,
                quiz: state.assuntos[action.payload].questoes,
                titulo: state.assuntos[action.payload].title
            }
        }

        case CLEAR_ASSUNTOS: {
            return {
                ...state,
                assuntos: []
            }
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