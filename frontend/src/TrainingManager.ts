import {Chess} from 'chess.js'
import {getCookie} from './utils/cookies'
import {ChessBoard} from "./ChessBoard";
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
        let remainingPositionIds = Array.from(pathPositionMap.keys())
        remainingPositionIds.pop() //Removes last position because there's no next moves.
        if(!remainingPositionIds){
            return
        }
        while(remainingPositionIds.length > 0){
            const selectedId= setRandomPosition(remainingPositionIds)

            remainingPositionIds.splice(selectedId,1)
            console.log(`remaining move count:${remainingPositionIds.length}`)
        }
    }
    function setRandomPosition(availableIds: number[]) {
        const selectedIndex = Math.floor(Math.random() * availableIds.length)
        console.log(`selectedIndex:${selectedIndex}`)
        console.log(`availableId list: ${availableIds}`)
        const selectedId = availableIds[selectedIndex]
        console.log(`selected id ${selectedId}`)
        setBoardPosition(selectedId)
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
        activePosition = id
        if (!positionFen) {
            throw new Error('Path Position not found from Id')
        }
        chessBoard.load(positionFen)
        console.log(chessBoard.ascii())
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

    return {setupTraining, getBoardPosition, validateMove, getUserPathways, startOpeningTest}
}
export{ TrainingManager }