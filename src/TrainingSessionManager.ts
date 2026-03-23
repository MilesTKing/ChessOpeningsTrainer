import {Chess} from 'chess.js'
function TrainingSessionManager() {
    const chessBoard = new Chess()
    let accuracy = 0
    let activeNode
    let trainingPath

    function startTraining(selectedTrainingPath: SerializedPathNode[]){
        chessBoard.reset()
        trainingPath = selectedTrainingPath
        console.log(selectedTrainingPath)
    }
    return {startTraining}
}
export{ TrainingSessionManager }