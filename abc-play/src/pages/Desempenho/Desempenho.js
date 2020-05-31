import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/authContext'
import './style.css'
import Spinner from '../../components/Spinner'
import DesempenhoItem from './DesempenhoItem'
import { Link } from 'react-router-dom'

const Desempenho = () => {
   
    const[ loading, setLoading ] = useState(false)    
    const authContext = useContext(AuthContext)
    let [result, setResult] = useState([])

    const { user, desempenho } = authContext

    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(user) {
            setLoading(false)
            if(desempenho) {
                getEstatistica()
            }
            
            console.log('todo desempenho -', result)
        } else {
            setLoading(true)
        }
        //eslint-disable-next-line        
    }, [user])

    useEffect(() => {
        //eslint-disable-next-line
    }, [desempenho])

    const getEstatistica = () => {
        let complete = []
        for (let [key, value] of Object.entries(desempenho)) {
        let dado = {
            acertos: value.acertos,
            erros: value.erros,
            title: value.title,
            today: value.today,
            id: key
          }  
          complete.push(dado)
        }
        setResult(complete)
    }

    const dados = desempenho ? (
            <div className="welcome-action">
                <h1>{user && user.username}, este é o seu desempenho no ABC Play</h1>
                {result.map(res => (
                    <DesempenhoItem key = {res.id} dados = {res} />
                ))}
                <Link to='/serie'><button className='btn-quiz'>Escolher quiz</button></Link>
            </div>
    ) : (
            <div className="welcome-action">
                <h1>{user && user.username}, jogue partidas gerar dados de desempenho</h1>
                <Link to='/serie'><button className='btn-quiz'>Escolher quiz</button></Link>
            </div>
    )

    return (
        <div className="user-screen">
            {loading ? <Spinner /> : 
            dados
            }
        </div>
    )
}

export default Desempenho