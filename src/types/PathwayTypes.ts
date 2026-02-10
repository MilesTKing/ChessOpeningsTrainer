interface PathwayMoveRenderer {
    onIllegalMove(): void

    onMoveAddition(data: { move: string, piece: string, nodeIdIndex: number }): void
    onPositionChange(): void
}
export {type PathwayMoveRenderer}