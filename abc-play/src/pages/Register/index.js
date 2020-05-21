import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import './styles.css'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [type, setType] = useState("estudante")

    const handleRegister = (e) => {
        e.preventDefault()

        const data = {
            name, 
            email,
            password,
            type
        }

        console.log(data)
    }

    return (
        <div className="register-content">
            <form onSubmit={handleRegister}>
                <h2>Cadastre-se</h2>
                <input 
                    className="register-form" 
                    type="text" 
                    placeholder="Usuário"
                    value={name}
                    onChange={e => setName(e.target.value)}/>
                <input 
                    className="register-form" 
                    type="email" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}/>
                <input 
                    className="register-form" 
                    type="password" 
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                <input 
                    className="register-form" 
                    type="password" 
                    placeholder="Confirme a senha"
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}/>
                <select 
                    placeholder="Tipo de cadastro"
                    value={type}
                    onChange={e => setType(e.target.value)}>
                        
                    <option 
                        className="register-form"
                        value="estudante"> Estudante</option>
                    <option 
                        className="register-form" 
                        value="professor">Professor</option>
                </select>

                <div className="form-footer">
                <Link to='/login' className="cta-login">Já possui conta? <span>Entrar</span></Link>
                <button type="submit" className="btn-form btn-register">Cadastrar</button>
                </div>
            </form>
        </div>
    )
}

export default Register;