import { Edge, Node } from 'vis-network';
import Graph from '../graph/Graph';
import GraphCatalog from '../graph/GraphCatalog';

export default class DijkstraAlgorithm {

    private graph: Graph;


    // distance unfixed node set
    private distanceUnfixedNodes: Set<number> = new Set<number>();


    private exitConditions: boolean = false;


    private readonly START_NODE_ID: number = 34;


    private readonly GOAL_NODE_ID: number = 89;



    /**
     * Create & Draw Graph
     * 
     */
    public createGraph(): void {

        // create graph
        this.graph = GraphCatalog.createDeformedLackedLadder(10, 0.2, 0.5);

        // set Start / Goal label
        this.graph.decorateAsStartNode(this.START_NODE_ID);
        this.graph.decorateAsGoalNode(this.GOAL_NODE_ID);

        // draw graph
        this.graph.drawAt("graph");

    }



    /**
     * Run Dijkstra's Algorithm
     * 
     */
    public run(): void {

        this.graph.offRendering(); // a routine step against rendering performance


        //------ init step -------//

        this.exitConditions = false;

        // set start node distance ( = 0) and init other nodes distance
        this.graph.putAllNodeProperty('distance', Number.MAX_VALUE);
        this.graph.putNodeProperty(this.START_NODE_ID, 'distance', 0);

        // add all nodes to a unfixed node set.
        this.distanceUnfixedNodes = new Set<number>();
        this.graph.getAllNodes().forEach((node: Node) => {
            this.distanceUnfixedNodes.add(<number>node.id);
        });

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
     * Main Step of Dijkstra's Algorithm
     * 
     */
    private step() {


        // pick a min distance node from the unfixed node set
        let minDistanceNode: Node = this.getMinDistanceNode();
        this.graph.putNodeLabel(minDistanceNode.id, minDistanceNode['distance'].toFixed(0));
        this.graph.putNodeColor(minDistanceNode.id, 'cornflowerblue');


        let connectedEdges: Array<Edge> = this.graph.getNeighborEdgesOf(minDistanceNode.id);

        connectedEdges.forEach((edge: Edge) => {

            // compare with current distance  v.s.  new min distance candidate 
            let neighborNode = this.graph.getOppositeSideNode(edge.id, minDistanceNode.id);
            let currentDistance: number = neighborNode['distance'];
            let newCandidateDistance: number = minDistanceNode['distance'] + edge.length;

            if (currentDistance > newCandidateDistance) {

                // update current distance value by new distance value
                this.graph.putNodeProperty(neighborNode.id, 'distance', newCandidateDistance);
                this.graph.putNodeProperty(neighborNode.id, 'parentNodeId', minDistanceNode.id);
                this.graph.putNodeProperty(neighborNode.id, 'parentEdgeId', edge.id);

            }

        })

        // remove the picked node from the unfixedNode set
        this.distanceUnfixedNodes.delete(<number>minDistanceNode.id);
        if (minDistanceNode.id == this.GOAL_NODE_ID) {
            this.exitConditions = true;
        }

    }



    /**
     * Chose a node that has minimum distance among the unfixed node set
     */
    private getMinDistanceNode(): Node {

        let _this = this;

        let minDistanceNodeId = Array.from(this.distanceUnfixedNodes).sort(function (nodeId1, nodeId2) {
            return _this.graph.getNode(nodeId1)['distance'] - _this.graph.getNode(nodeId2)['distance'];
        })[0];

        return _this.graph.getNode(minDistanceNodeId);

    }

}