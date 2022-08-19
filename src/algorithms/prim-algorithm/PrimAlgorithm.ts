import { Edge, Node } from 'vis-network';
import Graph from 'graph-components/Graph';
import GraphCatalog from 'graph-components/GraphCatalog';

export class PrimAlgorithm {

    private graph: Graph = new Graph();


    private exitConditions: boolean = false;


    private readonly START_NODE_ID: number = 1;


    private remainingNodes = new Map<number | string, Node>();


    private mstNodeIdSet = new Set<number | string>();



    /**
     * Create & Draw Graph
     * 
     */
    public createGraph(): void {

        // create graph
        this.graph = GraphCatalog.createRegularPolygonWithCenter(16, 300, 0.75);


        // draw graph
        this.graph.drawAt("graph");

    }



    /**
     * Run Prim's Algorithm
     * 
     */
    public run(): void {

        this.graph.offRendering(); // a routine step against rendering performance


        //------ init step -------//

        this.remainingNodes = new Map();
        this.graph.getAllNodes().forEach((node: Node) => this.remainingNodes.set(node.id!, node));
        this.mstNodeIdSet = new Set();

        let startNode = this.graph.getNode(this.START_NODE_ID); // It is also able to randomly chose a start node.
        this.mstNodeIdSet.add(startNode.id!);
        this.remainingNodes.delete(startNode.id!);

        this.exitConditions = false;

        this.graph.drawAt("graph");


        //------ interval step -------//

        let _this = this;

        let intervalTimer = setInterval(function name() {

            _this.graph.offRendering();

            //-- main step --//
            _this.step();

            // exit condition
            if (_this.exitConditions) {

                clearInterval(intervalTimer);
            }

            _this.graph.drawAt("graph");

        }, 500);


    }



    /**
     * Main Step of Prim's Algorithm
     * 
     */
    private step() {

        let mstEdgeCandidate: Array<Edge> = [];
        var _this = this;

        // Collect edges bridging between remaining nodes set and MST nodes set
        _this.mstNodeIdSet.forEach(function (nodeId: number | string) {

            let neighborEdges: Array<Edge> = _this.graph.getNeighborEdgesOf(nodeId);

            neighborEdges.forEach(function (edge: Edge) {

                if (_this.remainingNodes.has(edge.from!) || _this.remainingNodes.has(edge.to!)) {
                    mstEdgeCandidate.push(edge);
                }
            });

        })


        // Chose a minimum length edge from candidates. That edge becomes one of MST edge.
        let mstEdge = mstEdgeCandidate.sort(function (e1: any, e2: any) {
            return e1.length - e2.length;
        })[0];

        // Mark this edge as MST
        this.graph.putEdgeProperty(mstEdge.id as string, 'color', { color: 'orange' });
        this.graph.putEdgeProperty(mstEdge.id as string, 'width', 7);
        this.mstNodeIdSet.add(mstEdge.from!);
        this.mstNodeIdSet.add(mstEdge.to!);

        // Remove node of this edge from remaining node, because of becoming MST node.
        this.remainingNodes.delete(mstEdge.from!);
        this.remainingNodes.delete(mstEdge.to!);

        if (this.remainingNodes.size === 0) this.exitConditions = true;

    }

}