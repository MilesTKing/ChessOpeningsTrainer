import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.css'
import {PathwayCustomizer} from '../PathwayCustomizer'
import {moveListView} from '../ui/MoveListView';
import {Chessboard} from '../Chessboard'

const chessboard= Chessboard('chessboard', onDrop)
const pathRenderer= moveListView()
const pathwayManager = PathwayCustomizer(pathRenderer)
pathRenderer.onNodeSelected(nodeSelectionHandler)
pathwayManager.beginPathCreation()

function onDrop (pieceMoved: ChessboardDropEvent) {
    try {
        const managerMove= pathwayManager.makeMove(pieceMoved.source, pieceMoved.target) //Assertion valid because makeMove will throw an error otherwise.
        chessboard.setMove(managerMove.move)
        pathRenderer.onMoveAddition({move: managerMove.move, piece: pieceMoved.piece, nodeIdIndex: managerMove.id })
    }
    catch (e) {
        console.error(e)
        return 'snapback'
    }
}
function nodeSelectionHandler(nodeId: number){
    const logicalBoardPosition= pathwayManager.setActiveNode(nodeId)
    if (logicalBoardPosition){
        chessboard.setPosition(logicalBoardPosition)
    }
}

