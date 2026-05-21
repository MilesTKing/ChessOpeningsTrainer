import '../../node_modules/@chrisoakman/chessboardjs/dist/chessboard-1.0.0.min.css'
import {PathwayCustomizer} from '../PathwayCustomizer'
import {MoveListView} from '../ui/MoveListView';
import {ChessBoard} from '../ChessBoard'
import {getCookie} from "../utils/cookies"

const chessboard = ChessBoard('chessboard', onDrop)
const pathRenderer = MoveListView()
const pathManager = PathwayCustomizer('api')
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
        chessboard.setPosition(pathManager.getBoardPosition())
        pathRenderer.onMoveAddition({move: managerMove.move, piece: pieceMoved.piece, nodeIdIndex: managerMove.id})
    } catch (e) {
        return 'snapback'
    }
}

function nodeSelectionHandler(nodeId: number) {
    pathManager.setActiveNode(nodeId)
    const logicalBoardPosition = pathManager.getBoardPosition()
    if (logicalBoardPosition) {
        chessboard.setPosition(logicalBoardPosition)
    }
}

function nodeDeletionHandler(parentNodeId: number, nodeId: number) {
    pathManager.deleteNode(parentNodeId, nodeId)
    chessboard.setPosition(pathManager.getBoardPosition())
}

const saveButton = document.getElementById("save-button") as HTMLButtonElement
saveButton.addEventListener("click", () => {
    const pathName = prompt("Pathway name?")
    if (!pathName) {
        throw new Error(`Invalid path name`)
    }
    pathManager.savePath(pathName)
})
const register_form = document.querySelector("#register_form") as HTMLFormElement;
const API_URL = import.meta.env.VITE_OPENINGS_API_URL
const REGISTER_URL = import.meta.env.VITE_REGISTER_URL

async function sendData() {
    if (!register_form) {
        return; //Raise error and alert user
    }
    const formData = new FormData(register_form);
    const csrftoken = getCookie('csrftoken');
    try {
        await fetch(API_URL + REGISTER_URL, {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRFToken": csrftoken || "",
            },
            credentials: "include"

        });
    } catch (e) {
        console.error(e);
    }
}

register_form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
});

