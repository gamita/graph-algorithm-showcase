import Graph from 'graph-components/Graph'
import GraphCatalog from 'graph-components/GraphCatalog'
import { Node } from 'vis-network'


export class TopologicalSortAlgorithm {


    private graph: Graph = new Graph();


    private nonRefedNodes: Array<Node> = [];


    private currentOrder = 0;



    /**
     * Create & Draw DAG
     * 
     */
    public createGraph(): void {

        // create graph
        this.graph = GraphCatalog.createDAG(20, 0.85, "TASK-");

        // draw graph
        this.graph.drawAt("graph");

    }


    /**
     * Run Topological Sort Algorithm
     */
    public run(): void {

        let _this = this;

        //------ interval step -------//
        _this.nonRefedNodes = [];

        _this.graph.getAllNodes().forEach(node => {
            if (_this.graph.getNeighborInEdgesOf(node.id!).length === 0) {
                _this.nonRefedNodes.push(node);
            }
        });


        let intervalTimer = setInterval(function name() {

            _this.graph.offRendering();

            //-- main step --//
            _this.step();

            // exit condition
            if (_this.nonRefedNodes.length === 0) {
                clearInterval(intervalTimer);
            }

            _this.graph.drawAt("graph");

        }, 1000);
    }



    /**
     * Main Step of Topological Sort Algorithm
     * 
     */
    private step() {

        let _this = this;

        let nonRefedNode: Node | undefined = this.nonRefedNodes.shift();

        _this.currentOrder++;
        _this.graph.putNodeTextAppend(nonRefedNode!.id!, ": " + _this.currentOrder);
        _this.graph.putNodeColor(nonRefedNode!.id!, 'cornflowerblue');

        _this.graph.getNeighborOutEdgesOf(nonRefedNode!.id!).forEach(refingEdge => {

            _this.graph.putEdgeProperty(refingEdge.id!, "removed", true);
            _this.graph.putEdgeColor(refingEdge.id!, "cornflowerblue");

            let refedNode: Node = _this.graph.getOppositeSideNode(refingEdge.id!, nonRefedNode!.id!);

            let numOfRefedEdge = 0;

            _this.graph.getNeighborInEdgesOf(refedNode.id!).forEach(refedEdge => {
                if (!_this.graph.getProperty(refedEdge, "removed")) {
                    numOfRefedEdge++;
                }
            })

            if (numOfRefedEdge === 0) {
                _this.nonRefedNodes.push(refedNode);
            }

        });

    }

}