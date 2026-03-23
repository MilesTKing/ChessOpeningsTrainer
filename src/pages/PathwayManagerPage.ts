import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.css'
import {PathwayCustomizer} from '../PathwayCustomizer'
import {MoveListView} from '../ui/MoveListView';
import {ChessBoard} from '../ChessBoard'

const chessboard = ChessBoard('chessboard', onDrop)
const pathRenderer = MoveListView()
const pathwayManagerPage = PathwayCustomizer(pathRenderer)
pathRenderer.onNodeSelected(nodeSelectionHandler)
pathRenderer.onNodeDeleted(nodeDeletionHandler)
pathwayManagerPage.startPathCreation()

const flip_board_icon = document.getElementById("flip-board-icon")
if (flip_board_icon) {
    flip_board_icon.addEventListener("click", () => {
        chessboard.flipBoard()
    })
}

function onDrop(pieceMoved: ChessboardDropEvent) {
    try {
        const managerMove = pathwayManagerPage.makeMove(pieceMoved.source, pieceMoved.target) //Assertion valid because makeMove will throw an error otherwise.
        chessboard.setPosition(pathwayManagerPage.getPosition())
        pathRenderer.onMoveAddition({move: managerMove.move, piece: pieceMoved.piece, nodeIdIndex: managerMove.id})
    } catch (e) {
        return 'snapback'
    }
}

function nodeSelectionHandler(nodeId: number) {
    pathwayManagerPage.setActiveNode(nodeId)
    const logicalBoardPosition = pathwayManagerPage.getPosition()
    if (logicalBoardPosition) {
        chessboard.setPosition(logicalBoardPosition)
    }
}

function nodeDeletionHandler(parentNodeId: number, nodeId: number) {
    pathwayManagerPage.deleteNode(parentNodeId, nodeId)
    chessboard.setPosition(pathwayManagerPage.getPosition())
}

const saveButton = document.getElementById("log-json")
if(saveButton) {
    saveButton.addEventListener("click", () => {
        const pathName = prompt("Pathway name?")
        localStorage.setItem("savedPath", pathwayManagerPage.savePath(pathName))
    })
}
