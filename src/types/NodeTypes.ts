interface PathNode {
    fen: string;
    id: number;
    nextPositions: Map<string, PathNode>;
}
interface SerializedPathNode {
    fen: string;
    id: number;
    nextPositions: {move: string, id: number}[]
}
interface SerializedPathNodeMove{
    id: number;
    move: string;
}
