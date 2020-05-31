import React, {useState, useContext, useEffect} from 'react'
import './styles.css'
import AuthContext from '../../context/auth/authContext'
import SeriesContext from '../../context/serie/seriesContext'

import SeriesItem from './SeriesItem'
import Spinner from '../../components/Spinner'

const Series = () => {
    const[ loading, setLoading ] = useState(false)    
    const seriesContext = useContext(SeriesContext)

    const { series, loadSeries } = seriesContext

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
        loadSeries();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(series) {
            setLoading(false)
        } else {
            setLoading(true)
        }        
    }, [series])

    return (
        <div className='serie'>
            {series && !loading ? <div> 
                <h1>{user && user.username}, agora escolha a Série</h1>
                {series.map((serie, index )=> (
                    <SeriesItem key={serie.serie} idx={index} serie={serie}/>
                ))}
            </div> :

                <Spinner />
            }
        </div>
    )
}

export default Series