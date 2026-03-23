import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.css'
import {TrainingSessionManager} from '../TrainingSessionManager'
import {ChessBoard} from '../ChessBoard'
import {MoveListView} from '../ui/MoveListView';

const chessboard = ChessBoard('chessboard', onDrop)
const trainingManager = TrainingSessionManager()

trainingManager.startTraining(JSON.parse(localStorage.getItem("savedPath")))
function onDrop(pieceMoved: ChessboardDropEvent) {
    return 'snapback'
}
