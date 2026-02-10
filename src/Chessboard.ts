import {onDropEvent} from "./types/ChessboardTypes";

function Chessboard(boardElementId: string, onDrop: onDropEvent)  {
    const config: Chessboard2Config = {
        position: 'start',
        draggable: true,
        onDrop,
        showErrors: 'console'
    }
    const graphicalBoard = Chessboard2(boardElementId, config);

    function setPosition(move: string){
        graphicalBoard.move(move);
    }
    return {setPosition}
}
export {Chessboard}