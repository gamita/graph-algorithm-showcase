import Graph from '../graph/Graph'
import GraphCatalog from '../graph/GraphCatalog'
import { Node } from 'vis-network'


export default class PageRankAlgorithm {


    private graph: Graph;

    private numOfAllNodes: number = 0;

    private readonly DAMPING_FACTOR: number = 0.85;

    private readonly NODE_DISPLAY_SIZE_COEF = 300;


    /**
     * Create & Draw Graph
     * 
     */
    public createGraph(): void {

        // create graph for centrality demo 
        this.graph = GraphCatalog.createDemoGraphOfCentrality();
        this.numOfAllNodes = this.graph.getAllNodes().length;

        let _this = this;
        this.graph.getAllNodes().forEach((node: Node) => {
            let initRankValue = 1 / _this.numOfAllNodes;
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

        //-----------  a term of out of damping factor ------------------------//
        // calc random jump probability
        let randomJumpProb = ((1 - _this.DAMPING_FACTOR) / _this.numOfAllNodes);



        //----------- terms of inside of damping factor -----------------------//

        // calc transition probability from no out-edge pages
        let noOutPageProb = 0;
        let rankSumOfNoOutPage = 0;

        _this.graph.getAllNodes().forEach((node: Node) => {
            if (_this.graph.getOutNeighborNodesOf(node.id).length == 0) {
                rankSumOfNoOutPage = rankSumOfNoOutPage + node['rank'];
            }
        });
        noOutPageProb = _this.DAMPING_FACTOR * (rankSumOfNoOutPage / _this.numOfAllNodes);

        // calc transition probability from in-neighbor pages
        _this.graph.getAllNodes().forEach((node: Node) => {

            let rankSumOfInNeighbor = 0;

            _this.graph.getInNeighborNodesOf(node.id).forEach((inNeighbor: Node) => {

                let neighborRankValue = inNeighbor['rank'];
                let numberOfOutEdge = _this.graph.getNeighborOutEdgesOf(inNeighbor.id).length;

                rankSumOfInNeighbor = rankSumOfInNeighbor + (neighborRankValue / numberOfOutEdge);

            });

            // calc renewal rank value, according to page rank formula
            let renewRankValue = randomJumpProb + noOutPageProb + (_this.DAMPING_FACTOR * rankSumOfInNeighbor);
            _this.graph.putNodeProperty(node.id, 'rank', renewRankValue);
            _this.graph.putNodeText(node.id, renewRankValue.toFixed(3));
            _this.graph.putNodeSize(node.id, renewRankValue * _this.NODE_DISPLAY_SIZE_COEF);

        });

    }

}