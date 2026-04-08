import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.css'
import {TrainingManager} from '../TrainingManager'
import {ChessBoard} from '../ChessBoard'
import {MoveListView} from '../ui/MoveListView';

const chessboard = ChessBoard('chessboard', onDrop)
const trainingManager = TrainingManager()
let trainingPath = selectTrainingPath()
trainingManager.startTraining(trainingPath)
trainingManager.setRandomPuzzle()
function onDrop(pieceMoved: ChessboardDropEvent) {
    return 'snapback'
}
function selectTrainingPath(){
    const paths : PathMessage[]= JSON.parse(localStorage.getItem("pathList"))
    let pathList = ""
    paths.forEach(path=>{
        pathList= pathList+ `${path.name}\n`
    })
    const selectedPath = prompt(pathList)
    if(!selectedPath){
        return "default"
    }
    return selectedPath

}
function getPaths(){

}