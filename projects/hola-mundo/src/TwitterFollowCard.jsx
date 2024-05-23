import { useState } from "react"
// Tener cuidado al pasar los parametros al componente {}
// Al no recibir algun prompt lo recomendable es definir un valor por defecto identificadorPrompt = 'unknown'
export function TwitterFollowCard({ children, formatUserName, userName = 'unknoWn', initialFollowing }) {

    // mala practica: las prompts del componente no pueden ser mutables si
    // username = "123"+username   MAL
    // cont userNameMod = "123"+username   BIEN

    // Definimos estados en react de manera que se tome el estado que se definio en App.jsx
    const [isFollowing, setIsFollowing] = useState(initialFollowing)
    //  ==
    // const state = useState(false)
    // const isFollowing = state[0];
    // const setisFollowing = state[1];

    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing ?
        'tw-followCard-button is-following' :
        'tw-followCard-button'

    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                {/* caso particular de los enlaces dinamicos (src) */}
                <img
                    className='tw-followCard-avatar'
                    src={`https://unavatar.io/${userName}`}
                    alt={`El avatar de ${userName}`} />
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>
                        {formatUserName(userName)}
                    </span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className="tw-followCard-text">
                        {text}
                    </span>
                    <span className="tw-followCard-stopFollow">
                        Dejar de Seguir
                    </span>
                </button>
            </aside>
        </article>
    )
}