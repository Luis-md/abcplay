import React, { Fragment, useContext } from 'react'

import { Link } from 'react-router-dom'

import AuthContext from '../context/auth/authContext'


import Logo from '../assets/Frame.png'
import './styles.css'

const Navbar = () => {
    const authContext = useContext(AuthContext)

    const { isAuthenticated, logout, user } = authContext

    const onLogout = () => {
        logout()
    }

    const authLinks = (
        <Fragment>
                <Link to='/' onClick={onLogout}><button className='btn-logout'>Sair</button></Link>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <Link to='/cadastro'><button className='btn-register'>Criar conta</button></Link>
            <Link to='/login'><button className='btn-login'>Login</button></Link>
        </Fragment>
    )


    return (
        <div className='nav-container'>
            <Link to='/'><img src={Logo} alt="ABC-Play logo"/></Link>
            <nav>
                {isAuthenticated ? authLinks : guestLinks}
            </nav>
        </div>
    )
}

export default Navbar;