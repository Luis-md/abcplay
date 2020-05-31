import React, { useReducer } from 'react'
import axios from 'axios'
import setAuthToken from '../../utils/setAuthToken'
import SeriesContext from './seriesContext'
import seriesReducer from './seriesReducer'

import {
    SET_LOADING,
    AUTH_ERROR,
    GET_SERIE,
    SET_QUIZ,
    SET_ASSUNTOS
} from '../types'


const SeriesState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null,
        loading: false,
        error: null,
        index: null,
        series: null,
        titulo: null,
        assuntos: [],
        questoes: [],
    }

    const [ state, dispatch ] = useReducer(seriesReducer, initialState);

    //Set loading
    const setLoading = () => dispatch({type: SET_LOADING})


    //Load series
    const loadSeries = async () => {
        setLoading()
        if(localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('http://localhost:3333/serie')
            dispatch({
                type: GET_SERIE,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: AUTH_ERROR
            })
        }
    }

    //Set assuntos
    const setAssuntos = (pos) => {
        dispatch({type: SET_ASSUNTOS, payload: pos})
    }

    //set quiz

    const setQuiz = (pos) => {
        console.log(pos)
        dispatch({type: SET_QUIZ, payload: pos})
    }
  
    return <SeriesContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                series: state.series,
                titulo: state.titulo,
                assuntos: state.assuntos,
                quiz: state.quiz,
                setAssuntos,
                loadSeries,
                setQuiz
            }}>
            {props.children}
        </SeriesContext.Provider>
}

export default SeriesState;