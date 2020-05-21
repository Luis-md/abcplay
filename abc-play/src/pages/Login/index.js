import React, { useState } from 'react'
import Spinner from '../../components/Spinner'
import axios from 'axios'

import './styles.css'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = (e) => {
        e.preventDefault()

        const data = {
            email,
            password
        }

        console.log(data)
    }

    return (
        <div className="login-content">
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
        </div>
    )
}

export default Login;