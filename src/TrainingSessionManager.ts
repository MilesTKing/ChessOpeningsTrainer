import {Chess} from 'chess.js'
function TrainingSessionManager() {
    const chessBoard = new Chess()
    let accuracy = 0
    let activeNode
    let trainingPath

    function startTraining(boardElementId: string){
        chessBoard.reset()
    }
}
export{ TrainingSessionManager }