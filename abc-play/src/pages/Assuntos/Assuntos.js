import React, {useState, useContext, useEffect} from 'react'
import './assuntos.css'
import AuthContext from '../../context/auth/authContext'
import AssuntosContext from '../../context/assuntos/assuntosContext'

import AssuntosItem from './AssuntosItem'
import Spinner from '../../components/Spinner'

const Assuntos = () => {
    const[ loading, setLoading ] = useState(false)    
    const assuntosContext = useContext(AssuntosContext)

    const { assuntos, loadAssuntos } = assuntosContext

    const authContext = useContext(AuthContext)

    const { user } = authContext

    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(user) {
            setLoading(false)
        } else {
            setLoading(true)
        }        
    }, [user])

    useEffect(() => {
        loadAssuntos();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log('chamou')
        if(assuntos) {
            setLoading(false)
        } else {
            setLoading(true)
        }        
    }, [assuntos])

    return (
        <div className='assuntos'>
            {loading ? <Spinner /> :
            <div> 
                <h1>Escolha o assunto do quiz</h1>
                {assuntos.map(assunto => (
                    <AssuntosItem key={assunto.id} assunto={assunto}/>
                ))}
            </div>
            }
        </div>
    )
}

export default Assuntos
