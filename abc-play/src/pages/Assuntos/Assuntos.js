import React, {useState, useContext, useEffect} from 'react'
import './assuntos.css'
import AuthContext from '../../context/auth/authContext'
import SeriesContext from '../../context/serie/seriesContext'

import AssuntosItem from './AssuntosItem'
import Spinner from '../../components/Spinner'

const Assuntos = () => {
    const[ loading, setLoading ] = useState(false)    
    const seriesContext = useContext(SeriesContext)

    const { assuntos } = seriesContext

    const authContext = useContext(AuthContext)

    const { user } = authContext

    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        console.log(assuntos)
        if(user) {
            setLoading(false)
        } else {
            setLoading(true)
        }        
    }, [assuntos, user])

    return (
        <div className='assuntos'>
            {loading ? <Spinner /> :
            <div> 
                <h1>Perfeito..falta só escolher o assunto do quiz</h1>
                {assuntos.map((assunto, index )=> (
                    <AssuntosItem key={assunto.title} pos={index} assunto={assunto}/>
                ))}
            </div>
            }
        </div>
    )
}

export default Assuntos
