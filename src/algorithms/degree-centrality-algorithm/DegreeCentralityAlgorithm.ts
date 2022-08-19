import Graph from 'graph-components/Graph'
import GraphCatalog from 'graph-components/GraphCatalog'
import { Node } from 'vis-network'


export class DegreeCentralityAlgorithm {


    private graph: Graph = new Graph();


    private readonly NODE_DISPLAY_SIZE_COEF = 64;


    private readonly NODE_DISPLAY_MIN_SIZE = 3;



    /**
     * Create & Draw Graph
     * 
     */
    public createGraph(): void {

        // create graph for centrality demo 
        this.graph = GraphCatalog.createDemoGraphOfCentrality();

        // draw graph
        this.graph.drawAt("graph");

    }


    /**
     * Run Degree Centrality Algorithm
     */
    public run(): void {

        this.graph.offRendering(); // a routine step against rendering performance

        this.step();

        this.graph.drawAt("graph");

    }



    /**
     * Main Step of Degree Centrality Algorithm
     * 
     */
    private step() {

        let _this = this;

        this.graph.getAllNodes().forEach((node: Node) => {

            // counting the number of in-neighbors
            let countOfInNeighbor = _this.graph.getNeighborInEdgesOf(node.id!).length;

            // display the degree centrality value on graph.
            _this.graph.putNodeFont(node.id!, "20px arial steelblue");
            _this.graph.putNodeText(node.id!, countOfInNeighbor.toFixed());
            // node size is proportional to square root of in-neighbors. (just for apparent impression.) 
            _this.graph.putNodeSize(node.id!, Math.max(Math.sqrt(countOfInNeighbor * _this.NODE_DISPLAY_SIZE_COEF), _this.NODE_DISPLAY_MIN_SIZE));

        })

    }

}