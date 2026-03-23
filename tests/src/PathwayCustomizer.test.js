import {beforeEach, describe, test, expect} from 'vitest'
import {PathwayCustomizer} from '../../src/PathwayCustomizer.ts'
import {ChessBoard} from '../../src/ChessBoard.ts'
import {Window} from 'happy-dom';

const window = new Window({url: 'https://localhost:8080'});
const document = window.document;


describe("Chess Game Logic", () => {
    let pathCreator
    let board
    beforeEach(() => {
        document.body.innerHTML = `<div id="chessboard" style="width: 400px"></div>`
        board = ChessBoard("chessboard", () => {
        })
        const mockMoveListRenderer = {}
        pathCreator = PathwayCustomizer(mockMoveListRenderer)
        pathCreator.startPathCreation()
    })
    test("Setting active Node by id.", () => {
        pathCreator.makeMove("e2", "e4")
        pathCreator.makeMove("e7", "e5")
        pathCreator.makeMove("d2", "d4")
        pathCreator.makeMove("d7", "d5")
        pathCreator.setActiveNode('2')
        expect(pathCreator.getActiveNodeId()).toEqual(2)
    })
    test("Setting active node sets chessboard position.", () => {
        pathCreator.makeMove("e2", "e4")
        pathCreator.makeMove("e7", "e5")
        pathCreator.makeMove("d2", "d4")
        expect(pathCreator.getPosition()).toEqual("rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq d3 0 2")
    })
    test("Get active node by id.", () => {
        pathCreator.makeMove("e2", "e4")
        pathCreator.makeMove("e7", "e5")
        pathCreator.makeMove("d2", "d4")
        pathCreator.makeMove("d7", "d5")
        expect(pathCreator.getActiveNodeId()).toEqual(4)
    })
    test("Deleting node by id.", () => {
        pathCreator.makeMove("e2", "e4")
        pathCreator.makeMove("e7", "e5")
        pathCreator.makeMove("d2", "d4")
        pathCreator.makeMove("d7", "d5")
        expect(pathCreator.getActiveNodeId()).toEqual(4)
        pathCreator.deleteNode(3, 4)
        expect(pathCreator.getActiveNodeId()).toEqual(3)
    })
    test("Deleting node deletes all children.", () => {
        pathCreator.makeMove("e2", "e4")
        pathCreator.makeMove("e7", "e5")
        pathCreator.makeMove("d2", "d4")
        pathCreator.makeMove("d7", "d5")
        expect(pathCreator.getActiveNodeId()).toEqual(4)
        pathCreator.deleteNode(0, 1)
        expect(pathCreator.getActiveNodeId()).toEqual(0)
    })
    test("Saving node path.", ()=>{
        pathCreator.makeMove("e2", "e4")
        pathCreator.makeMove("e7", "e5")
        pathCreator.makeMove("d2", "d4")
        pathCreator.makeMove("d7", "d5")
        pathCreator.setActiveNode(1)
        pathCreator.makeMove("d7", "d5")
        pathCreator.makeMove("d2","d4")

        const json = pathCreator.savePath().trim()
        expect(json).toBe("[{\"fen\":\"rnbqkbnr/ppp2ppp/8/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3\",\"id\":4,\"nextPositions\":[]},{\"fen\":\"rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2\",\"id\":3,\"nextPositions\":[{\"move\":\"d5\",\"id\":4}]},{\"fen\":\"rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2\",\"id\":2,\"nextPositions\":[{\"move\":\"d4\",\"id\":3}]},{\"fen\":\"rnbqkbnr/ppp1pppp/8/3p4/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2\",\"id\":6,\"nextPositions\":[]},{\"fen\":\"rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2\",\"id\":5,\"nextPositions\":[{\"move\":\"d4\",\"id\":6}]},{\"fen\":\"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1\",\"id\":1,\"nextPositions\":[{\"move\":\"e5\",\"id\":2},{\"move\":\"d5\",\"id\":5}]},{\"fen\":\"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1\",\"id\":0,\"nextPositions\":[{\"move\":\"e4\",\"id\":1}]}]")
    })

})