import {ReactFlow, applyEdgeChanges, applyNodeChanges, Background, Controls} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useState, useEffect} from 'react';

type positionNode = {
    id: string,
    position: { x: number, y: number },
    data: { label: string, nextPositions: Map<number, {}> }
}

export default function NodeGraph({openingPositions, onNodeSelection}) {
    const [nodes, setNodes] = useState(generatePositionNodes(openingPositions));
    const [edges, setEdges] = useState(generateEdges(nodes));

    function onNodesChange(changes) {
        setNodes((nodesSnapshot) =>
            applyNodeChanges(changes, nodesSnapshot)
        )
        for (const change of changes) {
            if (change.type === 'select' && change.selected) {
                onNodeSelection(+change.id);
            }
        }
    }

    function onEdgesChange(changes) {
        setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot))
    }

    useEffect(() => {
        const newNodes = generatePositionNodes(openingPositions);
        const edges = generateEdges(newNodes)
        const nodeMap = new Map()

        for (const edge of edges) {
            if (edge.source in nodeMap) {
                nodeMap.get(edge.source).push(edge.target)
            }

            nodeMap.set(edge.source, [edge.target])
        }
        nodeMap.forEach((value, key, map) => {
                const parent_Node = getNode(newNodes, key) as positionNode
                const x_offset = 100
                let x = -(x_offset * map.get(key).length / 2) * value
                for (const child_node_id of value) {
                    const node = getNode(newNodes, child_node_id) as positionNode
                    console.log(`child ${child_node_id} x: ${x}`)
                    node.position = {x: x, y: parent_Node.position.y + 120}
                }
            }
        )

        setNodes(newNodes);
        setEdges(edges);
    }, [openingPositions]);

    function generatePositionNodes(openingPositions: { id: number, fen: string, nextPositions: Map<number, number> }[]) {
        const nodeList = []
        let yaxis = 0;
        for (const openingPosition of openingPositions) {
            yaxis += 120
            const id = openingPosition.id.toString();
            const position = {x: 0, y: yaxis};
            const data = {label: openingPosition.san, nextPositions: openingPosition.nextPositions}
            nodeList.push({id, position, data, selectable: true, deletable: true});

        }
        return nodeList
    }

    function generateEdges(nodes: positionNode[]) {
        const edgeList = []
        let edgeIdCounter = 0
        for (const node of nodes) {

            for (const position of node.data.nextPositions.values()) {
                edgeIdCounter++
                console.log(`from ${node.id.toString()} to ${position.id.toString()}`)
                edgeList.push({id: edgeIdCounter.toString(), source: node.id.toString(), target: position.id.toString()})
            }
        }
        return edgeList
    }

    function getNode(node_list: positionNode[], target: number | string) {
        for (const node of node_list) {
            if (node.id == target) {
                return node;
            }
        }
    }

    return (
        <ReactFlow nodes={nodes} edges={edges} onEdgesChange={onEdgesChange} onNodesChange={onNodesChange}>
            <Background/>
            <Controls/>
        </ReactFlow>
    );
}