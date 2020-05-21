import React from 'react'

import { Link } from 'react-router-dom'

import Logo from '../assets/Frame.png'
import './styles.css'

const Navbar = () => {
    return (
        <div className='nav-container'>
            <Link to='/'><img src={Logo} alt="ABC-Play logo"/></Link>
            <nav>
                <Link to='cadastro'><button className='btn-register'>Criar conta</button></Link>
                <Link to='/login'><button className='btn-login'>Login</button></Link>
            </nav>
        </div>
    )
}

export default Navbar;