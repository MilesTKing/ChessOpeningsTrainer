import {Chess} from 'chess.js'
import '../node_modules/@chrisoakman/chessboard2/dist/chessboard2.min.js'

function PathwayCustomizer(boardElementId: string){
    type playerColor = 'white' | 'black'
    interface Node {
        fen: string;
        nextPositions: Map<string, Node>;
    }
    const config: Chessboard2Config = {
        position: 'start',
        draggable: true,
        onDrop,
        showErrors: 'console'
    }
    let userColor: playerColor;
    const logicalBoard = new Chess();
    const graphicalBoard = Chessboard2(boardElementId, config);

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


    function onDrop (pieceMoved: ChessboardDropEvent) {
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