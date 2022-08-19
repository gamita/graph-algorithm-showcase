import Graph from 'graph-components/Graph'
import GraphCatalog from 'graph-components/GraphCatalog'
import { Node, Edge } from 'vis-network'


export class BreadthFirstSearchAlgorithm {


    private graph: Graph = new Graph();


    private queue: Array<number | string> = [];


    private exitConditions: boolean = false;


    private readonly START_NODE_ID: number = 34;


    private readonly GOAL_NODE_ID: number = 89;



    /**
     * Create & Draw Graph
     * 
     */
    public createGraph(): void {

        // create graph
        this.graph = GraphCatalog.createLackedLadder(10, 0.2);

        this.graph.decorateAsStartNode(this.START_NODE_ID);
        this.graph.decorateAsGoalNode(this.GOAL_NODE_ID);

        // draw graph
        this.graph.drawAt("graph");

    }


    /**
     * Run BFS
     */
    public run(): void {

        this.graph.offRendering(); // a routine step against rendering performance


        //------ init step -------//

        this.exitConditions = false;
        this.graph.putNodeProperty(this.START_NODE_ID, 'distance', 0);
        this.graph.putNodeProperty(this.START_NODE_ID, 'visited', true);
        this.queue = [];
        this.queue.push(this.START_NODE_ID);

        this.graph.drawAt("graph");


        //------ interval step -------//

        let _this = this;

        let intervalTimer = setInterval(function name() {

            _this.graph.offRendering();

            //-- main step --//
            _this.step();

            // exit condition
            if (_this.exitConditions) {

                _this.graph.tracePath(_this.GOAL_NODE_ID, 'parentEdgeId', 'parentNodeId');

                clearInterval(intervalTimer);
            }

            _this.graph.drawAt("graph");

        }, 500);

    }



    /**
     * Main Step of BFS
     * 
     */
    private step() {

        let parentNodeId = this.queue.shift();
        let parentNode: Node = this.graph.getNode(parentNodeId!);

        let neighborEdges = this.graph.getNeighborEdgesOf(parentNodeId!);

        let _this = this;

        neighborEdges.forEach((neighborEdge: Edge) => {

            let neighborNode: Node = _this.graph.getOppositeSideNode(neighborEdge.id!, parentNodeId!);

            if (!_this.graph.getProperty(neighborNode, 'visited')) {

                let distance = _this.graph.getProperty(parentNode, 'distance') + neighborEdge['length'];

                _this.graph.putNodeProperty(neighborNode.id!, 'distance', distance);
                _this.graph.putNodeProperty(neighborNode.id!, 'visited', true);
                _this.graph.putNodeProperty(neighborNode.id!, 'parentNodeId', parentNodeId);
                _this.graph.putNodeProperty(neighborNode.id!, 'parentEdgeId', neighborEdge.id);
                _this.graph.putNodeText(neighborNode.id!, distance.toFixed(0));
                _this.graph.putNodeColor(neighborNode.id!, 'cornflowerblue');

                _this.queue.push(neighborNode.id!);

            }

            if (neighborNode.id === _this.GOAL_NODE_ID) {
                _this.exitConditions = true;
            }

        });

    }

}