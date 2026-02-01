import {Chess} from 'chess.js'
import '../node_modules/@chrisoakman/chessboard2/dist/chessboard2.min.js'

function TrainingSessionManager(boardElementId = "trainingBoard") {
    type playerColor = 'white' | 'black'
    const config: Chessboard2Config = {
        position: 'start',
        draggable: true,
        onDrop,
        showErrors: 'console',
    }
    const logicalBoard = new Chess();
    const graphicalBoard = Chessboard2(boardElementId, config);
    let userColor: playerColor;
    let trainingPathway; //List of user moves and potential opponent responses.
    let trainingMove

    /**
     * Initializes chess state and UI chess board

     */
    function prepareForTraining(selectedOpeningColor: playerColor, selectedTrainingPath: string) {
        logicalBoard.reset()
        userColor = selectedOpeningColor
        trainingPathway
    }

    /**
     * Returns the FEN of the current board position
     * @returns {string}
     */
    function getFen(): string {
        return logicalBoard.fen()
    }
    /**
     * Event listener for when piece is dropped onto a square. Returning 'snapback' to chessBoard2 reverts drop.
     * pieceMoved - The chessBoard library representation of piece object that was dropped
     */
    function onDrop (pieceMoved: ChessboardDropEvent) {
        console.log(pieceMoved)
        try {
            logicalBoard.move({from: pieceMoved.source, to: pieceMoved.target})
        }
        catch (e) {
            console.error(e)
            return 'snapback'
        }
    }
    return {prepareForTraining, getFen}

}

export {TrainingSessionManager}