import '../node_modules/@chrisoakman/chessboardjs/dist/chessboard-1.0.0.min.js'

export default function ChessBoard(boardElementId: string, onDrop, onMoveEnd?) {
    const config= {
        position: 'start',
        draggable: true,
        onDrop: onDrop,
        onMoveEnd,
        pieceTheme: 'src/assets/{piece}.svg',
        showErrors: 'console'
    }
    const chessboard = Chessboard(boardElementId, config);
    function setPosition(position: string, useAnimation: boolean = true) {
        chessboard.position(position, useAnimation)
    }

    function flipBoard() {
        chessboard.flip();
    }

    return {setPosition, flipBoard}
}