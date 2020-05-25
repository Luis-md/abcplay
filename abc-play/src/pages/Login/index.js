import React, { useState, useContext, useEffect } from 'react'
import Spinner from '../../components/Spinner'
import AuthContext from '../../context/auth/authContext'

import './styles.css'

const Login = props => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const authContext = useContext(AuthContext)

    const { login, error, clearErrors, isAuthenticated, loading } = authContext

    useEffect(() => {

        if(isAuthenticated) {
            props.history.push('/user')
        }

        if(error) {
            console.error(error)
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history])

   const handleLogin = async (e) => {
        e.preventDefault()
        login({email, password})
    }

    return (
        <div className="login-content">
            {loading ? <Spinner /> : 
                <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input 
                    className="login-form" 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                <input 
                    className="login-form" 
                    type="password" 
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>

                <div className="form-footer">
                    <button className="cta-remember">Esqueci a senha</button>
                    <button type="submit" className="btn-login btn-register">Entrar</button>
                </div>
            </form>
            }
        </div>
    )
}

export default Login;