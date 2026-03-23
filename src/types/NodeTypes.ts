interface PathNode {
    fen: string;
    id: number;
    nextPositions: Map<string, PathNode>;
}
interface PathMessage{
    "name": string
    "positions": SerializedPathNode[]
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
