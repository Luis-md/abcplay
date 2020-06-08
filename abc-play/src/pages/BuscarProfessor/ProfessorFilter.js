import React, { useContext, useRef, useEffect } from 'react'
import AuthContext from '../../context/auth/authContext'
import './styles.css'

const ProfessorFilter = () => {
    const authContext = useContext(AuthContext)
    const text = useRef('')

    const { filtered, filterProfessores, clearFilter } = authContext;

    useEffect(() => {   
        if(filtered === null) {
            text.current.value = ''
        }
    })

    const onChange = e => {
        if(text.current.value !== '') {
            filterProfessores(e.target.value)
        } else {
            clearFilter();
        }
    }
    return (
        <form className='filter-form'>
            <input ref={text} type='text' placeholder='Filtre os professores...' onChange={onChange}/>
        </form>
    )
}

export default ProfessorFilter;
