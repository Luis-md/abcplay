import React from 'react'
import './style.css'


const DesempenhoItem = ({ dados }) => {

    return (
        <div className='desempenho-card'>
            <h2>Assunto - {dados.title}</h2>
            <h3>Acertos - {dados.acertos}</h3>
            <h3>Erros - {dados.erros}</h3>
            <h3>Jogado em - {dados.today}</h3>
        </div>
    )
}

export default DesempenhoItem