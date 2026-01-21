import {Chess} from 'chess.js'
import '../node_modules/@chrisoakman/chessboard2/dist/chessboard2.min.js'
function TrainingManager(boardElementId = "trainingBoard") {
    const gameLogic = new Chess()
    const chessBoard = Chessboard2(boardElementId, 'start')

    /**
     * Initializes chess state and UI chess board
     */
    function prepareForTraining() {
        chessBoard.start()
        gameLogic.reset()
    }
    function getFen() {
        return gameLogic.fen()
    }
    return {prepareForTraining, getFen}
}

export {TrainingManager, Chess}