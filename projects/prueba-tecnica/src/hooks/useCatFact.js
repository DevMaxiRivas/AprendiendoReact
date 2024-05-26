import { useEffect, useState } from 'react'
import { getRandomFact } from "../services/facts.js"

// A la hora de definir un customHOOK NO divulgar con el nombre
// como esta implementada la logica del HOOK por ejemplo useFechCatFact()
// ahi se nota que esta haciendo un fetch cuando eso puede cambiar
export function useCatFact() {
    const [fact, setFact] = useState()

    // Aqui tenemos un método que recupera nuevos datos y ademas
    // actualiza el estado interno y la funcion que definimos se la 
    // deja para que se utilice afuera
    // Asi cuando se necesite que se actualice el estado interno del
    // hook useCatFact se llame a esa funcion
    const refreshFact = () => {
        // getRandomFact() devuelve una promesa
        // getRandomFact().then(setFact)
        // ==
        getRandomFact().then(newFact => setFact(newFact))
    }

    useEffect(refreshFact, [])

    // Devolvemos fact ya que es el estado donde se almacena
    // el hecho que se necesita y la funcion ya que es la que se 
    // utiliza en el boton de la app
    return { fact, refreshFact }
    // Evitar que se envie la funcion de actualizacion del estado interno
    // NO ENVIAR setFact

    // MALA PRACTICA:
    // NO HAY QUE DEJAR QUE set{estado} SE ENVIE A OTRO ARCHIVO
    // por ello getRandomFact devuelve unicamente el valor del hecho y
    // lo actualizamos dentro del archivo del componente

}