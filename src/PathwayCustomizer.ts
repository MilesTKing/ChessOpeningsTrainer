import {Chess} from 'chess.js'
import '../node_modules/@chrisoakman/chessboard2/dist/chessboard2.min.js'
import {PathwayMoveRenderer} from "./types/PathwayTypes";

interface Node {
    fen: string;
    nextPositions: Map<string, Node>;
}

type playerColor = 'white' | 'black'

function PathwayCustomizer(ui: PathwayMoveRenderer) {


    let userColor: playerColor;
    const logicalBoard = new Chess()
    let graphicalBoard: Chessboard2Instance
    let currentPositionNode: Node
    let nodeIdCounter= 0
    const nodeIdMap: Map<string, Node> = new Map()
    /**
     * Validates and makes move, returning boolean that correlates to the validity of the move.
     */
    function makeMove (sourceSquare: string, targetSquare: string){
        const move = logicalBoard.move({from: sourceSquare, to: targetSquare})
        currentPositionNode = addPossibleMove(currentPositionNode, logicalBoard.fen(), move.san)
        const id= nodeIdCounter
        setNodeId(currentPositionNode)
        return {move: move.san, id}
        }



    function createNode(fen: string): Node{
        let nextPositions: Map<string, Node> = new Map();
        return {fen, nextPositions}
    }

    /**
     * Adds a node to the current position's next position's list.
     * @returns {Node} Returns the node that was added to passed in Node's next position list.
     */
    function addPossibleMove(currentPosition: Node, fen: string, moveToAdd: string): Node{
        const newMoveNode = createNode(fen)
        currentPosition.nextPositions.set(moveToAdd, newMoveNode);
        return newMoveNode
    }

    function removePossibleMove(currentPosition: Node, moveToRemove: string){
        currentPosition.nextPositions.delete(moveToRemove);
    }


    function beginPathCreation(boardElementId: string = "chessboard", playercolor: playerColor = 'white'){
        logicalBoard.reset()
        currentPositionNode = createNode(logicalBoard.fen())
    }
    function setNodeId(node: Node){
        nodeIdMap.set(nodeIdCounter.toString(), node)
        nodeIdCounter++
    }
    function getNodeId(nodeId: number){
        return nodeIdMap.get(nodeId.toString())
    }
    function setActiveNode(nodeId: string){
        const node = nodeIdMap.get(nodeId)
        if (node){
            currentPositionNode = node
            logicalBoard.load(currentPositionNode.fen)
            return logicalBoard.fen()
        }
    }

    return {beginPathCreation, makeMove, setActiveNode}
}
export {PathwayCustomizer}