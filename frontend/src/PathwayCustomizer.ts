import {Chess} from 'chess.js'
import {getCookie} from "./utils/cookies"
type playerColor = 'white' | 'black'

function PathwayCustomizer(storageMethod: 'api' | 'localStorage') {

    const API_BASE_URL = import.meta.env.VITE_OPENINGS_API_BASE_URL;
    const API_CSRF = import.meta.env.VITE_OPENINGS_API_CSRF;
    const OPENINGS_URL = import.meta.env.VITE_OPENINGS_API_OPENINGS;
    let userColor: playerColor;
    const chessBoard = new Chess()
    let currentPositionNode: PathNode
    let nodeIdCounter = 0
    const nodeIdMap: Map<string, PathNode> = new Map()

    /**
     * Validates and makes move, throwing an invalid move error if invalid.
     */
    function makeMove(sourceSquare: string, targetSquare: string) {
        const move = chessBoard.move({from: sourceSquare, to: targetSquare})
        currentPositionNode = addPossibleMove(currentPositionNode, chessBoard.fen(), move.san)
        return {move: move.san, id: currentPositionNode.id}
    }

    function createNode(fen: string): PathNode {
        let nextPositions: Map<string, PathNode> = new Map();
        const newNode = {fen, id: nodeIdCounter, nextPositions}
        nodeIdMap.set(nodeIdCounter.toString(), newNode)
        nodeIdCounter++
        return newNode
    }

    function getNodeId(node: PathNode) {
        return node.id
    }

    function getNode(id: number) {
        return nodeIdMap.get(id.toString())
    }

    function setActiveNode(nodeId: number) {
        const node = getNode(nodeId)
        if (node) {
            currentPositionNode = node
            chessBoard.load(currentPositionNode.fen)
            return chessBoard.fen()
        }
    }

    function getActiveNodeId() {
        return getNodeId(currentPositionNode)
    }

    /**
     * Adds a node to the current position's next position's list.
     * @returns {PathNode} Returns the node that was added to passed in PathNode's next position list.
     */
    function addPossibleMove(currentPosition: PathNode, fen: string, moveToAdd: string): PathNode {
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

                node.nextPositions.forEach((value) => {
                    deleteNode(nodeId, getNodeId(value))
                })
            }
        })
        nodeIdMap.delete(nodeId.toString())
        if (!getNode(currentPositionNode.id)) {
            currentPositionNode = parentNode
            chessBoard.load(currentPositionNode.fen)
        }
    }

    /**
     *Gets logical board's position as a FEN. Shows en passant even if capture isn't possible
     */
    function getBoardPosition() {
        return chessBoard.fen({forceEnpassantSquare: true})
    }

    /**
     * Resets logical chessboard to start position. Creates a node for the starting position
     */
    function startPathCreation() {
        chessBoard.reset()
        currentPositionNode = createNode(chessBoard.fen())
    }
    function flattenPath(rootNode = getNode(0) as PathNode, savedNodeList: SerializedPathNode[] = []){
        const nextMoveList: SerializedPathNodeMove[] = []
        const node = {fen: rootNode.fen, id: rootNode.id, nextPositions: nextMoveList}
        savedNodeList.push(node)
        for (const nextPosition of rootNode.nextPositions){
            const move = nextPosition[0]
            const id = nextPosition[1].id
            nextMoveList.push({move,id})
            flattenPath(nextPosition[1], savedNodeList)
        }
        return savedNodeList
    }
    async function savePath(pathName: string){
        const nodeList = flattenPath(getNode(0))
        const nodePath: PathMessage = {"name": pathName, "positions": nodeList}
        if (storageMethod === 'api'){
            const csrftoken = getCookie('csrftoken');

            await fetch(API_BASE_URL+API_CSRF, {
                credentials: "include"
            });

            const openings_api_url = API_BASE_URL + OPENINGS_URL
            const pathMessage = JSON.stringify(nodePath)
            const response = await fetch(openings_api_url, {
                method: "POST",
                body: pathMessage,
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrftoken || "",
                },
                credentials: "include"
            });
            if (!response.ok){
                console.log("Api upload failed.")
            }
            const json = await response.json()
            if (!json){
                console.log("Json response error.")
                return
            }
            console.log(json)
            return
        }
        else if (storageMethod === 'localStorage'){
            if (!localStorage.getItem("pathList")){
                localStorage.setItem("pathList", JSON.stringify([]))
            }
            const pathList: PathMessage[] = JSON.parse(localStorage.getItem("pathList") as string)
            let index = 0
            pathList.forEach(path=>{
                if(path.name === pathName){
                    pathList[index] = nodePath
                    localStorage.setItem("pathList", JSON.stringify(pathList))
                    return
                }
                index++
            })
            pathList.push(nodePath)
            localStorage.setItem("pathList", JSON.stringify(pathList))
            return
        }

    }


    return {startPathCreation, makeMove, setActiveNode, getActiveNodeId, getBoardPosition, deleteNode, savePath}
}

export {PathwayCustomizer}