declare function Chessboard2(
    elementId: string | HTMLElement,
    config?: Chessboard2Config
): Chessboard2Instance

declare interface Chessboard2Config {
    position?: string
    draggable?: boolean
    orientation?: 'white' | 'black'
    onDrop?: (move: {
        source: string
        target: string
        piece: string
    }) => void
    onDragStart?: (...args: any[]) => void
}

declare interface Chessboard2Instance {
    start(): void
    clear(): void
    position(fen?: string, animate?: boolean): string | void
    orientation(): 'white' | 'black'
    destroy(): void
}
