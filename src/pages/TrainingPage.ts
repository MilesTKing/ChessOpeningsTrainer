import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.css'
import {TrainingManager} from '../TrainingManager'
import {ChessBoard} from '../ChessBoard'
import {MoveListView} from '../ui/MoveListView';

const chessboard = ChessBoard('chessboard', onDrop)
const trainingManager = TrainingManager()

trainingManager.startTraining(JSON.parse(localStorage.getItem("savedPath")))
function onDrop(pieceMoved: ChessboardDropEvent) {
    return 'snapback'
}