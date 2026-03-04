import cytoscape from "cytoscape";
import dagre from "cytoscape-dagre";
import contextMenus from 'cytoscape-context-menus';

cytoscape.use(dagre);
cytoscape.use(contextMenus);
import 'cytoscape-context-menus/cytoscape-context-menus.css';

type nodeSelectionHandler = (nodeId: number) => void;

function MoveListView(opts?: { headless?: boolean }) {
    let activeNodeId: string;
    let nodeIdIndex = 1;

    const headless = opts?.headless ?? false;

    const container = headless ? undefined : document.getElementById("move-list-graph");
    if (!headless && !container) {
        throw new Error('MoveListView: #move-list-graph container not found');
    }

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
                        'draggable': 'false',
                        // @ts-ignore
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
                },
            ],
        autoungrabify: true

    })
    const context_menu_options = {
        // Customize event to bring up the context menu
        // Possible options https://js.cytoscape.org/#events/user-input-device-events
        evtType: 'cxttap',
        // List of initial menu items
        // A menu item must have either onClickFunction or submenu or both
        menuItems: [

      {
        id: 'remove', // ID of menu item
        content: 'remove', // Display content of menu item
        tooltipText: 'remove', // Tooltip text for menu item
        // Filters the elements to have this menu item on cxttap
        // If the selector is not truthy no elements will have this menu item on cxttap
        selector: 'node',
        onClickFunction: function () { // The function to be executed on click
          console.log('remove element');
        },
        disabled: false, // Whether the item will be created as disabled
        show: true, // Whether the item will be shown or not
        hasTrailingDivider: true, // Whether the item will have a trailing divider
        coreAsWell: false, // Whether core instance have this item on cxttap
        submenu: [] // Shows the listed menuItems as a submenu for this item. An item must have either submenu or onClickFunction or both.
      },
        ],
        // css classes that menu items will have
        menuItemClasses: [
            // add class names to this list
        ],
        // css classes that context menu will have
        contextMenuClasses: [
            // add class names to this list
        ],
        // Indicates that the menu item has a submenu. If not provided default one will be used
        submenuIndicator: { src: 'assets/submenu-indicator-default.svg', width: 12, height: 12 }
    };
    const contextMenuInstance = moveListGraph.contextMenus(context_menu_options);
    moveListGraph.on('cxttap', (event: any) => {
        console.log(contextMenuInstance.isActive())
    })
    function runTreeLayout() {
        moveListGraph.layout({
            name: 'dagre',
            // @ts-ignore
            rankDir: 'TB',          // Top -> Bottom (children below parents)
            rankSep: 60,            // vertical distance between layers
            nodeSep: 40,            // horizontal distance between siblings
            edgeSep: 10,

        }).run()
    }
    /**
     * Creates a graph node as a child of the current node.
     */
    function onMoveAddition(data: {move: string, piece: string, nodeIdIndex: number}) {
        const newNode= moveListGraph.add({data: {id: nodeIdIndex.toString(), move: data.move}});
        newNode.style('background-image', `${data.piece}.svg`)
        if (nodeIdIndex > 1){
            moveListGraph.add({data: {source: activeNodeId, target: newNode.id()}});
        }
        runTreeLayout()
        activeNodeId = newNode.id();
        nodeIdIndex++
    }

    function onNodeSelected(eventResponse: nodeSelectionHandler) {
        moveListGraph.on("select", (e)=>{
            activeNodeId = e.target.data('id');
            eventResponse(e.target.data('id'))
        })
    }
    function deleteSelectedNode(){
        console.log(`Initial Length: ${moveListGraph.nodes().size()}`)
        moveListGraph.$('selected').remove();
        console.log(moveListGraph.nodes().size())
    }
    function selectGraphNode(graphNodeId: number){
        moveListGraph.$('selected').select();
    }
    return {onMoveAddition, onNodeSelected, selectGraphNode, deleteSelectedNode};
}
export {MoveListView}