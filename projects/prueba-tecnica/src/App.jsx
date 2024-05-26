import { useEffect, useState } from "react"
import './App.css'

// Datos API's
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
// Revisar el de abajo
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/'


export function App() {

    // Definicion de Estados
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()


    // MALA PRACTICA PARA FETCHING DE DATOS
    // Esto se ejecutaria cada vez que se renderice el componente
    // fetch('https://catfact.ninja/fact')
    //     .then(response => response.json)
    // o ponemos esto
    // cambiariamos el flujo de datos al cambiar el estado hariamos un bucle infinito no estamos controlando el flujo de renderizado de la app
    //     .then(data => setFact(data.fact))


    // Este useEffect solo se ejecutara la primera vez que se renderice
    // el componente

    // Los fetchs se hacen generalmente dentro de los useEffects
    // Es recomendable que los efectos solo sean responsables de hacer
    // una tarea

    // Efecto para traer el hecho de la API
    useEffect(() => {
        // Aqui se estan encadenando promesas
        fetch(CAT_ENDPOINT_RANDOM_FACT)     //El fetch me devuelve una promesa
            .then(res => res.json())    //.json() tambien devuelve una promes   => Tener en cuenta los errores para despues
            .then(data => {

                // Obtenemos el valor que se obtuvo de la api
                const { fact } = data;
                setFact(fact)
            })
    }, [])

    // Efecto para recuperar la imagfen cada vez que tenemos un hecho nuevo
    useEffect(() => {
        // Para la primera vez que se cargue el estado fact == null
        if (!fact) return
        const threeFirstWords = fact.split(" ", 3).join(" ")

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                const { _id } = response
                // MALA PRACTICA
                // En el estado siempre tenemos que tener lo minimo necesario
                // setImageUrl(`https://cataas.com/cat/${_id}`)
                setImageUrl(_id)
            })
    }, [fact])

    return (
        <main>
            <h1>App de Gatos</h1>
            <section>
                {/* Tener en cuenta para mostrar capacidades el renderizado condicional */}
                {fact && <p>{fact}</p>}
                {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Imagen extraida usando las 3 primeras palabras ${fact}`} />}
            </section>
        </main>
    )
}