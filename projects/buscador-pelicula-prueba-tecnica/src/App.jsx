// import { useState } from 'react'
import './App.css'
import responseMovies from './mocks/with-results.json'
import { Movies } from './components/Movies.jsx'

function App() {

  const movies = responseMovies.Search

  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className='form'>
          <input type="text" placeholder='Avenger, Star Wars, The Matrix...' />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
