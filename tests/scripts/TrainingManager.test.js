/**
 * @jest-environment jsdom
 */
import {TrainingManager} from '../../scripts/TrainingManager.js'

describe("Chess Game Logic", () => {
    let trainingModule
    beforeEach(() => {
        document.body.innerHTML = `<div id="trainingBoard" style="width: 400px"></div>`
        trainingModule = TrainingManager()
    })

    test("Initialize Training Logic", () => {
        expect(trainingModule).toBeDefined()
    })
    test('Prepare board initializes board', () => {
        trainingModule.prepareForTraining()
        expect(trainingModule.getFen()).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    })


})