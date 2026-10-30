import {
    ReactFlow,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Controls,
    type ReactFlowInstance,
    type Node,
    type Edge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {useState, useEffect, useRef} from 'react';

type positionNode = {
    id: string,
    position: { x: number, y: number },
    data: { label: string, nextPositions: Map<number, {}> }
}

type PositionNode = Node<{
    label: string;
    nextPositions: Map<number, {}>;
}>;

export default function NodeGraph({openingPositions, onNodeSelection}) {
    const [nodes, setNodes] = useState(generatePositionNodes(openingPositions));
    const [edges, setEdges] = useState(generateEdges(nodes));
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<PositionNode, Edge> | null>(null);
    const previousPositionIds = useRef(new Set<number>());

    function onNodesChange(changes) {
        setNodes((nodesSnapshot) =>
            applyNodeChanges(changes, nodesSnapshot)
        )
        for (const change of changes) {
            if (change.type === 'select' && change.selected) {
                onNodeSelection(+change.id);

                const node = reactFlowInstance?.getNode(change.id);
                if (node) {
                    const width = node.measured?.width ?? node.width ?? 150;
                    const height = node.measured?.height ?? node.height ?? 40;

                    reactFlowInstance?.setCenter(
                        node.position.x + width / 2,
                        node.position.y + height / 2,
                        {zoom: 1, duration: 500}
                    );
                }
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
            if (!nodeMap.has(edge.source)) {
                nodeMap.set(edge.source, [edge.target])

            }
            nodeMap.get(edge.source).push(edge.target)
        }
        const xOffset = 200
        nodeMap.forEach((children, parentId) => {
                const parentNode = getNode(newNodes, parentId) as positionNode
                let x = parentNode.position.x - (xOffset * (children.length)) / 2;

                for (const childId of children) {
                    const node = getNode(newNodes, childId) as positionNode
                    node.position = {x, y: parentNode.position.y + 80}
                    x += xOffset
                }
            }
        )

        const previousIds = previousPositionIds.current;
        const addedNode = newNodes.find(
            node => !previousIds.has(Number(node.id))
        );

        setNodes(newNodes);
        setEdges(edges);

        previousPositionIds.current = new Set(
            newNodes.map(node => +node.id)
        )

        if (addedNode && reactFlowInstance) {
            requestAnimationFrame(() => {
                const node = reactFlowInstance.getNode(addedNode.id);

                if (!node) return;

                const width = node.measured?.width ?? node.width ?? 150;
                const height = node.measured?.height ?? node.height ?? 40;

                reactFlowInstance.setCenter(
                    node.position.x + width / 2,
                    node.position.y + height / 2,
                    {zoom: 1, duration: 500}
                );
            });
        }
    }, [openingPositions, reactFlowInstance]);

    function generatePositionNodes(openingPositions: {
        id: number,
        fen: string,
        nextPositions: Map<number, number>
    }[]) {
        const nodeList = []
        let yaxis = 0;
        for (const openingPosition of openingPositions) {
            yaxis += 80
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
                edgeList.push({
                    id: edgeIdCounter.toString(),
                    source: node.id.toString(),
                    target: position.id.toString()
                })
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
        <ReactFlow nodes={nodes} edges={edges} onEdgesChange={onEdgesChange} onNodesChange={onNodesChange} onInit={(instance) => setReactFlowInstance(instance)}>
            <Background/>
            <Controls/>
        </ReactFlow>
    );
}