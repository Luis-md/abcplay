import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/authContext'
import Spinner from '../../components/Spinner'
import AlunoItem from './AlunoItem'

const Alunos = props => {
   
    const[ loading, setLoading ] = useState(false)    
    const authContext = useContext(AuthContext)

    const { user, meusAlunos } = authContext

    const [alunos, setAlunos] = useState([])

    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(user) {
            setLoading(false)
            if(user.type === "estudante") {
                props.history.push('/user')
            }
            if(user.alunos) {
                getAlunos()
            }
        } else {
            setLoading(true)
        }
        //eslint-disable-next-line        
    }, [user, props.history])

    const getAlunos = () => {
        let complete = []
        for (let [key, value] of Object.entries(user.alunos)) {
        let dado = {
            estudante: value.estudante,
            desempenho: value.desempenho,
            id: key
          }  
          complete.push(dado)
        }
        setAlunos(complete)
    }

    useEffect(() => {
        //eslint-disable-next-line
    }, [meusAlunos])

    const dados = alunos.length > 0 ? (
            <div className="welcome-action">
                <h1>{user && user.username}, estes são seus alunos no ABC Play</h1>
                {alunos.map(res => (
                    <AlunoItem key = {res.id} dados = {res} />
                ))}
            </div>
    ) : (
            <div className="welcome-action">
                <h1>{user && user.username}, avise seus alunos para lhe adicionar</h1>
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

export default Alunos