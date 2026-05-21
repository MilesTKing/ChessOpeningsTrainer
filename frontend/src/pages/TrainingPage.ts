import '../../node_modules/@chrisoakman/chessBoardjs/dist/chessBoard-1.0.0.min.css'
import {TrainingManager} from '../TrainingManager'
import logicalBoard from '../ChessBoard'

const trainingManager = TrainingManager()
initiateTraining()
const chessBoard = new logicalBoard('chessboard', onDrop, onMoveEnd)
function onDrop(source, target, piece, newPos, oldPos, orientation) {
    console.log(`pieceMoved: ${piece}`)
    try{
        const oldPosition = trainingManager.getBoardPosition()
        console.log(`source: ${source} dest: ${target}`)
        const managerMove = trainingManager.makeMove(source, target) //Assertion valid because makeMove will throw an error otherwise.
        console.log(`move: ${managerMove}`)
        if (!trainingManager.validateNextMove(managerMove.san)){
            console.log('validated move')
            trainingManager.setBoardPositionFen(oldPosition)
            console.log('set old pos')
            return 'snapback'
        }
        chessBoard.setPosition(trainingManager.getBoardPosition())
    }
    catch(e){
        console.log(e)
        return 'snapback'
    }
}

/**
 * Triggers after an animation finishes. Must call setPosition() with useAnimation: false, otherwise it causes an infinite loop.
 */
function onMoveEnd(){
    trainingManager.setRandomTrainingPosition()
    console.log("set graphical to new pos")
    chessBoard.setPosition(trainingManager.getBoardPosition(), false)
    console.log('done')
}
async function initiateTraining(){
    const selectedPath = await selectTrainingPath()
    if (!selectedPath) {
        return
    }
    console.log(`name: ${ selectedPath.name }\n positions: ${ selectedPath.positions }`)
    //Setup training for puzzle mode
    trainingManager.setupTraining(selectedPath.name, selectedPath.positions)
    const pathTestButton = document.getElementById('path-test-button')
    if(!pathTestButton){
        throw new Error('Path Test Button not found')
    }
    pathTestButton.addEventListener('click', (e) => {
        trainingManager.startOpeningTest()
        trainingManager.setRandomTrainingPosition()
        chessBoard.setPosition(trainingManager.getBoardPosition(), false)
    })
}
async function selectTrainingPath(){
    try{
        const userPaths = await trainingManager.getUserPathways('api')
        let pathNames = ""
        let pathPositions = new Map()
        for (const [key, value] of Object.entries(userPaths)){
            pathNames= pathNames+ `${key}\n`
            pathPositions.set(key, value)
        }
        const selectedPath = prompt(pathNames)
        if(!selectedPath){
            return
        }
        return {name: selectedPath, positions: pathPositions.get(selectedPath)}
    }
    catch(e){

    }

}