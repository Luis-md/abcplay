import React, { useReducer } from 'react'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import AuthContext from './authContext'
import authReducer from './authReducer'

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


const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        desempenho: null,
        acertos: 0,
        erros: 0,
        loading: false,
        error: null
    }

    const [ state, dispatch ] = useReducer(authReducer, initialState);

    //Set loading
    const setLoading = () => dispatch({type: SET_LOADING})


    //Load user
    const loadUser = async () => {
        setLoading()
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('http://localhost:3333/user')
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    //Register user

    const register = async formData => {
        setLoading()
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:3333/cadastro', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: "error"
            })
        }
    }

    //Login user

    const login = async formData => {
        setLoading()
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post("http://localhost:3333/login", formData, config);
                if(!res.data.error) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        payload: res.data
                    })
                    loadUser()
                } else {
                    dispatch({type: LOGIN_FAIL, payload: res.data.error})
                }
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: 'error.response.data.msg'
            })
        }
    }

    //SET DESEMPENHO

    const addDesempenho = async assunto => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.post('http://localhost:3333/desempenho', assunto, config)
            dispatch({
                type: ADD_DESEMPENHO, 
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: DESEMPENHO_FAIL,
                payload: err.response 
            })
        }
    }

    //Set temp result

    const setTempResult = estatistica => {

            dispatch({
                type: RESULTADO_TEMPORARIO, 
                payload: estatistica
            })
    }

    //CLEAR RESULTADO
    const clearResult = () => {

        dispatch({
            type: CLEAR_RESULTADO
        })
}

    //Logout

    const logout = () => {
        dispatch({type: LOGOUT})
    }

    //Clear errors

    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    }

    return <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                desempenho: state.desempenho,
                acertos: state.acertos,
                erros: state.erros,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
                addDesempenho,
                setTempResult,
                clearResult
            }}>
            {props.children}
        </AuthContext.Provider>
}

export default AuthState;