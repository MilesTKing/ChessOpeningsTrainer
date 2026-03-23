import {Chess} from 'chess.js'
import {MoveListView} from 'ui/MoveListView'
function TrainingManager() {
    const chessBoard = new Chess()
    let accuracy = 0
    let activeNode
    let trainingPath: SerializedPathNode[]

    function startTraining(selectedTrainingPath: PathMessage){
        chessBoard.reset()
        trainingPath = selectedTrainingPath.positions
        console.log(trainingPath)
    }
    function getPosition(){
        return chessBoard.fen({forceEnpassantSquare: true})
    }
    // function getRandomNode(){
    //     const rand = Math.floor(Math.random()*trainingPath.length)
    //     const position = getPathPosition()
    //
    // }
    // function getPathPosition(id: number){
    //     for (const node of trainingPath){
    //         if (node.id === id){
    //             return node
    //         }
    //     }
    //     return -1
    // }
    return {startTraining, getPosition}
}
export{ TrainingManager }