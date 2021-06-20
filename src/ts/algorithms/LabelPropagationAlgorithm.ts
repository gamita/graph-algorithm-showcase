import { Chance } from 'chance';
import { Node } from 'vis-network';
import Graph from '../graph/Graph';
import GraphCatalog from '../graph/GraphCatalog';

export default class LabelPropagationAlgorithm {

    private graph: Graph;


    private readonly NUM_OF_NODES: number = 100;


    private readonly NUM_ITERATION: number = 10;



    /**
     * Create & Draw Graph
     * 
     */
    public createGraph(): void {

        // create graph
        this.graph = GraphCatalog.createHierarchy(this.NUM_OF_NODES, 10);

        this.graph.putAllNodeProperty("size", 20);
        let randomColor: Chance = new Chance("GoodSeed");

        for (let nodeId = 0; nodeId < this.graph.getAllNodes().length; nodeId++) {
            this.graph.putNodeColor(nodeId, randomColor.color());
            this.graph.putNodeText(nodeId, "" + nodeId);
        }

        // draw graph
        this.graph.drawPhysicallyAt("graph");

    }



    /**
     * Run Label Propagation Algorithm
     * 
     */
    public run(): void {

        let _this = this;
        let iteration = 0;

        let intervalTimer = setInterval(function name() {

            _this.graph.offRendering();

            //-- main step --//
            _this.step();
            iteration++;

            // exit condition
            if (iteration >= _this.NUM_ITERATION) {

                clearInterval(intervalTimer);
            }

            _this.graph.drawPhysicallyAt("graph");

        }, 3000);

    }



    /**
     * Main Step of Label Propagation Algorithm
     * 
     */
    private step() {

        let _this = this;
        let nodeIds = Array.from(new Array(this.NUM_OF_NODES)).map((v, i) => i);
        let shuffler: Chance = new Chance();
        let shuffledNodeIds = shuffler.shuffle(nodeIds);

        shuffledNodeIds.forEach(nodeId => {

            let neighbors = _this.graph.getNeighborNodesOf(nodeId);
            let popularColor: string = _this.getClusterColor(neighbors);

            _this.graph.putNodeColor(nodeId, popularColor);

        });

    }



    private getClusterColor(neighbors: Array<Node>): string {

        let clusterColor: string = "";
        let counter = new Map();
        let maxCount = 0;

        neighbors.forEach(neighbor => {

            let currentColor: string = neighbor.color.toString();

            if (counter.has(currentColor)) {
                counter.set(currentColor, counter.get(currentColor) + 1);
            } else {
                counter.set(currentColor, 1);
            }

            if (counter.get(currentColor) > maxCount) {
                clusterColor = currentColor;
                maxCount = counter.get(currentColor);
            }

        });

        return clusterColor;

    }


}