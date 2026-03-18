import '../node_modules/@chrisoakman/chessboard2/dist/chessboard2.min.js'
import {onDropEvent} from "./types/ChessboardTypes";

function Chessboard(boardElementId: string, onDrop: onDropEvent)  {
    const config: Chessboard2Config = {
        position: 'start',
        draggable: true,
        onDrop,
        showErrors: 'console'
    }
    const chessboard = Chessboard2(boardElementId, config);

    function setPosition(position: string){
        chessboard.position(position)
    }
    function setMove(move: string){
        chessboard.move(move);
    }
    function getPosition(){
        return chessboard.position("fen");
    }
    function flipBoard(){
        chessboard.flip();
    }
    return {setMove, setPosition, getPosition, flipBoard}
}
export {Chessboard}