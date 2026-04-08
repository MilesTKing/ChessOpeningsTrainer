import {Chess} from 'chess.js'
function TrainingManager() {
    const chessBoard = new Chess()
    let accuracy = 0
    let trainingPositions: SerializedPathNode[]
    let pathPositionMap: Map<number, SerializedPathNode> = new Map()
    let activePosition = 0

    function startTraining(selectedtrainingPositions: string){
        chessBoard.reset()
        const pathList = JSON.parse(localStorage.getItem("pathList"))
        pathList.forEach(path=>{
            if(path.name === selectedtrainingPositions){
                trainingPositions = path.positions
            }
        })
        for (const node of trainingPositions){
            pathPositionMap.set(node.id, node)
        }
    }
    function getPosition(){
        return chessBoard.fen({forceEnpassantSquare: true})
    }
    function setRandomPuzzle(){
        const id = Math.floor(Math.random()*trainingPositions.length)
        const position = getPathPosition(id)
        console.log(`path position: ${position}`)
        if(!position){
            throw Error
        }
        activePosition = id
        chessBoard.load(position)

    }
    function getPathPosition(id: number){
        const position = pathPositionMap.get(id)
        if (!position){
            return undefined
        }
        return position.fen
    }
    function getNextMoves(id: number){
        const position = pathPositionMap.get(id)
        if (!position){
            throw Error
        }
        let returnList: string[] = []
        position.nextPositions.forEach(move=>{
            returnList.push(move.move)
        })
        return returnList
    }
    function validateMove(move: string){
        return getNextMoves(activePosition).includes(move)
    }
    return {startTraining, getPosition, setRandomPuzzle, validateMove}
}
export{ TrainingManager }