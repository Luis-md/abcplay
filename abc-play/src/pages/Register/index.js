import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

import './styles.css'
import Spinner from '../../components/Spinner'

const Register = props => {

    const authContext = useContext(AuthContext)
    const { register, error, clearErrors, isAuthenticated, loading } = authContext

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

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [type, setType] = useState("estudante")

    const [validName, setValidName] = useState(true)
    const [validPassword, setValidPassword] = useState(true)
    const [validConfPassword, setValidConfirmPassword] = useState(true)

    const handleRegister = async (e) => {
        e.preventDefault()
        if(name === "" || email === "" || password === "") {
            
            if(name === "") {
                setValidName(false)
            } else {
                setValidName(true)
            }

            if(password === "") {
                setValidPassword(false)
            } else {
                setValidPassword(true)
            }

            if(confirmPass === "") {
                setValidConfirmPassword(false)
            } else {
                setValidConfirmPassword(true)
            }
            
           return alert("Preencha todos os campos para realizar o cadastro")
        } else if (password !== confirmPass) {

            return alert ("Reveja as senhas..elas não estão iguais!")
        } else {
            register({ 
                name,
                email,
                password,
                type
             })
            
        }


    }

    return (

        <div className="register-content">
            {loading ? <Spinner /> :  
            <form onSubmit={handleRegister}>
                <h2>Cadastre-se</h2>
                <input 
                    className={validName ? "register-form" : "register-form error"} 
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
                    className={validPassword ? "register-form" : "register-form error"} 
                    type="password" 
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                <input 
                    className={validConfPassword ? "register-form" : "register-form error"} 
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
            </form>}
           
        </div>
    )
}

export default Register;