import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import SeriesContext from '../../context/serie/seriesContext'
import './assuntos.css'
const AssuntosItem = ({ assunto, pos }) => {
    const seriesContext = useContext(SeriesContext)

    const { title } = assunto

    const onClick = (id) => {
        console.log('assuntos item', id)
        seriesContext.setQuiz(id)
    }

    return (
        <div>
           <Link to='/quiz' assunto={assunto}> 
                <button className='btn-play' onClick={() => onClick(pos)}>{ title }</button> 
            </Link>
        </div>
    )
}

export default AssuntosItem