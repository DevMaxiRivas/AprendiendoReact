
import React from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export function App() {

    const format = (userName) => '@' + userName;


    // Supongamos que tengo un json que ya transforme a objeto que obtuve
    // de la base de datos con todos los usuarios

    const users = [
        {
            userName: 'maxi.rivas.ok',
            name: 'Maxi Rivas',
            initialIsFollowing: true
        },
        {
            userName: 'maxi.ok',
            name: 'Eze Rivas',
            initialIsFollowing: false
        },
        {
            userName: 'vxnder',
            name: 'Vanderhard',
            initialIsFollowing: true
        },
        {
            userName: 'elonmusk',
            name: 'Elon Musk',
            initialIsFollowing: false
        }
    ]



    return (

        // Notas Curso
        // Mala practica dar estilo con margin o con padding porque podemos querer o no
        // que este componente tenga margin en otro lado donde se lo utilice
        // Mala practica en estados:
        //  Los estados de un padre no afectan a los estados de un hijo
        //  Si defino un estado aqui y a esa variable la paso en un prompt de
        //  otro elemento hijo el hijo no tomará el cambio cada vez que la variable
        //  cambie de estado
        // EL ESTADO SOLO SE INICIALIZA UNA VEZ

        // <> == <React.Fragment>
        // <div className='App'>
        //     {/* isFollowing == isFollowing = {true} */}
        //     {/* identificadorFuncion != identificadoFuncion() uno es definicion y el otro resultado de la ejecucion */}
        //     <TwitterFollowCard
        //         formatUserName={format}
        //         initialFollowing={false}
        //         userName="maxi.rivas.ok"
        //         name="Maxi Rivas">
        //         {/* Con el prompt children podemos inyectar el codigo directamente en el componente */}
        //         Soy children
        //     </TwitterFollowCard>

        //     <TwitterFollowCard
        //         formatUserName={format}
        //         initialFollowing={true}
        //         userName="maxi.ok"
        //         name="Eze Rivas">
        //         Eze Rivas
        //     </TwitterFollowCard>

        //     <TwitterFollowCard
        //         formatUserName={format}
        //         initialFollowing
        //         userName="vxnder"
        //         name="Vanderhard">
        //         Vanderhard
        //     </TwitterFollowCard>

        //     <TwitterFollowCard
        //         formatUserName={format}
        //         userName="elonmusk"
        //         name="Elon Musk">
        //         Elon Musk
        //     </TwitterFollowCard>

        //     <TwitterFollowCard formatUserName={format}> </TwitterFollowCard>

        // </div>


        <section className='App'>
            {
                users.map(({ userName, name, initialIsFollowing }) => (
                    <TwitterFollowCard
                        // La clave y su valor key son muy importantes porque lo necesita el DOM virtual
                        // Es recomendable utilizar el ID que proporciona la base de datos en este caso username
                        key={userName}
                        userName={userName}
                        formatUserName={format}
                        initialIsFollowing={initialIsFollowing}
                    >
                        {name}
                    </TwitterFollowCard>
                ))
            }
        </section>
    )
}
