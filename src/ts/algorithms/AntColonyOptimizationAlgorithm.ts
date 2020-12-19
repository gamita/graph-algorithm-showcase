import Graph from '../graph/Graph'
import GraphCatalog from '../graph/GraphCatalog'
import { Node, Edge } from 'vis-network'
import { Chance } from 'chance'

export default class AntColonyAlgorithm {


    private graph: Graph;


    private antList: Array<Ant> = new Array();


    private NUM_OF_ANTS: number = 30;


    private timeStep: number = 0;


    private shortestEdgeIds: Set<number> = new Set();


    private shortestDistance: number = Number.MAX_VALUE;


    private readonly MIN_PHEROMONE_ON_EDGE: number = 1;


    private readonly VOLATILIZATION_COEF: number = 0.98;


    private readonly MAX_NUM_STEP: number = 150;


    private readonly START_NODE_ID: number = 34;


    private readonly GOAL_NODE_ID: number = 89;


    /**
     * Create & Draw Graph
     * 
     */
    public createGraph(): void {

        // create graph
        this.graph = GraphCatalog.createDeformedLackedLadder(10, 0.2, 0.5);

        // set Start / Goal label
        this.graph.decorateAsStartNode(this.START_NODE_ID);
        this.graph.decorateAsGoalNode(this.GOAL_NODE_ID);

        // set Ant image
        this.graph.putAllNodeProperty('image', './images/ant.png');
        this.graph.putAllNodeProperty('size', 10);

        // draw graph
        this.graph.drawAt("graph");

    }


    /**
     * Run Ant Colony Optimization
     */
    public run(): void {

        this.graph.offRendering(); // a routine step against rendering performance


        //------ Init Step -------//

        // register ants.
        this.antList = [];
        for (let antIndex = 0; antIndex < this.NUM_OF_ANTS; antIndex++) {
            this.antList.push(new Ant(this.graph, this.START_NODE_ID, this.GOAL_NODE_ID, 'Seed' + antIndex));
        }

        // initialize pheromone amount on edges
        this.graph.getAllEdges().forEach((edge: Edge) => {
            this.graph.putEdgeProperty(edge.id, 'pheromone', this.MIN_PHEROMONE_ON_EDGE);
        });

        this.graph.drawAt("graph");


        //------ Interval Step -------//

        let _this = this;

        let intervalTimer = setInterval(function name() {

            _this.graph.offRendering();

            //-- Main Step --//
            _this.step();

            // exit condition
            if (_this.timeStep >= _this.MAX_NUM_STEP) {

                clearInterval(intervalTimer);
            }

            _this.graph.drawAt("graph");


        }, 300);

    }



    /**
     * One step processing (All ants walk one step.)
     */
    private step() {


        // count time-step up. 
        this.timeStep++;

        // pheromone is volatilized according to the volatilization coefficient
        this.graph.getAllEdges().forEach((edge: Edge) => {

            // reduce current pheromone amount on edges by volatilization.
            let pheromoneAmount: number = Math.max(edge['pheromone'] * this.VOLATILIZATION_COEF, this.MIN_PHEROMONE_ON_EDGE);

            this.graph.putEdgeProperty(edge.id, 'pheromone', pheromoneAmount);
            this.graph.putEdgeProperty(edge.id, 'background', { enabled: true, color: 'gold', size: pheromoneAmount - 1 });

        });

        // ants walk one step
        let _this = this;

        this.antList.forEach(ant => {

            let answer = ant.walk();

            if (answer) {
                _this.displayCurrentShortest(answer);
            }

        });


    }



    /**
     * Display and update shortest path
     * 
     * @param answer 
     */
    private displayCurrentShortest(answer: Set<number>) {

        let totalLength = 0;
        answer.forEach(edgeId => {
            totalLength = totalLength + (<any>this.graph.getEdge(edgeId)).length;
        });

        // Update shortest path
        if (totalLength < this.shortestDistance) {

            this.shortestDistance = totalLength;
            this.shortestEdgeIds = answer;

            // Mark shortest path on graph
            let _this = this;

            // once, clear color on all edges
            this.graph.getAllEdges().forEach((edge: Edge) => {
                _this.graph.putEdgeProperty(edge.id, 'color', { color: 'gray' });
                _this.graph.putEdgeProperty(edge.id, 'width', 1);
            });
            // set color on shortest path edges
            this.shortestEdgeIds.forEach((edgeId: number) => {
                _this.graph.putEdgeProperty(edgeId, 'color', { color: 'darkorange' });
                _this.graph.putEdgeProperty(edgeId, 'width', 4);
            });

            // display current min distance on the goal node
            this.graph.putNodeLabel(this.GOAL_NODE_ID, this.shortestDistance.toFixed(0))

        }

    }

}



class Ant {


    private graph: Graph;


    private currentNode: Node;


    private previousEdge: Edge;


    private visitedEdgeIds: Set<number> = new Set();


    private readonly PHEROMONE_PRODUCTION_AMOUNT: number = 10000;


    private readonly MAX_PHEROMONE_ON_EDGE: number = 30;


    private readonly EPSILON: number = 0.1;


    private readonly MAX_WALK_LIMIT: number = 25;


    private readonly START_NODE_ID: number;


    private readonly GOAL_NODE_ID: number;


    private random: Chance;


    constructor(_graph: Graph, startNodeId: number, goalNodeId: number, seed: string) {

        this.graph = _graph;
        this.START_NODE_ID = startNodeId;
        this.GOAL_NODE_ID = goalNodeId;
        this.currentNode = this.graph.getNode(this.START_NODE_ID);
        this.previousEdge = {}; // empty edge
        this.random = new Chance(seed);
    }



    public walk(): Set<any> {

        this.graph.putNodeProperty(this.currentNode.id, 'shape', 'dot'); // hide ant image at the current node.

        // Check current location (Goal Node Check)
        if (this.currentNode.id == this.GOAL_NODE_ID) {

            // If this ant reached the goal node, emit pheromone and return to the start node.
            this.emitPheromone();
            let answer = new Set(this.visitedEdgeIds);

            this.currentNode = this.graph.getNode(this.START_NODE_ID); // return to the start node.
            this.visitedEdgeIds = new Set();
            return answer;
        }

        // Check walk history limit. (Quit failed path finding)
        if (this.visitedEdgeIds.size > this.MAX_WALK_LIMIT) {

            // a wander ant is forced to move to the start node if walk steps over, even though the ant has not reached the goal node.
            this.currentNode = this.graph.getNode(this.START_NODE_ID);
            this.visitedEdgeIds = new Set();
            return;
        }

        // Then, Let's walk.  

        // Chose a next edge.
        let nextEdge: Edge;

        // Epsilon - Greedy way
        if (this.random.floating({ min: 0, max: 1 }) <= this.EPSILON) {
            // choice next walking edge by uniform random
            nextEdge = this.choseNextEdgeByRandom();
        } else {
            // choice next walking edge by pheromone
            nextEdge = this.choseNextEdgeByPheromone();
        }
        this.visitedEdgeIds.add(<number>nextEdge.id);

        // Move to next node
        let nextNode: Node = this.graph.getOppositeSideNode(nextEdge.id, this.currentNode.id);
        this.currentNode = nextNode;
        this.previousEdge = nextEdge;

        this.graph.putNodeProperty(nextNode.id, 'shape', 'image'); // show ant image at the current node.

    }


    /**
     * Ant chose next edge according to the probability by 'pheromone' amount on edges
     */
    private choseNextEdgeByPheromone(): Edge {

        let chosenEdge: Edge = this.graph.choseProbabilisticallyEdgeFromAndExcept(
            this.graph.getNeighborEdgesOf(this.currentNode.id),
            'pheromone',
            [this.previousEdge.id],
            this.random);

        return chosenEdge != null ? chosenEdge : this.previousEdge;

    }


    /**
     * Ant chose next edge according to uniform random
     */
    private choseNextEdgeByRandom(): Edge {

        let chosenEdge: Edge = this.graph.choseRandomEdgeFromAndExcept(
            this.graph.getNeighborEdgesOf(this.currentNode.id),
            [this.previousEdge.id],
            this.random);

        return chosenEdge != null ? chosenEdge : this.previousEdge;

    }


    /**
     * Emit (Calculate) Pheromone
     * 
     */
    private emitPheromone() {

        let totalLength = 0;
        this.visitedEdgeIds.forEach(edgeId => {
            totalLength = totalLength + this.graph.getEdge(edgeId)['length'];
        });

        let bonus = this.PHEROMONE_PRODUCTION_AMOUNT / totalLength;
        let _this = this;

        this.visitedEdgeIds.forEach(edgeId => {

            this.graph.putEdgeProperty(edgeId, 'pheromone',
                Math.min((this.graph.getEdge(edgeId)['pheromone'] + bonus), _this.MAX_PHEROMONE_ON_EDGE));

        });

    }

}