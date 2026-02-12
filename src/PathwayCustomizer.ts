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
     * Validates and makes move, throwing an invalid move error if invalid.
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
    function getPosition(){
        return logicalBoard.fen({forceEnpassantSquare: true})
    }

    function removePossibleMove(currentPosition: Node, moveToRemove: string){
        currentPosition.nextPositions.delete(moveToRemove);
    }

    /**
     * Resets logical chessboard to start position. Creates a node for the starting position
     */
    function beginPathCreation(boardElementId: string = "chessboard", playercolor: playerColor = 'white'){
        logicalBoard.reset()
        currentPositionNode = createNode(logicalBoard.fen())
    }
    function setNodeId(node: Node){
        nodeIdMap.set(nodeIdCounter.toString(), node)
        nodeIdCounter++
    }
    function getNodeId(node: Node){
        for(let [key,value] of nodeIdMap){
            if (value === node){
                return key
            }
        }
    }
    function setActiveNode(nodeId: number){
        const node = nodeIdMap.get(nodeId.toString())
        if (node){
            currentPositionNode = node
            logicalBoard.load(currentPositionNode.fen)
            return logicalBoard.fen()
        }
    }
    function getActiveNodeId(){
        return getNodeId(currentPositionNode)
    }
    console.log("testing chess.js get fen: ")
    logicalBoard.move({from: "e2", to: "e4"})
    logicalBoard.move({from: "e7", to: "e5"})
    logicalBoard.move({from: "d2", to: "d4"})
    console.log("logical board w/o override: "+ logicalBoard.fen())
    console.log("logical board with override: "+ logicalBoard.fen({ forceEnpassantSquare : true}))
    console.log("Test Done.")
    return {beginPathCreation, makeMove, setActiveNode, getActiveNodeId, getPosition}
}
export {PathwayCustomizer}