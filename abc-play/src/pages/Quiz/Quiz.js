import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import AuthContext from '../../context/auth/authContext'
import SeriesContext from '../../context/serie/seriesContext'
import Relogio from '../../assets/Cronometro.png'

const Quiz = props => {

    const seriesContext = useContext(SeriesContext)
    const { assunto, quiz } = seriesContext
    
    const authContext = useContext(AuthContext)
    const { isAuthenticated } = authContext

    const [resposta, setResposta] = useState(-1)
    const [atual, setAtual] = useState(0)
    const [counter, setCounter] = useState(10)
    const [showNext, setShowNext] = useState(false)
    const [ultima, setUltima] = useState(false)
    
    const [acertos, setAcertos] = useState(0)
    const [erros, setErros] = useState(0)

    const [btn_0, setBtn_0] = useState(false)
    const [btn_1, setBtn_1] = useState(false)
    const [btn_2, setBtn_2] = useState(false)
    const [btn_3, setBtn_3] = useState(false)


    useEffect(() => {
        authContext.loadUser();
    // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if(isAuthenticated && quiz === []) {
            props.history.push('/user')
        } else if (!isAuthenticated && assunto === []) {
            props.history.push('/login')
        }
        // eslint-disable-next-line
    }, [isAuthenticated, quiz, props.history])

    useEffect(() => {
        if(counter !== 0 && showNext === false) {
            setTimeout(() => {
                setCounter(counter -1)
            }, 1000)      
        } else {
            checkAnswer()
            if(atual === quiz.length - 1) {
                setUltima(true)
            }
            setShowNext(true)
            
        }
        // eslint-disable-next-line
    }, [counter])

    const chooseAnswer = (num) => {
        setResposta(num)

        resetBtn()

        switch (num) {
            case 0:
                return setBtn_0(true)
            case 1:
                return setBtn_1(true)
            case 2:
                return setBtn_2(true)
            default:
                return setBtn_3(true)
        }        
    }

    const checkAnswer = () => {
        if(quiz[atual].resp === resposta && counter === 0) {
            alert('Parabéns! Você é um gênio')
            setAcertos(acertos + 1)
        } else if (quiz[atual].resp !== resposta && counter === 0) {
            alert('Ops..Resposta errada..kkkkk')
            setErros(erros + 1)
        }
    }

    const resetBtn = () => {
            setBtn_0(false)
            setBtn_1(false)
            setBtn_2(false)
            setBtn_3(false)
    }

    const nextQuestion = () => {
        if(atual < quiz.length - 1) {
            setResposta(-1)
            setAtual(atual + 1)
            setShowNext(false)
            setCounter(10)
            resetBtn()
        } else {
            console.log("acabou")
            console.log(`Acertos -> ${acertos}`)
            console.log(`Erros -> ${erros}`)
        }
    }

    let avancarBtn = ultima ? 
    <div>
        <button className='btn-avancar' onClick={nextQuestion}>Gerar resultado</button>
    </div> :
    <div>
        <button className='btn-avancar' onClick={nextQuestion}>Próxima pergunta</button>
    </div>


    const nextBtn = showNext ? 
        <div>
            {avancarBtn}
        </div>
         :
        <div className="cronometro">
        <img src={Relogio} alt="Cronometro"/><h2>{counter} segundos...</h2>
    </div>


    let quizTemplate = quiz ? 
            <div className="quiz-template">
                <h1>{quiz[atual].pergunta}</h1>
                <button 
                    onClick={() => chooseAnswer(0)} 
                    className={btn_0 ? 'alt btn-alt-1' : 'btn-alt-1'}>
                        {quiz[atual].alt[0]}
                </button>
                <button 
                    onClick={() => chooseAnswer(1)} 
                    className={btn_1 ? 'alt btn-alt-2' : 'btn-alt-2'}>
                        {quiz[atual].alt[1]}
                </button>
                <button 
                    onClick={() => chooseAnswer(2)} 
                    className={btn_2 ? 'alt btn-alt-3' : 'btn-alt-3'}>
                        {quiz[atual].alt[2]}
                </button>
                <button 
                    onClick={() => chooseAnswer(3)} 
                    className={btn_3 ? 'alt btn-alt-4' : 'btn-alt-4'}>
                        {quiz[atual].alt[3]}
                </button>
            
                {nextBtn}
                
            </div> : 
            null
        

    console.log(quiz)

    return (
        <div className='quiz'> 
            <div>
                {quizTemplate}
            </div> 
        </div>
    )
}

export default Quiz