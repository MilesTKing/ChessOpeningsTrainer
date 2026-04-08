import {beforeEach, describe, test, expect} from 'vitest'
import {PathwayCustomizer} from '../../src/PathwayCustomizer.ts'
import {ChessBoard} from '../../src/ChessBoard.ts'
import {Window} from 'happy-dom';

const window = new Window({url: 'https://localhost:8080'});
const document = window.document;

localStorage.setItem("pathList",JSON.stringify([{"name":"basic opening","positions":[{"fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","id":0,"nextPositions":[{"move":"e4","id":1}]},{"fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1","id":1,"nextPositions":[{"move":"e5","id":2}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2","id":2,"nextPositions":[{"move":"d4","id":3}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2","id":3,"nextPositions":[{"move":"d5","id":4}]},{"fen":"rnbqkbnr/ppp2ppp/8/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3","id":4,"nextPositions":[{"move":"exd5","id":5}]},{"fen":"rnbqkbnr/ppp2ppp/8/3Pp3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3","id":5,"nextPositions":[{"move":"Qxd5","id":6}]},{"fen":"rnb1kbnr/ppp2ppp/8/3qp3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4","id":6,"nextPositions":[{"move":"dxe5","id":7}]},{"fen":"rnb1kbnr/ppp2ppp/8/3qP3/8/8/PPP2PPP/RNBQKBNR b KQkq - 0 4","id":7,"nextPositions":[]}]},{"name":"basic opening 2","positions":[{"fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","id":0,"nextPositions":[{"move":"e4","id":1}]},{"fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1","id":1,"nextPositions":[{"move":"e5","id":2}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2","id":2,"nextPositions":[{"move":"d4","id":3}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2","id":3,"nextPositions":[{"move":"d5","id":4}]},{"fen":"rnbqkbnr/ppp2ppp/8/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3","id":4,"nextPositions":[{"move":"exd5","id":5}]},{"fen":"rnbqkbnr/ppp2ppp/8/3Pp3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3","id":5,"nextPositions":[{"move":"Qxd5","id":6}]},{"fen":"rnb1kbnr/ppp2ppp/8/3qp3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4","id":6,"nextPositions":[{"move":"dxe5","id":7}]},{"fen":"rnb1kbnr/ppp2ppp/8/3qP3/8/8/PPP2PPP/RNBQKBNR b KQkq - 0 4","id":7,"nextPositions":[{"move":"Qxd1+","id":8}]},{"fen":"rnb1kbnr/ppp2ppp/8/4P3/8/8/PPP2PPP/RNBqKBNR w KQkq - 0 5","id":8,"nextPositions":[{"move":"Kxd1","id":9}]},{"fen":"rnb1kbnr/ppp2ppp/8/4P3/8/8/PPP2PPP/RNBK1BNR b kq - 0 5","id":9,"nextPositions":[]}]},{"name":"Testing","positions":[{"fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","id":0,"nextPositions":[{"move":"e4","id":1}]},{"fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1","id":1,"nextPositions":[{"move":"d5","id":2}]},{"fen":"rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2","id":2,"nextPositions":[{"move":"exd5","id":3}]},{"fen":"rnbqkbnr/ppp1pppp/8/3P4/8/8/PPPP1PPP/RNBQKBNR b KQkq - 0 2","id":3,"nextPositions":[{"move":"Qxd5","id":4}]},{"fen":"rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3","id":4,"nextPositions":[]}]},{"name":"Default","positions":[{"fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","id":0,"nextPositions":[{"move":"e4","id":1}]},{"fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1","id":1,"nextPositions":[{"move":"e5","id":2}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2","id":2,"nextPositions":[{"move":"d4","id":3}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2","id":3,"nextPositions":[{"move":"d5","id":4},{"move":"exd4","id":16}]},{"fen":"rnbqkbnr/ppp2ppp/8/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3","id":4,"nextPositions":[{"move":"exd5","id":5},{"move":"dxe5","id":10}]},{"fen":"rnbqkbnr/ppp2ppp/8/3Pp3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3","id":5,"nextPositions":[{"move":"Qxd5","id":6}]},{"fen":"rnb1kbnr/ppp2ppp/8/3qp3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4","id":6,"nextPositions":[{"move":"dxe5","id":7},{"move":"Nc3","id":14}]},{"fen":"rnb1kbnr/ppp2ppp/8/3qP3/8/8/PPP2PPP/RNBQKBNR b KQkq - 0 4","id":7,"nextPositions":[{"move":"Qxd1+","id":8}]},{"fen":"rnb1kbnr/ppp2ppp/8/4P3/8/8/PPP2PPP/RNBqKBNR w KQkq - 0 5","id":8,"nextPositions":[{"move":"Kxd1","id":9}]},{"fen":"rnb1kbnr/ppp2ppp/8/4P3/8/8/PPP2PPP/RNBK1BNR b kq - 0 5","id":9,"nextPositions":[]},{"fen":"rnb1kbnr/ppp2ppp/8/3qp3/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 4","id":14,"nextPositions":[{"move":"exd4","id":15}]},{"fen":"rnb1kbnr/ppp2ppp/8/3q4/3p4/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 5","id":15,"nextPositions":[]},{"fen":"rnbqkbnr/ppp2ppp/8/3pP3/4P3/8/PPP2PPP/RNBQKBNR b KQkq - 0 3","id":10,"nextPositions":[{"move":"dxe4","id":11}]},{"fen":"rnbqkbnr/ppp2ppp/8/4P3/4p3/8/PPP2PPP/RNBQKBNR w KQkq - 0 4","id":11,"nextPositions":[{"move":"Qxd8+","id":12}]},{"fen":"rnbQkbnr/ppp2ppp/8/4P3/4p3/8/PPP2PPP/RNB1KBNR b KQkq - 0 4","id":12,"nextPositions":[{"move":"Kxd8","id":13}]},{"fen":"rnbk1bnr/ppp2ppp/8/4P3/4p3/8/PPP2PPP/RNB1KBNR w KQ - 0 5","id":13,"nextPositions":[]},{"fen":"rnbqkbnr/pppp1ppp/8/8/3pP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3","id":16,"nextPositions":[{"move":"Qxd4","id":17}]},{"fen":"rnbqkbnr/pppp1ppp/8/8/3QP3/8/PPP2PPP/RNB1KBNR b KQkq - 0 3","id":17,"nextPositions":[{"move":"Nc6","id":18}]},{"fen":"r1bqkbnr/pppp1ppp/2n5/8/3QP3/8/PPP2PPP/RNB1KBNR w KQkq - 1 4","id":18,"nextPositions":[{"move":"Qd1","id":19}]},{"fen":"r1bqkbnr/pppp1ppp/2n5/8/4P3/8/PPP2PPP/RNBQKBNR b KQkq - 2 4","id":19,"nextPositions":[]}]},{"name":"default","positions":[{"fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","id":0,"nextPositions":[{"move":"e4","id":1}]},{"fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1","id":1,"nextPositions":[{"move":"e5","id":2}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2","id":2,"nextPositions":[{"move":"d4","id":3}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2","id":3,"nextPositions":[{"move":"d5","id":4},{"move":"exd4","id":16}]},{"fen":"rnbqkbnr/ppp2ppp/8/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3","id":4,"nextPositions":[{"move":"exd5","id":5},{"move":"dxe5","id":10}]},{"fen":"rnbqkbnr/ppp2ppp/8/3Pp3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3","id":5,"nextPositions":[{"move":"Qxd5","id":6}]},{"fen":"rnb1kbnr/ppp2ppp/8/3qp3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4","id":6,"nextPositions":[{"move":"dxe5","id":7},{"move":"Nc3","id":14}]},{"fen":"rnb1kbnr/ppp2ppp/8/3qP3/8/8/PPP2PPP/RNBQKBNR b KQkq - 0 4","id":7,"nextPositions":[{"move":"Qxd1+","id":8}]},{"fen":"rnb1kbnr/ppp2ppp/8/4P3/8/8/PPP2PPP/RNBqKBNR w KQkq - 0 5","id":8,"nextPositions":[{"move":"Kxd1","id":9}]},{"fen":"rnb1kbnr/ppp2ppp/8/4P3/8/8/PPP2PPP/RNBK1BNR b kq - 0 5","id":9,"nextPositions":[]},{"fen":"rnb1kbnr/ppp2ppp/8/3qp3/3P4/2N5/PPP2PPP/R1BQKBNR b KQkq - 1 4","id":14,"nextPositions":[{"move":"exd4","id":15}]},{"fen":"rnb1kbnr/ppp2ppp/8/3q4/3p4/2N5/PPP2PPP/R1BQKBNR w KQkq - 0 5","id":15,"nextPositions":[]},{"fen":"rnbqkbnr/ppp2ppp/8/3pP3/4P3/8/PPP2PPP/RNBQKBNR b KQkq - 0 3","id":10,"nextPositions":[{"move":"dxe4","id":11}]},{"fen":"rnbqkbnr/ppp2ppp/8/4P3/4p3/8/PPP2PPP/RNBQKBNR w KQkq - 0 4","id":11,"nextPositions":[{"move":"Qxd8+","id":12}]},{"fen":"rnbQkbnr/ppp2ppp/8/4P3/4p3/8/PPP2PPP/RNB1KBNR b KQkq - 0 4","id":12,"nextPositions":[{"move":"Kxd8","id":13}]},{"fen":"rnbk1bnr/ppp2ppp/8/4P3/4p3/8/PPP2PPP/RNB1KBNR w KQ - 0 5","id":13,"nextPositions":[]},{"fen":"rnbqkbnr/pppp1ppp/8/8/3pP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3","id":16,"nextPositions":[{"move":"Qxd4","id":17}]},{"fen":"rnbqkbnr/pppp1ppp/8/8/3QP3/8/PPP2PPP/RNB1KBNR b KQkq - 0 3","id":17,"nextPositions":[{"move":"Nc6","id":18}]},{"fen":"r1bqkbnr/pppp1ppp/2n5/8/3QP3/8/PPP2PPP/RNB1KBNR w KQkq - 1 4","id":18,"nextPositions":[{"move":"Qd1","id":19}]},{"fen":"r1bqkbnr/pppp1ppp/2n5/8/4P3/8/PPP2PPP/RNBQKBNR b KQkq - 2 4","id":19,"nextPositions":[]}]},{"name":"Blam","positions":[{"fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","id":0,"nextPositions":[{"move":"e4","id":1}]},{"fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1","id":1,"nextPositions":[{"move":"e5","id":2}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2","id":2,"nextPositions":[{"move":"d4","id":3}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2","id":3,"nextPositions":[{"move":"d5","id":4}]},{"fen":"rnbqkbnr/ppp2ppp/8/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3","id":4,"nextPositions":[]}]}]))
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
        const testPath = [{"fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","id":0,"nextPositions":[{"move":"e4","id":1}]},{"fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1","id":1,"nextPositions":[{"move":"e5","id":2},{"move":"d5","id":5}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2","id":2,"nextPositions":[{"move":"d4","id":3}]},{"fen":"rnbqkbnr/pppp1ppp/8/4p3/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2","id":3,"nextPositions":[{"move":"d5","id":4}]},{"fen":"rnbqkbnr/ppp2ppp/8/3pp3/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3","id":4,"nextPositions":[]},{"fen":"rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2","id":5,"nextPositions":[{"move":"d4","id":6}]},{"fen":"rnbqkbnr/ppp1pppp/8/3p4/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2","id":6,"nextPositions":[]}]
        pathCreator.savePath("testPath")
        const savedPaths = JSON.parse(localStorage.getItem("pathList"))
        savedPaths.forEach(path => {
            if (path === "testPath") {
                expect(path.positions).toBe(testPath)
            }
        })

    })

})