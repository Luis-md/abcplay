import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/authContext'
import './styles.css'
import Spinner from '../../components/Spinner'
import ProfessorItem from './ProfessorItem'
import { Link } from 'react-router-dom'

const Professores = () => {
   
    const[ loading, setLoading ] = useState(false)    
    const authContext = useContext(AuthContext)

    const { user, meusProfessores } = authContext

    const [professores, setProfessores] = useState([])

    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(user) {
            setLoading(false)
            if(meusProfessores) {
                console.log("meus profs ->", meusProfessores)
                getProfessores()
            }
        } else {
            setLoading(true)
        }
        //eslint-disable-next-line        
    }, [user])

    const getProfessores = () => {
        let complete = []
        for (let [key, value] of Object.entries(meusProfessores)) {
        let dado = {
            username: value.username,
            email: value.email,
            id: key
          }  
          complete.push(dado)
        }
        setProfessores(complete)
    }

    useEffect(() => {
        //eslint-disable-next-line
    }, [meusProfessores])

    const dados = meusProfessores ? (
            <div className="welcome-action">
                <h1>{user && user.username}, estes são seus professores no ABC Play</h1>
                {professores.map(res => (
                    <ProfessorItem key = {res.email} dados = {res} />
                ))}
                <Link to='/buscar-professor'><button className='btn-quiz'>Buscar professor</button></Link>
                <Link to='/serie'><button className='btn-quiz'>Escolher quiz</button></Link>
            </div>
    ) : (
            <div className="welcome-action">
                <h1>{user && user.username}, procure e adicione seu professor</h1>
                <Link to='/buscar-professor'><button className='btn-quiz'>Buscar professor</button></Link>
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

export default Professores