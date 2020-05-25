import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import './styles.css'

const User = () => {
    const authContext = useContext(AuthContext)

    const { user } = authContext

    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    return (
        <div className="user-screen">
            <div className="welcome-action">
                <h1>Bem vindo, {user && user.username}</h1>
            </div>
        </div>
    )
}

export default User