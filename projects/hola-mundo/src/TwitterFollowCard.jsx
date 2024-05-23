
// Tener cuidado al pasar los parametros al componente {}
export function TwitterFollowCard({ userName, name }) {
    return (
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                {/* caso particular de los enlaces dinamicos (src) */}
                <img className='tw-followCard-avatar' src={`https://unavatar.io/${name}`} alt="Avatar de Maxi" />
                <div className='tw-followCard-info'>
                    <strong>{name}</strong>
                    <span className='tw-followCard-infoUserName'>@{userName}</span>
                </div>
            </header>
            <aside>
                <button className='tw-followCard-button'>
                    Seguir
                </button>
            </aside>
        </article>
    )
}