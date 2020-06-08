import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/authContext'
import './styles.css'
import Spinner from '../../components/Spinner'
import { Link } from 'react-router-dom'

const Professor = () => {
   
    const[ loading, setLoading ] = useState(false)    
    const authContext = useContext(AuthContext)

    const { user } = authContext

    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(user) {
            setLoading(false)
        } else {
            setLoading(true)
        }        
    }, [user])

    return (
        <div className="user-screen">
            {loading ? <Spinner /> : 
            <div className="welcome-action">
                <h1>Olá, professor(a) {user && user.username}</h1>
                <Link to='#'><button className='btn-play'>Publicar quiz</button></Link>
                <Link to='#'><button className='btn-config'>Meus alunos</button></Link>
            </div>}
        </div>
    )
}

export default Professor