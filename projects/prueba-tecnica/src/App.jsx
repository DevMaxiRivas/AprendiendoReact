import './App.css'
import { useCatImage } from "./hooks/useCatImage"
import { useCatFact } from "./hooks/useCatFact"

export function App() {

    // Definicion de uso de customHooks
    const { fact, refreshFact } = useCatFact()
    const { imageUrl } = useCatImage({ fact })

    // MALA PRACTICA PARA FETCHING DE DATOS
    // Esto se ejecutaria cada vez que se renderice el componente
    // fetch('https://catfact.ninja/fact')
    //     .then(response => response.json)
    //     .then(data => setFact(data.fact))
    // cambiariamos el flujo de datos al cambiar el estado hariamos un bucle infinito no estamos controlando el flujo de renderizado de la app

    // Este useEffect solo se ejecutara la primera vez que se renderice
    // el componente

    // Los fetchs se hacen generalmente dentro de los useEffects o customHooks
    // Es recomendable que los efectos solo sean responsables de hacer
    // una tarea

    // IMPORTANTE
    // Normalmente cuando se vea un UseEffect en un componente de React hay
    // que preguntarse si deberia ser un CustomHook porque normalmente los
    // useEffect tiene carga de logica que se va a querer separar o reutilizar
    // que no se va a querer ver a mitad del componente

    const handleClick = async () => {
        refreshFact()
    }

    return (
        <main>
            <h1>App de Gatos</h1>
            <button onClick={handleClick}>Obtener nuevo hecho</button>
            <section>
                {/* Tener en cuenta para mostrar capacidades el renderizado condicional */}
                {fact && <p>{fact}</p>}
                {imageUrl && <img src={imageUrl} alt={`Imagen extraida usando las 3 primeras palabras ${fact}`} />}
            </section>
        </main>
    )
}