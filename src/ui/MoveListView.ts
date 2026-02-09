import cytoscape from "cytoscape";

function moveListView(){
    let activeNodeId: string
    let nodeIdIndex= 0
    let edgeIdIndex= -1
    const container = document.getElementById("move-list-graph") as HTMLElement
    const moveListGraph = cytoscape({

        container: container, // container to render in

            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'shape': 'roundrectangle',
                        'width': '4.2em',
                        'height': '2em',
                        'label': 'data(move)',
                        'text-halign': "center",
                        'text-valign': 'center',
                        'background-width': '1.2em',
                        'background-height': '1.2em',
                        'background-position-x': '0',
                        'text-margin-x': '.5em'
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
        if (nodeIdIndex === 0){
            newNode.position('x', container.getBoundingClientRect().width / 2)
            newNode.position('y', container.getBoundingClientRect().height / 20)
        }

        else{
            newNode.position('x', moveListGraph.getElementById(activeNodeId).position().x)
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