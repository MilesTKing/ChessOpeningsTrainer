import {Chess} from 'chess.js'
import '../node_modules/@chrisoakman/chessboard2/dist/chessboard2.min.js'

function TrainingManager(boardElementId = "trainingBoard") {
    const logicalBoard = new Chess()
    let boardState
    const config = {
        position: 'start',
        draggable: true,
        onDrop,
        onDragStart: startMove,
    }
    const graphicalBoard = Chessboard2(boardElementId, config)

    /**
     * Initializes chess state and UI chess board
     */
    function prepareForTraining() {
        graphicalBoard.start()
        logicalBoard.reset()
    }
    function getFen() {
        return logicalBoard.fen()
    }
    return {prepareForTraining, getFen}

    /**
     * Fires when piece is dropped on chessboard. Returning 'snapback' to chessBoard2 reverts drop.
     * @param {Object} pieceMoved - The chessBoard library representation of piece object that was dropped
     */
    function onDrop (pieceMoved) {
        try {
            logicalBoard.move({from: pieceMoved.source, to: pieceMoved.target})
        }
        catch (e) {
            console.error(e)
            return 'snapback'
        }
    }

    function startMove(){
        boardState = logicalBoard.fen()
    }
}

export {TrainingManager, Chess}