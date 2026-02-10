import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.css'
import {PathwayCustomizer} from '../PathwayCustomizer'
import {moveListView} from '../ui/MoveListView';
import {Chessboard} from '../Chessboard'

const chessboard= Chessboard('chessboard', onDrop)
const pathRenderer= moveListView()
const pathwayManager = PathwayCustomizer(pathRenderer)
pathwayManager.beginPathCreation()

function onDrop (pieceMoved: ChessboardDropEvent) {
    try {
        const boardState= pathwayManager.makeMove(pieceMoved.source, pieceMoved.target)
        chessboard.setPosition(boardState)
    }
    catch (e) {
        console.error(e)
        return 'snapback'
    }
}
