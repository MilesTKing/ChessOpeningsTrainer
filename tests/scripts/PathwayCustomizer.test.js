import { beforeEach , describe, test , expect} from 'vitest'
import {PathwayCustomizer} from '../../src/PathwayCustomizer.ts'
import { Window } from 'happy-dom';

const window = new Window({ url: 'https://localhost:8080' });
const document = window.document;


describe("Chess Game Logic", () => {
    let pathCreator
    beforeEach(() => {
        document.body.innerHTML = `<div id="chessboard" style="width: 400px"></div>`
        const mockMoveListRenderer= {}
        pathCreator = PathwayCustomizer(mockMoveListRenderer)
        pathCreator.beginPathCreation()
    })
    test("Setting active Node by id.", () => {
        pathCreator.makeMove("e2", "e4")
        pathCreator.makeMove("e7","e5")
        pathCreator.makeMove("d2","d4")
        pathCreator.makeMove("d7","d5")
        pathCreator.setActiveNode('2')
        expect(pathCreator.getActiveNodeId()).toEqual("2")
    })
})