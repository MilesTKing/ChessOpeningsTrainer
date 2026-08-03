import { ReactFlow} from '@xyflow/react';
import { BaseEdge, getSmoothStepPath, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

type positionNode= {id: string, position: {x:number, y:number}, data: {label: string, nextPositions: Map<number, {}>}}

export default function NodeGraph({openingPositions, onNodeSelection}) {
    const nodes = generatePositionNodes(openingPositions) || []
    const edges = generateEdges(nodes)
    console.log(`nodes len: ${nodes.length} `)
    console.log()
    const printPos= ()=> {
        for(const position of openingPositions){
            console.log(position.id)
        }
    }
    printPos()

    function generatePositionNodes(openingPositions: {id: number, fen: string, nextPositions: Map<number, number>}[]) {
        const nodeList = []
        let posCount= 0
        let yaxis= 0;
        for(const openingPosition of openingPositions){
            yaxis+=120
            console.log(`posCount: ${posCount++}`)
            const id = openingPosition.id.toString();
            const position= {x:0,y:yaxis};
            const data = {label: openingPosition.san , nextPositions: openingPosition.nextPositions}
            console.log(`node id: ${id}`)
            nodeList.push({id, position, data, selectable: true, deletable: true});
        }
        return nodeList
    }
    function generateEdges(nodes: positionNode[]) {
        const edgeList = []
        let edgeIdCounter=0
        for(const node of nodes){
            for(const [san,position] of node.data.nextPositions){
                console.log(`position: ${position.id}`)
                console.log(`san: ${san}`)
                edgeIdCounter++
                edgeList.push({id: edgeIdCounter.toString(), source: node.id.toString(), target: position.id.toString()})
            }
        }
        return edgeList
    }

    return (
            <ReactFlow nodes={nodes} edges={edges} onNodesChange={(e)=>{
                for(const node of e){
                    console.log(node)
                    console.log(`node: ${node.id} selected: ${node.selected}`)
                    if(node.selected){
                        onNodeSelection(+node.id)
                    }
                }
            }} fitView>
                <Background/>
                <Controls/>
            </ReactFlow>
    );
}