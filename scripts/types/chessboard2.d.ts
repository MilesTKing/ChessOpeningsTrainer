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
}

declare interface Chessboard2Instance {
    start(): void
    clear(): void
    position(fen?: string, animate?: boolean): string | void
    orientation(): 'white' | 'black'
    destroy(): void
}

declare interface ChessboardDropEvent {
    source: string
    target: string
    piece: string
    newPos: Record<string, string>
    oldPos: Record<string, string>
    orientation: 'white' | 'black'
}
