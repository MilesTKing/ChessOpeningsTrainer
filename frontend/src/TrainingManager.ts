import {Chess} from 'chess.js'
import {getCookie} from './utils/cookies'
function TrainingManager() {
    const API_BASE_URL = import.meta.env.VITE_OPENINGS_API_BASE_URL
    const OPENINGS_URL = import.meta.env.VITE_OPENINGS_API_OPENINGS
    const chessBoard = new Chess()
    let accuracy = 0
    let trainingPositions: SerializedPathNode[]
    let pathPositionMap: Map<number, SerializedPathNode> = new Map()
    let activePositionId = 0
    let trainingPositionIds: number[] = []
    async function getUserPathways(source: 'api' | 'localStorage') {
        if (source === 'api') {
            console.log('using api method')
            const csrftoken = getCookie('csrftoken');
            try {
                const response = await fetch(API_BASE_URL + OPENINGS_URL, {
                    method: "GET",
                    headers: {
                        "X-CSRFToken": csrftoken || "",
                    },
                    credentials: "include"

                });
                return await response.json()
            } catch (e) {
                console.error(e);
            }
        }
        if (source === 'localStorage') {
            const pathListJson = localStorage.getItem('pathList')
            if (pathListJson) {
                return JSON.parse(pathListJson)
            }
        }
    }

    function setupTraining(selectedPathwayName: string, selectedPathwayPositions: SerializedPathNode[]) {
        chessBoard.reset()
        trainingPositions = selectedPathwayPositions
        for (const node of trainingPositions) {
            pathPositionMap.set(node.id, node)
        }
    }

    function getBoardPosition() {
        return chessBoard.fen({forceEnpassantSquare: true})
    }
    function startOpeningTest(){
        chessBoard.reset()
        accuracy = 0
        trainingPositionIds = Array.from(pathPositionMap.keys())
        if(!trainingPositionIds){
            throw new Error("No Training Pathway selected.")
        }
        trainingPositionIds.pop() //Removes last position because there's no next moves.
    }
    function setRandomTrainingPosition() {
        if (trainingPositionIds.length <= 0){
            return
        }
        const selectedIndex = Math.floor(Math.random() * trainingPositionIds.length)
        console.log(`selectedIndex:${selectedIndex}`)
        console.log(`availableId list: ${trainingPositionIds}`)
        const selectedId = trainingPositionIds[selectedIndex]
        console.log(`selected id ${selectedId}`)
        setBoardPosition(selectedId)
        trainingPositionIds.splice(selectedId,1)
        console.log(getNextMoves(activePositionId))
        return selectedIndex
    }

    function getPathPosition(id: number) {
        const position = pathPositionMap.get(id)
        if (!position) {
            return undefined
        }
        return position.fen
    }
    function setBoardPosition(id: number) {
        const positionFen = getPathPosition(id)
        if (!positionFen) {
            throw new Error('Path Position not found from Id')
        }
        activePositionId = id
        chessBoard.load(positionFen)
        console.log(chessBoard.ascii())
    }
    function setBoardPositionFen(fen: string){
        chessBoard.load(fen)
    }
    function getNextMoves(id: number) {
        const position = pathPositionMap.get(id)
        if (!position) {
            throw Error
        }
        let returnList: string[] = []
        position.nextPositions.forEach(move => {
            returnList.push(move.move)
        })
        return returnList
    }

    function makeMove(sourceSquare: string, targetSquare: string) {
        return chessBoard.move({from: sourceSquare, to: targetSquare});

    }
    function validateNextMove(move: string) {
        console.log('validating moves')
        console.log(`next moves: ${getNextMoves(activePositionId)} includes ${move}`)
        console.log(getNextMoves(activePositionId).includes(move))
        return getNextMoves(activePositionId).includes(move)
    }

    return {setupTraining, getBoardPosition, setBoardPositionFen, setRandomTrainingPosition, makeMove, validateNextMove, getUserPathways, startOpeningTest}
}
export{ TrainingManager }