import { beforeEach , describe, test , expect} from 'vitest'
import {TrainingSessionManager} from '../../scripts/TrainingSessionManager.ts'
import { Window } from 'happy-dom';

const window = new Window({ url: 'https://localhost:8080' });
const document = window.document;


describe("Chess Game Logic", () => {
    let trainingModule
    beforeEach(() => {
        document.body.innerHTML = `<div id="trainingBoard" style="width: 400px"></div>`
        trainingModule = TrainingSessionManager()
        trainingModule.prepareForTraining('')
    })

    test("Initialize Training Logic", () => {
        expect(trainingModule).toBeDefined()
    })
    test("Prepare board initializes logical board", () => {
        trainingModule.prepareForTraining('w', [[]])
        expect(trainingModule.getFen()).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    })


})