import { WINNER_COMBOS } from '../constants.js'

export const checkWinnerFrom = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver quien gano
    for (const [a, b, c] of WINNER_COMBOS) {
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            // gano el simbolo que esta en este turno
            return boardToCheck[a]
        }
    }
    // si no hay ganador
    return null;
}

export const checkEndGame = (newBoard) => {
    // Revisamos si hay un empata viendo si todos los espacios del tablero
    // estan ocupados
    return newBoard.every((square) => square !== null)
}