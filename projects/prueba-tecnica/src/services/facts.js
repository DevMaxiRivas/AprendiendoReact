// EN ARCHIVOS QUE TENGAN LOGICA DE NEGOCIO DONDE SOLO SE UTILICE
// JS VANILLA NO TENER DEPENDENCIAS DE REACT

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

// Definimos una funcion que traiga el hecho esta funcion solo
// se ejecutara dentro de un effect
export const getRandomFact = async () => {
    //El fetch me devuelve una promesa
    const res = await fetch(CAT_ENDPOINT_RANDOM_FACT)
    //El .json() me devuelve una promesa
    const data = await res.json()
    // Obtenemos el valor que se obtuvo de la api
    const { fact } = data
    return fact
}