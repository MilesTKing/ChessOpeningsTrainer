interface PathwayMoveRenderer {
    onIllegalMove(): void
    onMoveAddition(data: {
        move: string,
        possibleNextMoveCount: number,
    }): void
    onPositionChange(): void
}
export {type PathwayMoveRenderer}