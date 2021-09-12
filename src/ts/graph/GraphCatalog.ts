import Graph from './Graph'
import { Chance } from 'chance'


export default class GraphCatalog {



    /**
     * Create a ladder graph
     * 
     * @param size 
     */
    public static createLadder(size: number, bidirectional: boolean = false): Graph {

        return GraphCatalog.createLackedLadder(size, 0, bidirectional);

    }




    /**
     * Create a lacked ladder graph
     * 
     * Edges are probabilistically removed according to arg lack rate.
     * 
     * @param size 
     * @param lackRate 
     */
    public static createLackedLadder(size: number, lackRate: number, bidirectional: boolean = false): Graph {

        return GraphCatalog.createDeformedLackedLadder(size, lackRate, 0, bidirectional);

    }




    /**
     * Create a deformed lacked ladder graph
     * 
     * @param size 
     * @param lackRate 
     * @param deformRate 
     */
    public static createDeformedLackedLadder(size: number, lackRate: number, deformRate: number, bidirectional: boolean = false): Graph {

        let ladderGraph: Graph = new Graph();
        let currentNodeId: number = 0;
        const pixelCoef: number = 100;
        let random: Chance = new Chance('NiceSeed'); // seed = NiceSeed


        for (let currentRow = 0; currentRow < size; currentRow++) {

            for (let currentCol = 0; currentCol < size; currentCol++) {

                currentNodeId++;

                // Add node. If deformRate > 0, then x an y are offset by deform rate.
                ladderGraph.addNode({
                    id: currentNodeId,
                    x: ((currentCol * pixelCoef) + (random.floating({ min: (-1 * deformRate), max: deformRate }) * pixelCoef)).toFixed(0),
                    y: ((currentRow * pixelCoef) + (random.floating({ min: (-1 * deformRate), max: deformRate }) * pixelCoef)).toFixed(0)
                });

                // Add edge. If lackRate > 0, then edges are probabilistically added into graph by lack rate.
                if (currentCol > 0 && (random.floating({ min: 0, max: 1 }) >= lackRate)) {
                    // Add horizontal toward edge
                    ladderGraph.addEdge({ from: currentNodeId - 1, to: currentNodeId });
                    if (bidirectional) {
                        ladderGraph.addEdge({ to: currentNodeId - 1, from: currentNodeId });
                    }

                }
                if (currentRow > 0 && (random.floating({ min: 0, max: 1 }) >= lackRate)) {
                    // Add vertical toward edge
                    ladderGraph.addEdge({ from: currentNodeId - size, to: currentNodeId });
                    if (bidirectional) {
                        ladderGraph.addEdge({ to: currentNodeId - size, from: currentNodeId });
                    }

                }

            }

        }

        ladderGraph.assignEdgeLength('length');

        return ladderGraph

    }




    /**
     * Create Hierarchy Graph
     * 
     */
    public static createHierarchy(maxTotalNodes: number, maxChildren: number): Graph {

        let hierarchyGraph = new Graph();

        let managementInfo = {
            maxTotalNodes: maxTotalNodes,
            maxChildren: maxChildren,
            noChildNodeIds: new Array<number>(),
            random: new Chance('NiceSeed'),
        }

        managementInfo.noChildNodeIds.push(0);
        hierarchyGraph.addNode({ id: 0 });

        while (hierarchyGraph.getAllNodes().length < managementInfo.maxTotalNodes) {

            let parentNodeId = managementInfo.noChildNodeIds.shift()

            // create child nodes until the number of all nodes will reach the max nodes.
            GraphCatalog.bornChildNode(hierarchyGraph, parentNodeId, managementInfo);

        }

        return hierarchyGraph;

    }




    /**
     * Born child nodes of a given parent node
     * 
     * @param hierarchyGraph 
     * @param parentNodeId 
     * @param managementInfo 
     * 
     */
    private static bornChildNode(hierarchyGraph: Graph, parentNodeId: number, managementInfo: any): void {

        // determine the number of child nodes, randomly.
        let numberOfChild: number = managementInfo.random.integer({ min: 1, max: managementInfo.maxChildren });

        for (let childIndex = 1; childIndex <= numberOfChild; childIndex++) {

            if (hierarchyGraph.getAllNodes().length >= managementInfo.maxTotalNodes) {
                return;
            }

            let childNodeId: number = hierarchyGraph.getAllNodes().length;

            // born child node and link with parent.
            managementInfo.noChildNodeIds.push(childNodeId);
            hierarchyGraph.addNode({ id: childNodeId });
            hierarchyGraph.addEdge({ from: parentNodeId, to: childNodeId });

        }

    }




    /**
     * Create Regular Polygon Graph
     * 
     * @param numOfPolygon 
     * @param radius
     * @param lackRate
     */
    public static createRegularPolygon(numOfPolygon: number, radius: number, lackRate: number): Graph {

        let regularPolygonGraph: Graph = new Graph();

        // Add nodes
        for (let index = 1; index <= numOfPolygon; index++) {

            let theta = Math.PI * 2 * ((index - 1) / numOfPolygon);
            let _x = (Math.sin(theta) * radius);
            let _y = (Math.cos(theta) * radius);
            // assign nodes clock-wise
            regularPolygonGraph.addNode({ id: index, x: _x, y: (_y - radius) * -1 });

        }


        // Add edges
        let random: Chance = new Chance('NiceSeed'); // seed = NiceSeed
        for (let from = 1; from <= numOfPolygon; from++) {

            for (let to = from + 1; to <= numOfPolygon; to++) {
                if (random.floating({ min: 0, max: 1 }) >= lackRate) {
                    regularPolygonGraph.addEdge({ from: from, to: to });
                }
            }

        }

        regularPolygonGraph.assignEdgeLength('length');
        regularPolygonGraph.assignNodeTextById();

        return regularPolygonGraph;

    }




    /**
     * Create Regular Polygon Graph and Center Node
     * 
     * @param numOfPolygon 
     * @param radius 
     * @param lackRate 
     */
    public static createRegularPolygonWithCenter(numOfPolygon: number, radius: number, lackRate: number): Graph {

        let regularPolygonGraph = this.createRegularPolygon(numOfPolygon, radius, lackRate);

        // Add center node.
        regularPolygonGraph.addNode({ id: 0, x: 0, y: radius });

        // Add edge from center node to other nodes.
        for (let index = 1; index <= numOfPolygon; index++) {
            regularPolygonGraph.addEdge({ from: 0, to: index });
        }

        regularPolygonGraph.assignEdgeLength('length');
        regularPolygonGraph.assignNodeTextById();

        return regularPolygonGraph;

    }




    /**
     * Create Directed Acyclic Graph
     * 
     * Occasionally, the created graph includes isolation nodes
     * 
     * @param size 
     * @param lackRate 
     */
    public static createDAG(size: number, lackRate: number, textPrefix: string): Graph {


        let dag: Graph = new Graph();
        let currentNodeId: number = 0;
        let random: Chance = new Chance('GoodSeed!'); // seed = GoodSeed!


        // Add nodes
        for (let index = 1; index <= size; index++) {
            dag.addNode({ id: index, label: textPrefix + String.fromCodePoint(64 + index) });
        }

        // Add edges
        for (let from = 1; from <= size; from++) {
            for (let to = from + 1; to <= size; to++) {
                if (random.floating({ min: 0, max: 1 }) >= lackRate) {
                    dag.addEdge({ from: from, to: to, arrows: 'to' });
                }
            }
        }

        return dag;

    }


    /**
     * Create Graph for Centrality Demos
     * 
     * @returns graph
     */
    public static createDemoGraphOfCentrality(): Graph {

        let centralityGraph: Graph = new Graph();
        centralityGraph.addNode({ id: 1, x: 0, y: 0 });
        centralityGraph.addNode({ id: 2, x: 240, y: 60 });
        centralityGraph.addNode({ id: 3, x: -100, y: 160 });
        centralityGraph.addNode({ id: 4, x: -190, y: -120 });
        centralityGraph.addNode({ id: 5, x: 60, y: -140 });
        centralityGraph.addNode({ id: 6, x: 240, y: -140 });
        centralityGraph.addNode({ id: 7, x: -240, y: 40 });
        centralityGraph.addNode({ id: 8, x: -160, y: 260 });
        centralityGraph.addNode({ id: 9, x: -220, y: 400 });
        centralityGraph.addNode({ id: 10, x: 340, y: 160 });
        centralityGraph.addNode({ id: 11, x: 500, y: 140 });
        centralityGraph.addNode({ id: 12, x: 110, y: 230 });
        centralityGraph.addNode({ id: 13, x: -380, y: 450 });
        centralityGraph.addNode({ id: 14, x: 160, y: 420 });
        centralityGraph.addNode({ id: 15, x: 360, y: 360 });
        centralityGraph.addNode({ id: 16, x: 510, y: 450 });
        centralityGraph.addNode({ id: 17, x: -140, y: -260 });
        centralityGraph.addNode({ id: 18, x: -370, y: -270 });
        centralityGraph.addNode({ id: 19, x: -440, y: 120 });
        centralityGraph.addNode({ id: 20, x: 180, y: -240 });

        centralityGraph.addEdge({ from: 2, to: 1, arrows: 'to' });
        centralityGraph.addEdge({ from: 4, to: 1, arrows: 'to' });
        centralityGraph.addEdge({ from: 4, to: 7, arrows: 'to' });
        centralityGraph.addEdge({ from: 4, to: 17, arrows: 'to' });
        centralityGraph.addEdge({ from: 5, to: 1, arrows: 'to' });
        centralityGraph.addEdge({ from: 6, to: 1, arrows: 'to' });
        centralityGraph.addEdge({ from: 6, to: 5, arrows: 'to' });
        centralityGraph.addEdge({ from: 7, to: 19, arrows: 'to' });
        centralityGraph.addEdge({ from: 1, to: 12, arrows: 'to' });
        centralityGraph.addEdge({ from: 1, to: 3, arrows: 'to' });
        centralityGraph.addEdge({ from: 3, to: 7, arrows: 'to' });
        centralityGraph.addEdge({ from: 8, to: 3, arrows: 'to' });
        centralityGraph.addEdge({ from: 8, to: 14, arrows: 'to' });
        centralityGraph.addEdge({ from: 9, to: 8, arrows: 'to' });
        centralityGraph.addEdge({ from: 12, to: 10, arrows: 'to' });
        centralityGraph.addEdge({ from: 10, to: 11, arrows: 'to' });
        centralityGraph.addEdge({ from: 13, to: 9, arrows: 'to' });
        centralityGraph.addEdge({ from: 14, to: 12, arrows: 'to' });
        centralityGraph.addEdge({ from: 14, to: 15, arrows: 'to' });
        centralityGraph.addEdge({ from: 15, to: 12, arrows: 'to' });
        centralityGraph.addEdge({ from: 16, to: 15, arrows: 'to' });
        centralityGraph.addEdge({ from: 17, to: 18, arrows: 'to' });
        centralityGraph.addEdge({ from: 20, to: 5, arrows: 'to' });
        centralityGraph.addEdge({ from: 20, to: 17, arrows: 'to' });

        return centralityGraph;
    }

}
