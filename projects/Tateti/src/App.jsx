import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinnerFrom, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'

import { saveGameToStorage, resetGameToStorage } from './logic/Storage/index.js'

function App() {

  // Declaraciones de estados
  // Mala practica:
  // No se deben definir los estados y todos los hooks dentro de una condicional
  // if(...) const [board, setBoard] = useState(Array(9).fill(null))
  // Ya que react internamente guarda la posicion en el codigo eb la que se
  // encuentra cada hook si lo ejecuta en un IF pierde las posiciones 

  // Los hooks siempre deben estar en el cuerpo de un componente

  // Si leemos el localStorage desde fuera es mucho mas lento que si lo leyeramos
  // de la otra forma ademas de que cada vez que se renderice el componente se volveria
  // a buscar las cosas al localStorage
  // const boardFromStorage = window.localStorage.getItem('board')


  // Como los estados solo se definen una vez es mas conveniente ponerlo aqui
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    // esto es lo mimo que turnFromStorage == null o undefined 
    return turnFromStorage ?? TURNS.x
  })

  // Null si no hay ganador, false si hay empate
  const [winner, setWinner] = useState(null)


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.x)
    setWinner(null)

    // Si reseteamos el juego tambien debemos resetear el localStorage
    resetGameToStorage()

  }

  const updateBoard = (index) => {
    // No actualizamos esta posicion si ya tiene algo o ya hay un ganador
    // se usa return ya que con esto sale de la funcion
    if (board[index] != null || winner != null) return

    // Actualozar tablero

    // Mala practica:
    // bord[index] = turn; setBoard(bord)
    // Esto esta mal ya que los prompts y los estados son inmutables
    // Ya que mutar un estado puede generar discrepancias en los renderizados
    // Los datos del nvo renderizado siempre deben ser nuevos

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambiar Turno
    const newTurn = turn === TURNS.x ? TURNS.o : TURNS.x
    setTurn(newTurn)


    // Guardamos la partida
    saveGameToStorage(newBoard, newTurn)

    // revisamos si hay ganador
    // hay que pasar newBoard porque setBoard es asincrono es decir que 
    // nada asegura que ya haya cambiado el board original
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner != null) {
      // Esto lo hariamos si no necesitaramos realizar cosas despues de obtener el ganador
      // setWinner(newWinner) 

      // Como necesitamos mostrar al ganador como setWinner es asincrono debemos
      // mandar un callback para que una vez que se cambie el estado recien siga
      // con la ejecucion ya con el estado modificado

      //   setWinner((prevWinner) => {
      //     console.log(`El valor de winner era ${prevWinner}, ahora su valor es ${newWinner}`)
      //     return newWinner
      //   })
      // }


      // Esto se hace ya que apenas se completen todas las casillas se quiere que se 
      // muestre el mensaje de empate
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }

  }


  return (
    <main className='board'>
      {/* Seccion Titulo */}
      <h1>TaTeTi</h1>

      {/* Boton de Reset */}
      <button onClick={resetGame}>
        Reiniciar Juego
      </button>


      {/* Seccion Tablero */}
      <section className='game'>
        {
          board.map((valueSquare, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {valueSquare}
              </Square>
            )
          })
        }
      </section>

      {/* Seccion Turnos */}
      <section className='turn'>
        <Square
          isSelected={turn === TURNS.x}
        >
          {TURNS.x}
        </Square>
        <Square
          isSelected={turn === TURNS.o}
        >
          {TURNS.o}
        </Square>
      </section>

      {/* Seccion Resultado */}
      <WinnerModal resetGame={resetGame} winner={winner} ></WinnerModal>
    </main>

  )
}

export default App
