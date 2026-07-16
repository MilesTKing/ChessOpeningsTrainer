import {Chessboard} from 'react-chessboard';
import Header from '../components/nav/Header.tsx'
import Analysis from '../components/gameboard/Analysis.tsx'
import pageStyles from './Page.module.css'
import styles from './Openings.module.css'
import {Chess} from 'chess.js'
import {useState} from 'react'

interface PathNode {
    fen: string;
    id: number;
    nextPositions: Map<number, PathNode>;
}

interface PathMessage {
    "name": string
    "positions": SerializedPathNode[]
}

interface SerializedPathNode {
    fen: string;
    id: number;
    nextPositions: SerializedPathNodeMove[]
}

interface SerializedPathNodeMove {
    id: number;
    move: string;
}

type onDropEvent = {
    piece: { isSparePiece: boolean, pieceType: string, position: string };
    sourceSquare: string;
    targetSquare: string;
}

function Openings() {
    const logicBoard = new Chess()
    const [boardPosition, setBoardPosition] = useState(logicBoard.fen())
    const [nodeId, setNodeId] = useState(0)
    const [activePosition, setActivePosition] = useState({
        id: nodeId,
        fen: logicBoard.fen(),
        nextPositions: new Map<number, PathNode>()
    })
    const [positionMap, setPositionMap] = useState<Map<number, PathNode>>(new Map([[nodeId, activePosition]]))
    const [positionsArray, setPositionsArray] = useState([activePosition])
    logicBoard.load(boardPosition)

    const graphicChessboardOptions = {
        position: boardPosition,
        allowDrawingArrows: true,
        clearArrowsOnClick: true,
        onPieceDrop: addNextMove,
        boardStyle: {
            display: "grid",
            overflow: "hidden",
            width: '92vh',
            height: '100%',
            position: 'relative',
        }
    };

    function addNextMove(e: onDropEvent) {
        try {
            const move = logicBoard.move({from: e.sourceSquare, to: e.targetSquare});
            setBoardPosition(logicBoard.fen())
            const movePosition: PathNode = {id: nodeId + 1, fen: logicBoard.fen(), nextPositions: new Map()}
            setPositionMap(positionMap.set(nodeId, movePosition))
            activePosition.nextPositions.set(move.san, movePosition)
            setPositionsArray(positionsArray.concat([movePosition]))
            console.log(`pos len: ${positionsArray.length}`)
            setNodeId(nodeId+1)

        } catch (e) {
            console.error('move error');
        }
    }

    function positionSelectionHandler(id: number) {
        const position = positionMap.get(id)
        if (position) {
            setActivePosition(position)
        } else {
            throw new Error("No position matches given id.")
        }
    }

    return <div className={pageStyles.page}>
        <Header></Header>
        <section className={styles.gameBoard}>
            <Chessboard options={graphicChessboardOptions}/>
            <Analysis onPositionSelection={positionSelectionHandler} openingPositions={positionsArray}/>
        </section>
    </div>

}

export default Openings