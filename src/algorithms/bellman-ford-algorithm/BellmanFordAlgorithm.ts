import { Edge, Node } from 'vis-network';
import Graph from 'graph-components/Graph';
import GraphCatalog from 'graph-components/GraphCatalog';

export class BellmanFordAlgorithm {


    private graph: Graph = new Graph();


    private convergence = false;


    private readonly START_NODE_ID: number = 34;


    private readonly GOAL_NODE_ID: number = 89;



    /**
     * Create & Draw Graph
     * 
     */
    public createGraph(): void {

        // create graph
        this.graph = GraphCatalog.createDeformedLackedLadder(10, 0.2, 0.5, true);

        // add Warp Node and Edges
        this.graph.addNode({ id: 101, x: -100, y: 1000, label: 'Warp Node', color: 'darkslateblue', shape: 'diamond' });
        this.graph.addEdge({ id: 10000, from: 11, to: 101, length: -100, label: 'Length: -100', arrows: 'to', dashes: true, font: { size: 22 } });
        this.graph.addEdge({ id: 10001, from: 101, to: 97, length: -100, label: 'Length: -100', arrows: 'to', dashes: true, font: { size: 22 } });
        this.graph.putAllEdgeProperty('arrows', 'to');

        // set Start / Goal label
        this.graph.decorateAsStartNode(this.START_NODE_ID);
        this.graph.decorateAsGoalNode(this.GOAL_NODE_ID);

        // draw graph
        this.graph.drawAt("graph");

    }



    /**
     * Run Bellman-Ford Algorithm
     * 
     */
    public run(): void {

        this.graph.offRendering(); // a routine step against rendering performance


        //------ init step -------//

        // set start node distance ( = 0) and init other nodes distance
        this.graph.putAllNodeProperty('distance', Number.MAX_VALUE);
        this.graph.putNodeProperty(this.START_NODE_ID, 'distance', 0);

        this.graph.drawAt("graph");


        //------ interval step -------//

        let _this = this;

        let intervalTimer = setInterval(function name() {

            _this.graph.offRendering();

            //-- main step --//
            _this.step();

            // exit condition
            if (_this.convergence) {

                _this.graph.tracePath(_this.GOAL_NODE_ID, 'parentEdgeId', 'parentNodeId');

                clearInterval(intervalTimer);
            }

            _this.graph.drawAt("graph");

        }, 500);


    }



    /**
     * Main Step of Bellman-Ford Algorithm
     * 
     */
    private step() {

        let _this = this;

        _this.convergence = true;
        _this.graph.putAllNodeProperty('color', 'silver');

        this.graph.getAllNodes().forEach((sourceNode: Node) => {

            let neighborEdges: Array<Edge> = this.graph.getNeighborOutEdgesOf(sourceNode.id!);

            neighborEdges.forEach((neighborEdge: Edge) => {

                let neighborNode = this.graph.getOppositeSideNode(neighborEdge.id!, sourceNode.id!);
                let currentDistance: number = this.graph.getProperty(neighborNode, "distance");
                let newCandidateDistance: number = this.graph.getProperty(sourceNode, "distance") + neighborEdge.length;

                if (currentDistance > newCandidateDistance) {

                    // update current distance value by new distance value
                    _this.graph.putNodeProperty(neighborNode.id!, 'distance', newCandidateDistance);
                    _this.graph.putNodeText(neighborNode.id!, newCandidateDistance.toFixed(0));
                    _this.graph.putNodeProperty(neighborNode.id!, 'parentNodeId', sourceNode.id);
                    _this.graph.putNodeProperty(neighborNode.id!, 'parentEdgeId', neighborEdge.id);
                    _this.graph.putNodeColor(neighborNode.id!, 'gold');

                    _this.convergence = false;

                }

            });

        });

    }

}