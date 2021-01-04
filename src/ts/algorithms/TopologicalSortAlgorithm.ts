import Graph from '../graph/Graph'
import GraphCatalog from '../graph/GraphCatalog'
import { Node, Edge } from 'vis-network'


export default class TopologicalSortAlgorithm {


    private graph: Graph;





    /**
     * Create & Draw DAG
     * 
     */
    public createGraph(): void {

        // create graph
        this.graph = GraphCatalog.createDAG(20, 0.85);

        // draw graph
        this.graph.drawAt("graph");

    }


    /**
     * Run Topological Sort Algorithm
     */
    public run(): void {

        // TODO

    }



    /**
     * Main Step of Topological Sort Algorithm
     * 
     */
    private step() {

        // TODO

    }

}