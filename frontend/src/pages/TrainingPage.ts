import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.css'
import {TrainingManager} from '../TrainingManager'
import {ChessBoard} from '../ChessBoard'

const trainingManager = TrainingManager()
initiateTraining()
const chessboard = ChessBoard('chessboard', onDrop)
function onDrop(pieceMoved: ChessboardDropEvent) {
    try{
        const oldPosition = trainingManager.getBoardPosition()
        const managerMove = trainingManager.makeMove(pieceMoved.source, pieceMoved.target) //Assertion valid because makeMove will throw an error otherwise.
        if (!trainingManager.validateNextMove(managerMove.san)){
            trainingManager.setBoardPositionFen(oldPosition)
            return 'snapback'
        }
        setTimeout(()=>{
            trainingManager.setRandomTrainingPosition()
            console.log("set graphical to new pos")
            chessboard.setPosition(trainingManager.getBoardPosition())
            console.log('done'),250
        })

    }
    catch(e){
        console.log("failed to droppy toppy")
        return 'snapback'
    }
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
        chessboard.setPosition(trainingManager.getBoardPosition())
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