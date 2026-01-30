import {Chess} from 'chess.js'
import '../node_modules/@chrisoakman/chessboard2/dist/chessboard2.min.js'

function PathwayCustomizer(){
    type playerColor = 'w' | 'b'
    interface Node {
        fen: string;
        nextPositions: Map<string, Node>;
    }
    const logicalBoard = new Chess();
    const graphicalBoard = Chessboard2(boardElementId, config);
    let userColor: playerColor;

    const config = {
        position: 'start',
        draggable: true,
        onDrop,
    }
    function createNode(fen: string): Node{
        let nextPositions: Map<string, Node> = new Map();
        return {fen, nextPositions}
    }
    function addPossibleMove(currentPosition: Node, moveToAdd: string){
        const newMoveNode = createNode(moveToAdd)
        currentPosition.nextPositions.set(moveToAdd, newMoveNode);
    }
    function removePossibleMove(currentPosition: Node, moveToRemove: string){
        currentPosition.nextPositions.delete(moveToRemove);
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