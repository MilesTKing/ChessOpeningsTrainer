import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.min.js'
import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.css'
import {PathwayCustomizer} from '../PathwayCustomizer'
import {MoveListView} from '../ui/MoveListView';
import {Chessboard} from '../Chessboard'

const chessboard = Chessboard('chessboard', onDrop)
const pathRenderer = MoveListView()
const pathwayManager = PathwayCustomizer(pathRenderer)
pathRenderer.onNodeSelected(nodeSelectionHandler)
pathRenderer.onNodeDeleted(nodeDeletionHandler)
pathwayManager.beginPathCreation()

const flip_board_icon = document.getElementById("flip-board-icon")
if (flip_board_icon) {
    flip_board_icon.addEventListener("click", () => {
        chessboard.flipBoard()
    })
}

function onDrop(pieceMoved: ChessboardDropEvent) {
    try {
        const managerMove = pathwayManager.makeMove(pieceMoved.source, pieceMoved.target) //Assertion valid because makeMove will throw an error otherwise.
        chessboard.setPosition(pathwayManager.getPosition())
        pathRenderer.onMoveAddition({move: managerMove.move, piece: pieceMoved.piece, nodeIdIndex: managerMove.id})
    } catch (e) {
        return 'snapback'
    }
}

function nodeSelectionHandler(nodeId: number) {
    pathwayManager.setActiveNode(nodeId)
    const logicalBoardPosition = pathwayManager.getPosition()
    if (logicalBoardPosition) {
        chessboard.setPosition(logicalBoardPosition)
    }
}

function nodeDeletionHandler(parentNodeId: number, nodeId: number) {
    pathwayManager.deleteNode(parentNodeId, nodeId)
    chessboard.setPosition(pathwayManager.getPosition())
}

