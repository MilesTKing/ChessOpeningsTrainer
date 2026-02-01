declare function Chessboard2(
    elementId: string | HTMLElement,
    config?: Chessboard2Config
): Chessboard2Instance

declare interface Chessboard2Config {
    position?: string
    draggable?: boolean
    orientation?: 'white' | 'black'
    onDrop?: (target: ChessboardDropEvent) => undefined | "snapback"
    onChange?: () => void
    showErrors: false | 'console' | 'alert' | ((error: ChessboardError) => void)
}

declare interface ChessboardError {
    errorCode: number
    errorString: string
    errorDataStructure?: any
}

declare interface ChessboardDropEvent {
    source: string
    target: string
    piece: string
    newPos: Record<string, string>
    oldPos: Record<string, string>
    orientation: 'white' | 'black'
}

declare interface Chessboard2Instance {
    /** Sets the board to the start position.

     If useAnimation is false, sets the position instantly.**/
    start(): void

    /** Removes all the pieces on the board.

     If useAnimation is false, removes pieces instantly.**/
    clear(): void

    /** Remove the widget from the DOM. **/
    destroy(): void

    /** Returns the current position as a Position Object.

     If the first argument is 'fen', returns the position as a FEN string.**/
    position(returnType?: 'fen')

    /** Animates to a new position.

     If useAnimation is false, sets the position instantly.**/
    position(fen?: PositionObject | 'fen' | 'start', useAnimation?: boolean): string

    orientation(): 'white' | 'black'
    orientation(side: 'white' | 'black' | 'flip'): void

    /** Returns the current position as a FEN string. **/
    fen(): string

    flip(): void
    resize(): void
    move(move: string | string[]): void
}

declare interface PositionObject {

}