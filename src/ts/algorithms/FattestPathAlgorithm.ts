import { Edge, Node } from 'vis-network';
import Graph from '../graph/Graph';
import GraphCatalog from '../graph/GraphCatalog';
import { Chance } from 'chance';

export default class FattestPathAlgorithm {

    private graph: Graph;


    private flowUnfixedNodes: Set<number | string> = new Set<number | string>();


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
        let random: Chance = new Chance('WidthSeed');
        this.graph.getAllEdges().forEach((edge: Edge) => {
            this.graph.putEdgeProperty(edge.id, 'width', random.natural({ min: 5, max: 20 }));
            this.graph.putEdgeProperty(edge.id, 'color', 'lightgray');
        });

        // set Start / Goal label
        this.graph.decorateAsStartNode(this.START_NODE_ID);
        this.graph.decorateAsGoalNode(this.GOAL_NODE_ID);

        // draw graph
        this.graph.drawAt("graph");

    }



    /**
     * Run Fattest Path Algorithm
     * 
     */
    public run(): void {

        this.graph.offRendering(); // a routine step against rendering performance


        //------ init step -------//

        this.exitConditions = false;

        // set start node flow ( = inf) and init other node flow ( = 0)
        this.graph.putAllNodeProperty('flow', 0);
        this.graph.putNodeProperty(this.START_NODE_ID, 'flow', Number.MAX_VALUE);

        // add all nodes to a unfixed flow node set.
        this.flowUnfixedNodes = new Set<number>();
        this.graph.getAllNodes().forEach((node: Node) => {
            this.flowUnfixedNodes.add(node.id);
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

                _this.graph.tracePath(_this.GOAL_NODE_ID, 'parentEdgeId', 'parentNodeId', false);

                clearInterval(intervalTimer);
            }

            _this.graph.drawAt("graph");

        }, 500);


    }



    /**
     * Main Step of Fattest Path Algorithm
     * 
     */
    private step() {


        // pick a max flow node from the unfixed node set
        let maxFlowNode: Node = this.getMaxFlowNode();
        if (this.START_NODE_ID != maxFlowNode.id) this.graph.putNodeLabel(maxFlowNode.id, maxFlowNode['flow'].toFixed(0));
        this.graph.putNodeColor(maxFlowNode.id, 'cornflowerblue');


        let connectedEdges: Array<Edge> = this.graph.getNeighborEdgesOf(maxFlowNode.id);

        connectedEdges.forEach((edge: Edge) => {

            // compare with current flow  v.s.  new max flow candidate 
            let neighborNode = this.graph.getOppositeSideNode(edge.id, maxFlowNode.id);
            let widthOnEdge: number = edge['width'];
            let newCandidateFlow: number = Math.min(maxFlowNode['flow'], widthOnEdge);

            if (neighborNode['flow'] < newCandidateFlow) {

                // update current flow value by new flow value
                this.graph.putNodeProperty(neighborNode.id, 'flow', newCandidateFlow);
                this.graph.putNodeProperty(neighborNode.id, 'parentNodeId', maxFlowNode.id);
                this.graph.putNodeProperty(neighborNode.id, 'parentEdgeId', edge.id);

            }

        })

        // remove the picked node from the unfixedNode set
        this.flowUnfixedNodes.delete(maxFlowNode.id);
        if (maxFlowNode.id == this.GOAL_NODE_ID) {
            this.exitConditions = true;
        }

    }



    /**
     * Chose a node that has max flow among the unfixed node set
     */
    private getMaxFlowNode(): Node {

        let _this = this;

        let maxFlowNodeId = Array.from(this.flowUnfixedNodes).sort(function (nodeId1, nodeId2) {
            return _this.graph.getNode(nodeId2)['flow'] - _this.graph.getNode(nodeId1)['flow'];
        })[0];

        return _this.graph.getNode(maxFlowNodeId);

    }

}