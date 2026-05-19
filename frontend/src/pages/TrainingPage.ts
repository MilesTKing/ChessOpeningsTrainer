import '../../node_modules/@chrisoakman/chessboard2/dist/chessboard2.css'
import {TrainingManager} from '../TrainingManager'
import {ChessBoard} from '../ChessBoard'

const chessboard = ChessBoard('chessboard', onDrop)
const trainingManager = TrainingManager()
initiateTraining()
function onDrop(pieceMoved: ChessboardDropEvent) {
    return 'snapback'
}
async function initiateTraining(){
    const selectedPath = await selectTrainingPath()
    if (!selectedPath) {
        return
    }
    console.log(`name: ${ selectedPath.name }\n positions: ${ selectedPath.positions }`)
    trainingManager.setupTraining(selectedPath.name, selectedPath.positions)
    const pathTestButton = document.getElementById('path-test-button')
    if(!pathTestButton){
        throw new Error('Path Test Button not found')
    }
    pathTestButton.addEventListener('click', (e) => {
        trainingManager.startOpeningTest()
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