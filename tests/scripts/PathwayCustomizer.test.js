import { beforeEach , describe, test , expect} from 'vitest'
import {PathwayCustomizer} from '../../src/PathwayCustomizer.ts'
import {Chessboard} from '../../src/Chessboard.ts'
import { Window } from 'happy-dom';

const window = new Window({ url: 'https://localhost:8080' });
const document = window.document;


describe("Chess Game Logic", () => {
    let pathCreator
    let board
    beforeEach(() => {
        document.body.innerHTML = `<div id="chessboard" style="width: 400px"></div>`
        const mockMoveListRenderer= {}
        pathCreator = PathwayCustomizer(mockMoveListRenderer)
        board = Chessboard("chessboard", ()=>{})
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
    test.skip("Setting active node sets chessboard position. Skipped because it's a chess.js bug", ()=>{
        pathCreator.makeMove("e2", "e4")
        pathCreator.makeMove("e7","e5")
        pathCreator.makeMove("d2","d4")
        expect(pathCreator.getPosition()).toEqual("rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2")
    })
})