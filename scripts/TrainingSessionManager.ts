import {Chess} from 'chess.js'
import '../node_modules/@chrisoakman/chessboard2/dist/chessboard2.min.js'

function TrainingSessionManager(boardElementId = "trainingBoard") {
    const config = {
        position: 'start',
        draggable: true,
        onDrop,
    };
    const logicalBoard = new Chess();
    const graphicalBoard = Chessboard2(boardElementId, config);
    let userColor;
    let trainingPathway; //List of user moves and potential opponent responses.
    let trainingMove

    /**
     * Initializes chess state and UI chess board

     */
    function prepareForTraining(selectedOpeningColor: 'w' | 'b', selectedTrainingPath: string[]) {
        logicalBoard.reset()
        userColor = selectedOpeningColor
        trainingPathway = selectedTrainingPath
    }

    /**
     * Returns the FEN of the current board position
     * @returns {string}
     */
    function getFen(): string {
        return logicalBoard.fen()
    }
    /**
     * Fires when piece is dropped on chessboard. Returning 'snapback' to chessBoard2 reverts drop.
     * @param {Object} pieceMoved - The chessBoard library representation of piece object that was dropped
     */
    function onDrop (pieceMoved: string) {

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

export {TrainingSessionManager, Chess}