import {beforeEach, describe, test, expect} from 'vitest'
import {MoveListView} from '../../../src/ui/MoveListView.ts'


let moveListGraph
beforeEach(() => {
    document.body.innerHTML = '<div id="move-list-graph" style="width:800px;height:600px;"></div>'
    moveListGraph = MoveListView({headless: true})
})
test.skip("Deleting node removes node and children", () => {
    moveListGraph.onMoveAddition({move: "mockMove", piece: "mockPiece", nodeIdIndex: 0})
    moveListGraph.selectGraphNode(0)
})