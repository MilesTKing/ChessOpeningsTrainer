import {Chess} from 'chess.js'
import {MoveListView} from 'ui/MoveListView'
function TrainingManager() {
    const chessBoard = new Chess()
    let accuracy = 0
    let activeNode
    let trainingPath

    function startTraining(selectedTrainingPath: SerializedPathNode[]){
        chessBoard.reset()
        trainingPath = selectedTrainingPath
        console.log(selectedTrainingPath)
    }
    function getPosition(){
        return chessBoard.fen({forceEnpassantSquare: true})
    }

    return {startTraining, getPosition}
}
export{ TrainingManager }