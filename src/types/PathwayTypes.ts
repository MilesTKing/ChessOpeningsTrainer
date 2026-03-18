interface PathwayMoveRenderer {

    onMoveAddition(data: { move: string, piece: string, nodeIdIndex: number }): void
}

export {type PathwayMoveRenderer}