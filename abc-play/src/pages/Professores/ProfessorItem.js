import React from 'react'
import './styles.css'


const ProfessorItem = ({ dados }) => {

    const nome = dados.username.charAt(0).toUpperCase() + dados.username.slice(1)

    return (
        <div className='desempenho-card'>
            <h2>{nome}</h2>
            <h3>Contato - {dados.email}</h3>
        </div>
    )
}

export default ProfessorItem