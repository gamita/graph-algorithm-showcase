import Graph from '../graph/Graph'
import GraphCatalog from '../graph/GraphCatalog'


export default class PageRankAlgorithm {


    private graph: Graph;




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
     * Run PageRank Algorithm
     */
    public run(): void {

        this.step();

    }



    /**
     * Main Step of PageRank Algorithm
     * 
     */
    private step() {

       // TODO

    }

}