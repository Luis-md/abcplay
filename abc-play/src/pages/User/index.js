import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/authContext'
import './styles.css'
import Spinner from '../../components/Spinner'
import { Link } from 'react-router-dom'

const User = props => {
   
    const[ loading, setLoading ] = useState(false)    
    const authContext = useContext(AuthContext)

    const { user } = authContext

    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(user) {
            if(user.type === "professor") {
                props.history.push('/professor')
            }
            setLoading(false)
        } else {
            setLoading(true)
        }        
    }, [user, props])

    return (
        <div className="user-screen">
            {loading ? <Spinner /> : 
            <div className="welcome-action">
                <h1>Bem vindo, {user && user.username}</h1>
                <Link to='/serie'><button className='btn-play'>Escolher quiz</button></Link>
                <Link to='/professores'><button className='btn-professores'>Meus professores</button></Link>
                <Link to='/desempenho'><button className='btn-config'>Desempenho</button></Link>
            </div>}
        </div>
    )
}

export default User