import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/authContext'
import './styles.css'
import Spinner from '../../components/Spinner'
import BuscarItem from './BuscarItem'
import ProfessorFilter from './ProfessorFilter'
import { Link } from 'react-router-dom'

const BuscarProfessor = () => {
   
    const[ loading, setLoading ] = useState(false)    
    const authContext = useContext(AuthContext)

    const { user, getProfessores, filtered, professores } = authContext

    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(user) {
            setLoading(false)
            getProfessores()
        } else {
            setLoading(true)
        }
        //eslint-disable-next-line        
    }, [user])

    useEffect(() => {
        //eslint-disable-next-line
    }, [professores])

    const dados = professores.length > 0 ? (
            <div className="welcome-action">
                <h1>{user && user.username}, digite nome ou email do seu professor</h1>
                <ProfessorFilter />
                {filtered !== null ? filtered.map(prof => (
                    <BuscarItem key = {prof.email} dados = {prof} /> 
                )) : 
                professores.map(res => (
                    <BuscarItem key = {res.email} dados = {res} />
                ))
            }
                <Link to='/serie'><button className='btn-quiz'>Escolher quiz</button></Link>
            </div>
    ) : (
            <div className="welcome-action">
                <h1>O ABC Play não possui professores cadastrados ainda</h1>
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

export default BuscarProfessor