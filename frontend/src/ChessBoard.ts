import '../node_modules/@chrisoakman/chessboardjs/dist/chessboard-1.0.0.min.js'

function ChessBoard(boardElementId: string, onDrop, onMoveEnd?) {
    const config= {
        position: 'start',
        draggable: true,
        onDrop,
        onMoveEnd,
        pieceTheme: 'src/assets/{piece}.svg',
        showErrors: 'console'
    }
    const chessboard = Chessboard(boardElementId, config);
    function setPosition(position: string) {
        chessboard.position(position)
    }

    function flipBoard() {
        chessboard.flip();
    }

    return {setPosition, flipBoard}
}

export {ChessBoard}