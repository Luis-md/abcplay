import React, { useReducer } from 'react'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import AssuntosContext from './assuntosContext'
import assuntosReducer from './assuntosReducer'

import {
    SET_LOADING,
    AUTH_ERROR,
    GET_ASSUNTOS
} from '../types'


const AssuntosState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: false,
        error: null,
        assuntos: []
    }

    const [ state, dispatch ] = useReducer(assuntosReducer, initialState);

    //Set loading
    const setLoading = () => dispatch({type: SET_LOADING})


    //Load assuntos
    const loadAssuntos = async () => {
        setLoading()
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            console.log('chamou')
            const res = await axios.get('http://localhost:3333/assuntos')
            dispatch({
                type: GET_ASSUNTOS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

  
    return <AssuntosContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                assuntos: state.assuntos,
                loadAssuntos,
            }}>
            {props.children}
        </AssuntosContext.Provider>
}

export default AssuntosState;