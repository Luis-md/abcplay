import React from 'react'
import './assuntos.css'
const AssuntosItem = ({ assunto }) => {
    const { title } = assunto
     
    return (
        <div>
            <button className='btn-play'>{ title }</button>
        </div>
    )
}

export default AssuntosItem