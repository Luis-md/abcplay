import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/auth/authContext'

const AlunoItem = ({ dados }) => {

    const authContext = useContext(AuthContext)
    const nome = dados.estudante.charAt(0).toUpperCase() + dados.estudante.slice(1)

    const {getMeuAluno} = authContext

    const setAluno = (aluno) => {
        getMeuAluno(aluno)
    }

    const desempenho = dados.desempenho ? (
        <Link to='/desempenho-aluno'><button onClick={() => setAluno(dados)} className='btn-quiz'>Conferir desempenho</button></Link>
) : (
    <Link to='#'><button onClick={() => setAluno(dados)} className='btn-zerado'>Sem desempenho</button></Link>
)
    return (
        <div className='desempenho-card'>
            <h2>{nome}</h2>
            {desempenho}
        </div>
    )
}

export default AlunoItem