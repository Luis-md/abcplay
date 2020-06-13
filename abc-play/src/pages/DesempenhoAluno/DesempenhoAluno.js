import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/authContext'
import Spinner from '../../components/Spinner'
import DesempenhoItem from '../Desempenho/DesempenhoItem'
import { Link } from 'react-router-dom'

const DesempenhoAluno = ({ aluno }) => {
   
    const[ loading, setLoading ] = useState(false)    
    const authContext = useContext(AuthContext)
    let [result, setResult] = useState([])

    const { user, meuAluno } = authContext

    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(user) {
            setLoading(false)
            if(meuAluno) {
                getEstatistica()
            }
        } else {
            setLoading(true)
        }
        //eslint-disable-next-line        
    }, [user])


    const getEstatistica = () => {
        let complete = []
        for (let [key, value] of Object.entries(meuAluno.desempenho)) {
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

    const dados = result.length > 0 ? (
            <div className="welcome-action">
                <h1>Este é o desempenho do aluno {meuAluno.estudante} no ABC Play</h1>
                {result.map(res => (
                    <DesempenhoItem key = {res.id} dados = {res} />
                ))}
                <Link to='/alunos'><button className='btn-quiz'>Voltar</button></Link>
            </div>
    ) : (
            <div className="welcome-action">
                <h1>{meuAluno.estudante} não possui registro de desempenho</h1>
                <Link to='/alunos'><button className='btn-quiz'>Voltar</button></Link>
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

export default DesempenhoAluno