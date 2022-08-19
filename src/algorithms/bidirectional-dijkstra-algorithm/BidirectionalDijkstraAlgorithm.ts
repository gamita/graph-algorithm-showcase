import Graph from 'graph-components/Graph'
import GraphCatalog from 'graph-components/GraphCatalog'
import { Node, Edge } from 'vis-network'

export class BidirectionalDijkstraAlgorithm {


    private graph: Graph = new Graph();


    private distanceUnfixedNodes: any = {}


    private fixedNodes: any = {}


    private meetingNodeId?: number | string;


    private exitConditions: boolean = false;


    private readonly START_NODE_ID: number = 34;


    private readonly GOAL_NODE_ID: number = 89;


    private readonly NAME_SPACE_START: string = "-start-"


    private readonly NAME_SPACE_GOAL: string = "-goal-"



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
     * Run Bidirectional Dijkstra's Algorithm
     * 
     */
    public run(): void {

        this.graph.offRendering(); // a routine step against rendering performance


        //------ init step -------//

        this.exitConditions = false;

        // set start node distance ( = 0) and init other nodes distance
        this.graph.putAllNodeProperty(this.NAME_SPACE_START + 'distance', Number.MAX_VALUE);
        this.graph.putAllNodeProperty(this.NAME_SPACE_GOAL + 'distance', Number.MAX_VALUE);
        this.graph.putNodeProperty(this.START_NODE_ID, this.NAME_SPACE_START + 'distance', 0);
        this.graph.putNodeProperty(this.GOAL_NODE_ID, this.NAME_SPACE_GOAL + 'distance', 0);

        // add all nodes to the start node based unfixed node set and the goal node based unfixed node set.
        this.distanceUnfixedNodes[this.NAME_SPACE_START] = new Set<number | string>();
        this.distanceUnfixedNodes[this.NAME_SPACE_GOAL] = new Set<number | string>();
        this.fixedNodes = new Set<number | string>();
        this.meetingNodeId = undefined;

        this.graph.getAllNodes().forEach((node: Node) => {
            this.distanceUnfixedNodes[this.NAME_SPACE_START].add(node.id);
            this.distanceUnfixedNodes[this.NAME_SPACE_GOAL].add(node.id);
        });

        this.graph.drawAt("graph");


        //------ interval step -------//

        let _this = this;

        let intervalTimer = setInterval(function name() {

            _this.graph.offRendering();

            //-- main step --//
            _this.stepFromStart();
            _this.stepFromGoal();

            // exit condition
            if (_this.exitConditions) {

                _this.graph.tracePath(_this.meetingNodeId!, _this.NAME_SPACE_START + 'parentEdgeId', _this.NAME_SPACE_START + 'parentNodeId');
                _this.graph.tracePath(_this.meetingNodeId!, _this.NAME_SPACE_GOAL + 'parentEdgeId', _this.NAME_SPACE_GOAL + 'parentNodeId');
                clearInterval(intervalTimer);
            }

            _this.graph.drawAt("graph");

        }, 500);

    }



    private stepFromStart() {
        this.step(this.NAME_SPACE_START);
    }



    private stepFromGoal() {
        this.step(this.NAME_SPACE_GOAL);
    }



    /**
     * Main Step of Bidirectional Dijkstra's Algorithm
     * 
     */
    private step(nameSpace: string) {

        // pick a min distance node from unfixed node set
        let minDistanceNode: Node = this.getMinDistanceNode(nameSpace);

        this.graph.putNodeText(minDistanceNode.id!, this.graph.getProperty(minDistanceNode, nameSpace + 'distance').toFixed(0));
        this.graph.putNodeFont(minDistanceNode.id!, '18px arial ' + (nameSpace === this.NAME_SPACE_START ? 'cornflowerblue' : 'lightseagreen'));
        this.graph.putNodeColor(minDistanceNode.id!, (nameSpace === this.NAME_SPACE_START ? 'cornflowerblue' : 'lightseagreen'));


        let connectedEdges: Array<Edge> = this.graph.getNeighborEdgesOf(minDistanceNode.id!);

        connectedEdges.forEach((edge: Edge) => {

            // compare with current distance  v.s.  new min distance candidate 
            let neighborNode = this.graph.getOppositeSideNode(edge.id!, minDistanceNode.id!);
            let currentDistance: number = this.graph.getProperty(neighborNode, nameSpace + 'distance');
            let newCandidateDistance: number = this.graph.getProperty(minDistanceNode, nameSpace + 'distance') + edge.length;

            if (currentDistance > newCandidateDistance) {

                // update current distance value by new distance value
                this.graph.putNodeProperty(neighborNode.id!, nameSpace + 'distance', newCandidateDistance);
                this.graph.putNodeProperty(neighborNode.id!, nameSpace + 'parentNodeId', minDistanceNode.id);
                this.graph.putNodeProperty(neighborNode.id!, nameSpace + 'parentEdgeId', edge.id);

            }

        })

        // move the picked node from (name space) unfixed node set to (common) fixedNode set
        this.distanceUnfixedNodes[nameSpace].delete(minDistanceNode.id);
        if (this.fixedNodes.has(minDistanceNode.id)) {
            this.meetingNodeId = minDistanceNode.id;
            this.graph.putNodeColor(minDistanceNode.id!, 'gold'); // mark the meeting node.
            this.exitConditions = true;
            return;
        } else {
            this.fixedNodes.add(minDistanceNode.id);
        }

    }



    /**
     * Chose a node that has minimum distance property among (name space) unfixed node set
     */
    private getMinDistanceNode(nameSpace: string): Node {

        let _this = this;

        let minDistanceNodeId = Array.from(this.distanceUnfixedNodes[nameSpace]).sort(function (nodeId1, nodeId2) {
            return _this.graph.getNodeProperty(nodeId1 as number, nameSpace + 'distance') - _this.graph.getNodeProperty(nodeId2 as number, nameSpace + 'distance');
        })[0];

        return _this.graph.getNode(minDistanceNodeId as number);

    }


}