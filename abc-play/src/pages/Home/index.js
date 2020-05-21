import React from 'react'
import './styles.css'

const Home = () => {
    return (
        <div>
            <div className='text content'>
                <h1>Aprenda Português<br /> de forma dinâmica e divertida!</h1>
                <p>ABC Play traz maior engajamento<br/> no processo de aprendizado.</p>
            </div>
           <footer>
               <ul>
                 <h3>Quem somos</h3>
                 <li>Missão</li> 
                 <li>Método</li> 
                 <li>Equipe</li>  
               </ul>

               <ul>
                 <h3>Aplicativos</h3>
                 <li>ABC Play para Android</li> 
                 <li>ABC Play para iOs</li>  
               </ul>

               <ul>
                 <h3>Ajuda e suporte</h3>
                 <li>FAQ de Escolas</li> 
                 <li>Perguntas frequentes</li>  
               </ul>

               <ul>
                 <h3>Redes sociais</h3>
                 <li>Linkedin</li> 
                 <li>Instagram</li>  
               </ul>
           </footer>
        </div>
    )
}

export default Home;