import Graph from 'graph-components/Graph'
import GraphCatalog from 'graph-components/GraphCatalog'
import { Node, Edge } from 'vis-network'

export class AStartAlgorithm {


    private graph: Graph = new Graph();


    private distanceUnfixedNodes: Set<number | string> = new Set<number | string>();


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
     * Run A-star Algorithm
     * 
     */
    public run(): void {

        this.graph.offRendering(); // a routine step against rendering performance


        //------ init step -------//

        this.exitConditions = false;

        // set start node distance ( = 0) and init other nodes distance
        this.graph.putAllNodeProperty('distance', Number.MAX_VALUE);
        this.graph.putNodeProperty(this.START_NODE_ID, 'distance', 0);

        // init unFixedNode (all nodes belong to this set at the beginning)
        this.distanceUnfixedNodes = new Set<number | string>();
        this.graph.getAllNodes().forEach((node: Node) => {
            this.distanceUnfixedNodes.add(node.id!);
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
     * Main Step of A-star Algorithm
     * 
     */
    private step() {


        // pick a min distance node from unfixed node set
        let minDistanceNode: Node = this.getMinDistanceNode();
        this.graph.putNodeText(minDistanceNode.id!, this.graph.getProperty(minDistanceNode, 'distance').toFixed(0));
        this.graph.putNodeColor(minDistanceNode.id!, 'cornflowerblue');


        let connectedEdges: Array<Edge> = this.graph.getNeighborEdgesOf(minDistanceNode.id!);

        let _this = this;
        connectedEdges.forEach((edge: Edge) => {

            // compare with current distance  v.s.  new min distance candidate 
            let neighborNode = this.graph.getOppositeSideNode(edge.id!, minDistanceNode.id!);
            let currentDistance: number = _this.graph.getProperty(neighborNode, 'distance');
            let newCandidateDistance: number = _this.graph.getProperty(minDistanceNode, 'distance') + edge.length;

            if (currentDistance > newCandidateDistance) {

                // update current distance value by new distance value
                this.graph.putNodeProperty(neighborNode.id!, 'distance', newCandidateDistance);
                this.graph.putNodeProperty(neighborNode.id!, 'parentNodeId', minDistanceNode.id);
                this.graph.putNodeProperty(neighborNode.id!, 'parentEdgeId', edge.id);

            }

        })

        // remove the picked node from  the unfixedNode set
        this.distanceUnfixedNodes.delete(minDistanceNode.id!);
        if (minDistanceNode.id === this.GOAL_NODE_ID) {
            this.exitConditions = true;
        }


    }



    /**
     * Chose a node that has minimum distance among the unfixed node set
     */
    private getMinDistanceNode(): Node {

        let _this = this;

        let minDistanceNodeId = Array.from(this.distanceUnfixedNodes).sort(function (nodeId1, nodeId2) {
            return (_this.graph.getNodeProperty(nodeId1, 'distance') + _this.calcHeuristicDistanceAt(nodeId1))

                - (_this.graph.getNodeProperty(nodeId2, 'distance') + _this.calcHeuristicDistanceAt(nodeId2));
        })[0];

        return _this.graph.getNode(minDistanceNodeId);

    }


    /**
     * Calculate Euclidean distance between the given node and the goal node. 
     * 
     * @param nodeId 
     */
    private calcHeuristicDistanceAt(nodeId: number | string): number {

        let givenNode: Node = this.graph.getNode(nodeId);
        let goalNode: Node = this.graph.getNode(this.GOAL_NODE_ID);

        return Math.sqrt(Math.pow(givenNode.x! - goalNode.x!, 2) + Math.pow(givenNode.y! - goalNode.y!, 2));

    }

}