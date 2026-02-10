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
        const move= pathwayManager.makeMove(pieceMoved.source, pieceMoved.target) as string //Assertion valid because makeMove will throw an error otherwise.
        chessboard.setPosition(move)
        pathRenderer.onMoveAddition({move: move, piece: pieceMoved.piece })
    }
    catch (e) {
        console.error(e)
        return 'snapback'
    }
}
