import {Chess} from 'chess.js'
import '../node_modules/@chrisoakman/chessboard2/dist/chessboard2.min.js'

function PathwayCustomizer(){
    type playerColor = 'white' | 'black'
    interface Node {
        fen: string;
        nextPositions: Map<string, Node>;
    }


    function onDrop (pieceMoved: ChessboardDropEvent) {
        try {
            const move = logicalBoard.move({from: pieceMoved.source, to: pieceMoved.target})
            currentPositionNode= addPossibleMove(currentPositionNode, logicalBoard.fen(), move.san)

        }
        catch (e) {
            console.error(e)
            return 'snapback'
        }
    }
    const config: Chessboard2Config = {
        position: 'start',
        draggable: true,
        onDrop,
        showErrors: 'console'
    }
    let userColor: playerColor;
    const logicalBoard = new Chess()
    let graphicalBoard
    let currentPositionNode: Node

    function createNode(fen: string): Node{
        let nextPositions: Map<string, Node> = new Map();
        return {fen, nextPositions}
    }

    /**
     * Adds a node to the current position's next position's list.
     * @returns {Node} Returns the node that was added to passed in Node's next position list.
     */
    function addPossibleMove(currentPosition: Node, fen: string, moveToAdd: string): Node{
        const newMoveNode = createNode(fen)
        currentPosition.nextPositions.set(moveToAdd, newMoveNode);
        return newMoveNode
    }

    function removePossibleMove(currentPosition: Node, moveToRemove: string){
        currentPosition.nextPositions.delete(moveToRemove);
    }


    function beginPathCreation(boardElementId: string = "chessboard", playercolor: playerColor = 'white'){
        logicalBoard.reset()
        graphicalBoard = Chessboard2(boardElementId, config);
        currentPositionNode = createNode(logicalBoard.fen())
    }

    return {beginPathCreation}
}
export {PathwayCustomizer}