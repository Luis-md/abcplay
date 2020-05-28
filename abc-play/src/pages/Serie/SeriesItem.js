import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import SeriesContext from '../../context/serie/seriesContext'
import './styles.css'


const SeriesItem = ({ serie, idx }) => {
    const seriesContext = useContext(SeriesContext)

    const { setAssuntos } = seriesContext

    
    const clicked = (index) => {
        setAssuntos(index)
    } 

    return (
        <div>
           <Link to='/assuntos' serie={serie.assuntos}> 
                <button className='btn-play' onClick={() => clicked(idx)}>{ serie.serie } série</button> 
            </Link>
        </div>
    )
}

export default SeriesItem