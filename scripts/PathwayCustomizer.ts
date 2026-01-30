import {Chess} from 'chess.js'
import '../node_modules/@chrisoakman/chessboard2/dist/chessboard2.min.js'

function PathwayCustomizer(){
    const logicalBoard = new Chess();
    const graphicalBoard = Chessboard2(boardElementId, config);
    let userColor;
    const config = {
        position: 'start',
        draggable: true,
        onDrop,
    }

    interface Node {
        fen: string;
        nextPositions: Map<string, Node>;
    }
    function createNode(fen: string): Node{
        let nextPositions: Map<string, Node> = new Map();
        return {fen, nextPositions}
    }
    function addPossibleMove(currentMove: Node, moveToAdd: string){
        const newMoveNode = createNode(moveToAdd)
        currentMove.nextPositions.set(moveToAdd, newMoveNode);
    }
    function removePossibleMove(currentMove: Node, moveToRemove: string){
        currentMove.nextPositions.delete(moveToRemove);
    }


    function onDrop (pieceMoved: string) {

        try {
            logicalBoard.move({from: pieceMoved.source, to: pieceMoved.target})
        }
        catch (e) {
            console.error(e)
            return 'snapback'
        }
    }
}
export {PathwayCustomizer}