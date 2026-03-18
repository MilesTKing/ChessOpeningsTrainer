import {Chess} from 'chess.js'
import {PathwayMoveRenderer} from "./types/PathwayTypes";

interface Node {
    fen: string;
    id: number;
    nextPositions: Map<string, Node>;
}

type playerColor = 'white' | 'black'

function PathwayCustomizer(ui: PathwayMoveRenderer) {


    let userColor: playerColor;
    const logicalBoard = new Chess()
    let currentPositionNode: Node
    let nodeIdCounter = 0
    const nodeIdMap: Map<string, Node> = new Map()

    /**
     * Validates and makes move, throwing an invalid move error if invalid.
     */
    function makeMove(sourceSquare: string, targetSquare: string) {
        const move = logicalBoard.move({from: sourceSquare, to: targetSquare})
        currentPositionNode = addPossibleMove(currentPositionNode, logicalBoard.fen(), move.san)
        return {move: move.san, id: currentPositionNode.id}
    }

    function createNode(fen: string): Node {
        let nextPositions: Map<string, Node> = new Map();
        const newNode = {fen, id: nodeIdCounter, nextPositions}
        nodeIdMap.set(nodeIdCounter.toString(), newNode)
        nodeIdCounter++
        return newNode
    }

    function getNodeId(node: Node) {
        return node.id
    }

    function getNode(id: number) {
        return nodeIdMap.get(id.toString())
    }

    function setActiveNode(nodeId: number) {
        const node = getNode(nodeId)
        if (node) {
            currentPositionNode = node
            logicalBoard.load(currentPositionNode.fen)
            return logicalBoard.fen()
        }
    }

    function getActiveNodeId() {
        return getNodeId(currentPositionNode)
    }

    /**
     * Adds a node to the current position's next position's list.
     * @returns {Node} Returns the node that was added to passed in Node's next position list.
     */
    function addPossibleMove(currentPosition: Node, fen: string, moveToAdd: string): Node {
        const newMoveNode = createNode(fen)
        currentPosition.nextPositions.set(moveToAdd, newMoveNode);
        return newMoveNode
    }

    function deleteNode(parentNodeId: number, nodeId: number) {
        const parentNode = getNode(parentNodeId)
        const node = getNode(nodeId)
        if (!parentNode || !node) {
            return
        }
        parentNode.nextPositions.forEach((value, key) => {
            if (getNodeId(value) === +nodeId) {
                parentNode.nextPositions.delete(key)

                node.nextPositions.forEach((value, key) => {
                    deleteNode(nodeId, getNodeId(value))
                })
            }
        })
        nodeIdMap.delete(nodeId.toString())
        if (!getNode(currentPositionNode.id)) {
            currentPositionNode = parentNode
            logicalBoard.load(currentPositionNode.fen)
        }
    }

    /**
     *Gets logical board's position as a FEN. Shows en passant even if capture isn't possible
     */
    function getPosition() {
        return logicalBoard.fen({forceEnpassantSquare: true})
    }

    /**
     * Resets logical chessboard to start position. Creates a node for the starting position
     */
    function beginPathCreation() {
        logicalBoard.reset()
        currentPositionNode = createNode(logicalBoard.fen())
    }
    function savePath(){
        const rootNode = getNode(0)
        const json = JSON.stringify(rootNode)
        console.log(json)
    }


    return {beginPathCreation, makeMove, setActiveNode, getActiveNodeId, getPosition, deleteNode, savePath}
}

export {PathwayCustomizer}