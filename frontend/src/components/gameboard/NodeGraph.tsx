import { ReactFlow} from '@xyflow/react';
import { BaseEdge, getSmoothStepPath, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

type positionNode= {id: string, position: {x:number, y:number}, data: {label: string, nextPositions: Map<number, {}>}}

export default function NodeGraph({openingPositions, onNodeSelection}) {
    const nodes = generatePositionNodes(openingPositions) || []
    const edges = generateEdges(nodes)

    function generatePositionNodes(openingPositions: {id: number, fen: string, nextPositions: Map<number, number>}[]) {
        const nodeList = []
        let posCount= 0
        let yaxis= 0;
        for(const openingPosition of openingPositions){
            yaxis+=120
            const id = openingPosition.id.toString();
            const position= {x:0,y:yaxis};
            const data = {label: openingPosition.san , nextPositions: openingPosition.nextPositions}
            nodeList.push({id, position, data, selectable: true, deletable: true});
        }
        return nodeList
    }
    function generateEdges(nodes: positionNode[]) {
        const edgeList = []
        let edgeIdCounter=0
        for(const node of nodes){

            for(const [san,position] of node.data.nextPositions){
                edgeIdCounter++
                edgeList.push({id: edgeIdCounter.toString(), source: node.id.toString(), target: position.id.toString()})
            }
        }
        return edgeList
    }

    return (
            <ReactFlow nodes={nodes} edges={edges} onNodesChange={(e)=>{
                for(const node of e){
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