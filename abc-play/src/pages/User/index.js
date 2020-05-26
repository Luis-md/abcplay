import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/auth/authContext'
import './styles.css'
import Spinner from '../../components/Spinner'

const User = () => {
   
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
                <h1>Bem vindo, {user && user.username}</h1>
            </div>}
        </div>
    )
}

export default User