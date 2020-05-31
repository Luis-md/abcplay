import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/authContext'
import SeriesContext from '../../context/serie/seriesContext'
import Spinner from '../../components/Spinner'
import { Link } from 'react-router-dom'

import './result.css'

const Result = props => {

    const seriesContext = useContext(SeriesContext)
    const { titulo, quiz } = seriesContext
    
    const authContext = useContext(AuthContext)
    const { user, isAuthenticated, desempenho, acertos, erros } = authContext

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(isAuthenticated && acertos === 0 && erros === 0) {
            props.history.push('/user')
        } else if (!isAuthenticated) {
            props.history.push('/login')
        }
        // eslint-disable-next-line
    }, [isAuthenticated, quiz, props.history])


    useEffect(() => {
        if(desempenho) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [desempenho])

    const aproveitamento = (acertos * 100) / (acertos + erros)
    const resultStyle = aproveitamento > 70 ? 'acertos' : 'erros'
    
    const msg = aproveitamento > 70 ? `Muito bem..você mostrou que tem bom conhecimento sobre ${titulo}` 
    : `Talvez não tenha sido o resultado esperado. Volte a estudar sobre ${titulo} e para melhorar na próxima tentativa!`

    const resetResult = () => {

    }

    return (
        <div className='result'> 
              {loading ? <Spinner /> : 
                <div className='result-template'>
                    <h1>{user && user.username}, este foi seu resultado</h1>
                    <h2 className='intro'>Assunto - {titulo}</h2>
                    <h2 className='acertos'>Acertos - {acertos}</h2>
                    <h2 className='erros'>Erros -  {erros}</h2>
                    <h2 className={resultStyle}>Aproveitamento - {aproveitamento.toFixed(2)}%</h2>
                    <h2 className={`msg, ${resultStyle}`}>{msg}</h2>
                    <Link to='/user'><button className='btn-retornar' onClick={resetResult}>Retornar</button></Link>
                </div>
            }
        </div>
    )
}


export default Result