import {beforeEach, describe, test, expect} from 'vitest'
import {TrainingManager} from '../../src/TrainingManager'
import {ChessBoard} from "../../src/ChessBoard"
import {Window} from 'happy-dom';

const window = new Window({url: 'https://localhost:8080'});
const document = window.document;


describe("Chess Game Logic", () => {
    let trainingModule
    let board
    const defaultPathPositions = []
    Object.entries(defaultPath.positions).forEach(key=>{
        const entryFen = key[1].fen
        defaultPathPositions.push(entryFen)

    })

    beforeEach(() => {
        document.body.innerHTML = `<div id="chessboard" style="width: 400px"></div>`
        board = ChessBoard("chessboard", () => {
        })
        trainingModule = TrainingManager()
        trainingModule.startTraining("default")
    })

    test("Prepare board initializes logical board", () => {
        expect(trainingModule.getPosition()).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    })
    test("Validate played move", ()=>{
        trainingModule.validateMove("")
    })
    test("Set random test position",()=>{
        trainingModule.setRandomPuzzle()
        expect(trainingModule.getPosition()).toBeOneOf(defaultPathPositions)
    })
    test("",()=>{

    })
    test("",()=>{

    })


})