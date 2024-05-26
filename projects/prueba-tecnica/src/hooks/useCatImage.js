import { useEffect, useState } from 'react'

// Datos API's
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/'

// Creamos un customHook: tiene que comenzar con el prefijo use
// Hook para recuperar la imagen del gato

// Definimos que el parametro sea un objeto ya que es más escalable (extensibilidad de parametros)
// y obliga a que el identificador en donde se hace la llamada tenga el
// mismo nombre que el de la definicion de la funcion
export function useCatImage({ fact }) {
    // dentro del hook definimos estado
    const [imageUrl, setImageUrl] = useState()

    // Efecto para recuperar la imagfen cada vez que tenemos un hecho nuevo
    useEffect(() => {
        // Para la primera vez que se cargue el estado fact == null
        if (!fact) return

        const threeFirstWords = fact.split(" ", 3).join(" ")

        fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                const { _id } = response
                const url = `/cat/${_id}/says/${threeFirstWords}`
                // MALA PRACTICA
                // En el estado siempre tenemos que tener lo minimo necesario
                // setImageUrl(`https://cataas.com/cat/${_id}`)
                setImageUrl(url)
            })
    }, [fact])

    // necesitamos que el hook al obtener la imagen la retorne por ello
    // debemos evitar devolver setImageUrl salvo que debamos hacer un cambio 
    // desde fuera

    // Esta bien devolver la url completa aqui ya que no estamos alterando el 
    // estado interno
    return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }

    // con ello nuestro hook podemos ver que tiene un estado interno que
    // tiene un useEffect que cada vez que el parametro que le hemos pasado
    // que es el fact va a volver a pedir los datos a la API va a guardar la
    // imagen en el estado interno y el valor del estado estara disponible
    // por el retorno del hook
}