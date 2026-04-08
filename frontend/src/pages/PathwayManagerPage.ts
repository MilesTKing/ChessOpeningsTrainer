import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.css'
import {PathwayCustomizer} from '../PathwayCustomizer'
import {MoveListView} from '../ui/MoveListView';
import {ChessBoard} from '../ChessBoard'

const chessboard = ChessBoard('chessboard', onDrop)
const pathRenderer = MoveListView()
const pathManager = PathwayCustomizer(pathRenderer)
pathRenderer.onNodeSelected(nodeSelectionHandler)
pathRenderer.onNodeDeleted(nodeDeletionHandler)
pathManager.startPathCreation()

const flip_board_icon = document.getElementById("flip-board-icon")
if (flip_board_icon) {
    flip_board_icon.addEventListener("click", () => {
        chessboard.flipBoard()
    })
}

function onDrop(pieceMoved: ChessboardDropEvent) {
    try {
        const managerMove = pathManager.makeMove(pieceMoved.source, pieceMoved.target) //Assertion valid because makeMove will throw an error otherwise.
        chessboard.setPosition(pathManager.getPosition())
        pathRenderer.onMoveAddition({move: managerMove.move, piece: pieceMoved.piece, nodeIdIndex: managerMove.id})
    } catch (e) {
        return 'snapback'
    }
}

function nodeSelectionHandler(nodeId: number) {
    pathManager.setActiveNode(nodeId)
    const logicalBoardPosition = pathManager.getPosition()
    if (logicalBoardPosition) {
        chessboard.setPosition(logicalBoardPosition)
    }
}

function nodeDeletionHandler(parentNodeId: number, nodeId: number) {
    pathManager.deleteNode(parentNodeId, nodeId)
    chessboard.setPosition(pathManager.getPosition())
}

const saveButton = document.getElementById("save-button") as HTMLButtonElement
saveButton.addEventListener("click", () => {
    const pathName = prompt("Pathway name?")
    if (!pathName) {
        throw new Error(`Invalid path name`)
    }
    pathManager.savePath(pathName)
    console.log(localStorage.getItem("pathList"))

})

