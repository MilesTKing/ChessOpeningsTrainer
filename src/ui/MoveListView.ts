import cytoscape from "cytoscape";

function moveListView(){
    let activeNodeId: string
    let nodeIdIndex= 0
    let edgeIdIndex= -1
    const moveListGraph = cytoscape({

        container: document.getElementById('move-list-graph'), // container to render in

            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        'width': '2em',
                        'height': '2em',
                        'label': 'data(move)',
                        'text-halign': "center",
                        'text-valign': 'center'
                    }
                },

                {
                    selector: 'edge',
                    style: {
                        'width': 3,
                        'line-color': 'black',
                        'target-arrow-color': 'black',
                        'target-arrow-shape': 'triangle',
                        'curve-style': 'bezier'
                    }
                }
            ],


    });
    function onIllegalMove(){

    }

    function onMoveAddition(data: {move: string, piece: string, possibleNextMoveCount: number}) {
        const newNode= moveListGraph.add({data: {id: nodeIdIndex.toString(), move: data.move}});
        newNode.style('background-image', `${data.piece}.svg`)

        if(nodeIdIndex > 0){
            newNode.position('y', moveListGraph.getElementById(activeNodeId).position().y + 50)
            moveListGraph.add({data: {source: activeNodeId, target: newNode.id()}});
        }
        activeNodeId = newNode.id();
        nodeIdIndex++
    }
    function onPositionChange() {

    }

    return {onIllegalMove, onMoveAddition, onPositionChange}
}
export {moveListView}