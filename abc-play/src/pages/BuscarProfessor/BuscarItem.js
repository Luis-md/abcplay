import React, { useEffect, useState, useContext } from 'react'
import './styles.css'
import Spinner from '../../components/Spinner'
import AuthContext from '../../context/auth/authContext'


const BuscarItem = ({ dados }) => {

    const authContext = useContext(AuthContext)

    const { addProfessor, delProfessor, user, meusProfessores } = authContext
    
    const [isAdded, setAdded ] = useState(false) 

    const [loading, setLoading] = useState(false)

    const addProf = () => {
        setLoading(true)
        const enviar = {
            username: dados.username,
            email: dados.email,
            _id: dados.id,
            estudante: user.username,
            desempenho: user.desempenho        
        }

        addProfessor(enviar)
        setAdded(true)
    }

    const delProf = () => {
        setLoading(true)
        delProfessor({_id: dados.id})
        setAdded(false)
    }

    useEffect(() => {
        setLoading(false)
        if(meusProfessores) {
            Object.entries(meusProfessores).forEach(prof => {
                if(prof[0] === dados.id) {
                    console.log("caiu")
                    setAdded(true)
                }
            })
        }
        //eslint-disable-next-line
    }, [meusProfessores])
    
    const nome = dados.username.charAt(0).toUpperCase() + dados.username.slice(1)
    return (
        <div className='prof-card'>
            {loading ? <Spinner /> :
            <>
                <h2 className='prof-content'>{nome}</h2>
                <h3 className='prof-content'>Contato - {dados.email}</h3>
                
                {isAdded ? <button onClick={delProf} className='btn-remove prof-content'>Remover</button> :
                <button onClick={addProf} className='btn-add prof-content'>Adicionar</button>}
                
            </>
            }
        </div>
    )
}

export default BuscarItem