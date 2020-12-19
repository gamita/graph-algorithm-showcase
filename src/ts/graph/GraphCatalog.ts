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

        while (hierarchyGraph.getAllNodes().length <= managementInfo.maxTotalNodes) {

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

            if (hierarchyGraph.getAllNodes().length > managementInfo.maxTotalNodes) {
                return;
            }

            let childNodeId: number = hierarchyGraph.getAllNodes().length;

            // born child node and link with parent.
            managementInfo.noChildNodeIds.push(childNodeId);
            hierarchyGraph.addNode({ id: childNodeId });
            hierarchyGraph.addEdge({ from: parentNodeId, to: childNodeId });

        }

    }

}

