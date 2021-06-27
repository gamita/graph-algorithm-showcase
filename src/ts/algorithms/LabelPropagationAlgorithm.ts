import { Chance } from 'chance';
import { Node } from 'vis-network';
import Graph from '../graph/Graph';
import GraphCatalog from '../graph/GraphCatalog';

export default class LabelPropagationAlgorithm {


    private graph: Graph;


    private readonly NUM_OF_NODES: number = 100;


    /**
     * Create & Draw Graph
     * 
     */
    public createGraph(): void {


        // create graph
        this.graph = GraphCatalog.createHierarchy(this.NUM_OF_NODES, 7);

        this.graph.putAllNodeProperty("size", 25);
        let randomColor: Chance = new Chance("ColorSeed");

        let _this = this;
        this.graph.getAllNodes().forEach(node => {
            _this.graph.putNodeColor(node.id, randomColor.color({ format: 'hex' }));
        })

        // draw graph
        this.graph.drawPhysicallyAt("graph");

    }



    /**
     * Run Label Propagation Algorithm
     * 
     */
    public run(): void {

        this.graph.offRendering();
        this.step();
        this.graph.drawPhysicallyAt("graph");

    }



    /**
     * Main Step of Label Propagation Algorithm
     * 
     */
    private step() {

        let _this = this;

        _this.graph.getShuffledAllNodes("ShuffleSeed").forEach(node => {

            let majorityColor: string = _this.getMajorityColorOf(node);

            _this.graph.putNodeColor(node.id, majorityColor);

        });

    }



    /**
     * Get a surround majority color of given node.
     * 
     * @param node 
     * @returns 
     */
    private getMajorityColorOf(node: Node): string {

        let majorityColor: string = "";
        let majorityCount = 0;
        let counter = new Map();

        let neighbors = this.graph.getNeighborNodesOf(node.id);

        neighbors.forEach(neighbor => {

            let neighborColor: string = neighbor.color.toString();

            if (counter.has(neighborColor)) {
                counter.set(neighborColor, counter.get(neighborColor) + 1);
            } else {
                counter.set(neighborColor, 1);
            }

            if (counter.get(neighborColor) > majorityCount) {
                majorityColor = neighborColor;
                majorityCount = counter.get(neighborColor);
            }

        });

        return majorityColor;

    }


}