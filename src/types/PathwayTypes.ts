interface PathwayMoveRenderer {
    onIllegalMove(): void

    onMoveAddition(data: { move: string, piece: string, possibleNextMoveCount: number }): void
    onPositionChange(): void
}
export {type PathwayMoveRenderer}