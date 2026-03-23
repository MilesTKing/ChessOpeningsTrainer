interface PathNode {
    fen: string;
    id: number;
    nextPositions: Map<string, PathNode>;
}
interface SerializedPathNode {
    fen: string;
    id: number;
    nextPositions: SerializedPathNodeMove[]
}
interface SerializedPathNodeMove{
    id: number;
    move: string;
}
