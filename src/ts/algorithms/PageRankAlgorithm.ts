import Graph from '../graph/Graph'
import GraphCatalog from '../graph/GraphCatalog'
import { Node } from 'vis-network'


export default class PageRankAlgorithm {


    private graph: Graph;

    private numOfNodes: number = 0;

    private readonly DAMPING_FACTOR: number = 0.85;

    private readonly NODE_DISPLAY_SIZE_COEF = 300;


    /**
     * Create & Draw Graph
     * 
     */
    public createGraph(): void {

        // create graph for centrality demo 
        this.graph = GraphCatalog.createDemoGraphOfCentrality();
        this.numOfNodes = this.graph.getAllNodes().length;

        let _this = this;
        this.graph.getAllNodes().forEach((node: Node) => {
            let initRankValue = 1 / _this.numOfNodes;
            _this.graph.putNodeProperty(node.id, 'rank', initRankValue);
            _this.graph.putNodeText(node.id, initRankValue.toFixed(3));
            _this.graph.putNodeFont(node.id, "20px arial steelblue");
            _this.graph.putNodeSize(node.id, initRankValue * _this.NODE_DISPLAY_SIZE_COEF);
        });

        // draw graph
        this.graph.drawAt("graph");

    }


    /**
     * Run PageRank Algorithm
     */
    public run(): void {

        this.graph.offRendering(); // a routine step against rendering performance

        //-- main step --//
        this.step();

        this.graph.drawAt("graph");

    }



    /**
     * Main Step of PageRank Algorithm
     * 
     */
    private step() {

        let _this = this;

        let nodeCount = _this.graph.getAllNodes().length;

        _this.graph.getAllNodes().forEach((node: Node) => {

            let inSum = 0;

            _this.graph.getInNeighborNodesOf(node.id).forEach((inNeighbor: Node) => {

                let neighborRankValue = inNeighbor['rank'];
                let numberOfOutEdge = _this.graph.getNeighborOutEdgesOf(inNeighbor.id).length;

                inSum = inSum + (neighborRankValue / numberOfOutEdge);

            });

            // calc new rank value, according to page rank formula   TODO: check formula definition
            let renewRankValue = ((1 - _this.DAMPING_FACTOR) / _this.numOfNodes) + inSum;
            _this.graph.putNodeProperty(node.id, 'rank', renewRankValue);
            _this.graph.putNodeText(node.id, renewRankValue.toFixed(3));
            _this.graph.putNodeSize(node.id, renewRankValue * _this.NODE_DISPLAY_SIZE_COEF);

        });

    }

}