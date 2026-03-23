import {beforeEach, describe, test, expect} from 'vitest'
import {TrainingManager} from '../../src/TrainingManager'
import {ChessBoard} from "../../src/ChessBoard"
import {Window} from 'happy-dom';

const window = new Window({url: 'https://localhost:8080'});
const document = window.document;


describe("Chess Game Logic", () => {
    let trainingModule
    let board
    let defaultPath
    beforeEach(() => {
        document.body.innerHTML = `<div id="chessboard" style="width: 400px"></div>`
        board = ChessBoard("chessboard", () => {
        })
        trainingModule = TrainingManager()
        defaultPath = JSON.parse('{"name":"Caro-Kahn","path":[{"fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1","id":0,"nextPositions":[{"move":"e4","id":1}]},{"fen":"rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1","id":1,"nextPositions":[{"move":"c6","id":2}]},{"fen":"rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2","id":2,"nextPositions":[{"move":"d4","id":3}]},{"fen":"rnbqkbnr/pp1ppppp/2p5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2","id":3,"nextPositions":[{"move":"d5","id":4}]},{"fen":"rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3","id":4,"nextPositions":[{"move":"e5","id":5},{"move":"exd5","id":20}]},{"fen":"rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3","id":5,"nextPositions":[{"move":"c5","id":6}]},{"fen":"rnbqkbnr/pp2pppp/8/2ppP3/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4","id":6,"nextPositions":[{"move":"c3","id":7},{"move":"dxc5","id":12}]},{"fen":"rnbqkbnr/pp2pppp/8/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR b KQkq - 0 4","id":7,"nextPositions":[{"move":"Nc6","id":8}]},{"fen":"r1bqkbnr/pp2pppp/2n5/2ppP3/3P4/2P5/PP3PPP/RNBQKBNR w KQkq - 1 5","id":8,"nextPositions":[{"move":"Nf3","id":9},{"move":"Bb5","id":17}]},{"fen":"r1bqkbnr/pp2pppp/2n5/2ppP3/3P4/2P2N2/PP3PPP/RNBQKB1R b KQkq - 2 5","id":9,"nextPositions":[{"move":"Bg4","id":10}]},{"fen":"r2qkbnr/pp2pppp/2n5/2ppP3/3P2b1/2P2N2/PP3PPP/RNBQKB1R w KQkq - 3 6","id":10,"nextPositions":[{"move":"Nbd2","id":11}]},{"fen":"r2qkbnr/pp2pppp/2n5/2ppP3/3P2b1/2P2N2/PP1N1PPP/R1BQKB1R b KQkq - 4 6","id":11,"nextPositions":[]},{"fen":"r1bqkbnr/pp2pppp/2n5/1BppP3/3P4/2P5/PP3PPP/RNBQK1NR b KQkq - 2 5","id":17,"nextPositions":[{"move":"Bd7","id":18}]},{"fen":"r2qkbnr/pp1bpppp/2n5/1BppP3/3P4/2P5/PP3PPP/RNBQK1NR w KQkq - 3 6","id":18,"nextPositions":[{"move":"Nf3","id":19}]},{"fen":"r2qkbnr/pp1bpppp/2n5/1BppP3/3P4/2P2N2/PP3PPP/RNBQK2R b KQkq - 4 6","id":19,"nextPositions":[]},{"fen":"rnbqkbnr/pp2pppp/8/2PpP3/8/8/PPP2PPP/RNBQKBNR b KQkq - 0 4","id":12,"nextPositions":[{"move":"Nc6","id":13}]},{"fen":"r1bqkbnr/pp2pppp/2n5/2PpP3/8/8/PPP2PPP/RNBQKBNR w KQkq - 1 5","id":13,"nextPositions":[{"move":"Nf3","id":14}]},{"fen":"r1bqkbnr/pp2pppp/2n5/2PpP3/8/5N2/PPP2PPP/RNBQKB1R b KQkq - 2 5","id":14,"nextPositions":[{"move":"Bg4","id":15}]},{"fen":"r2qkbnr/pp2pppp/2n5/2PpP3/6b1/5N2/PPP2PPP/RNBQKB1R w KQkq - 3 6","id":15,"nextPositions":[{"move":"Bf4","id":16}]},{"fen":"r2qkbnr/pp2pppp/2n5/2PpP3/5Bb1/5N2/PPP2PPP/RN1QKB1R b KQkq - 4 6","id":16,"nextPositions":[]},{"fen":"rnbqkbnr/pp2pppp/2p5/3P4/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3","id":20,"nextPositions":[{"move":"cxd5","id":21}]},{"fen":"rnbqkbnr/pp2pppp/8/3p4/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4","id":21,"nextPositions":[{"move":"Nf3","id":22}]},{"fen":"rnbqkbnr/pp2pppp/8/3p4/3P4/5N2/PPP2PPP/RNBQKB1R b KQkq - 1 4","id":22,"nextPositions":[{"move":"Nc6","id":23}]},{"fen":"r1bqkbnr/pp2pppp/2n5/3p4/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 2 5","id":23,"nextPositions":[{"move":"Nc3","id":24}]},{"fen":"r1bqkbnr/pp2pppp/2n5/3p4/3P4/2N2N2/PPP2PPP/R1BQKB1R b KQkq - 3 5","id":24,"nextPositions":[{"move":"Bg4","id":25}]},{"fen":"r2qkbnr/pp2pppp/2n5/3p4/3P2b1/2N2N2/PPP2PPP/R1BQKB1R w KQkq - 4 6","id":25,"nextPositions":[{"move":"Be2","id":26}]},{"fen":"r2qkbnr/pp2pppp/2n5/3p4/3P2b1/2N2N2/PPP1BPPP/R1BQK2R b KQkq - 5 6","id":26,"nextPositions":[{"move":"e6","id":27}]},{"fen":"r2qkbnr/pp3ppp/2n1p3/3p4/3P2b1/2N2N2/PPP1BPPP/R1BQK2R w KQkq - 0 7","id":27,"nextPositions":[]}]}')
    })

    test("Prepare board initializes logical board", () => {
        trainingModule.startTraining(defaultPath)
        expect(trainingModule.getPosition()).toEqual('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
    })



})