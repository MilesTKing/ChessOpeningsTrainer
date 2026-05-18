import {Chess} from 'chess.js'
import {getCookie} from './utils/cookies'
function TrainingManager() {
    const API_BASE_URL = import.meta.env.VITE_OPENINGS_API_BASE_URL
    const OPENINGS_URL = import.meta.env.VITE_OPENINGS_API_OPENINGS
    const chessBoard = new Chess()
    let accuracy = 0
    let trainingPositions: SerializedPathNode[]
    let pathPositionMap: Map<number, SerializedPathNode> = new Map()
    let activePosition = 0

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

    function startTraining(selectedPathwayName: string, selectedPathwayPositions: SerializedPathNode[]) {
        chessBoard.reset()
        trainingPositions = selectedPathwayPositions
        for (const node of trainingPositions) {
            pathPositionMap.set(node.id, node)
        }
    }

    function getPosition() {
        return chessBoard.fen({forceEnpassantSquare: true})
    }

    function setRandomPuzzle() {
        const id = Math.floor(Math.random() * trainingPositions.length)
        const position = getPathPosition(id)
        console.log(`path position: ${position}`)
        if (!position) {
            throw Error
        }
        activePosition = id
        chessBoard.load(position)

    }

    function getPathPosition(id: number) {
        const position = pathPositionMap.get(id)
        if (!position) {
            return undefined
        }
        return position.fen
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

    function validateMove(move: string) {
        return getNextMoves(activePosition).includes(move)
    }

    return {startTraining, getPosition, setRandomPuzzle, validateMove, getUserPathways}
}
export{ TrainingManager }