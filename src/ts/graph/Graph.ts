import { DataSet } from 'vis-data'
import { Network, Node, Edge } from 'vis-network'
import { Chance } from 'chance'


/**
 * Graph Class
 * 
 * this class provides a basic graph structure and manipulation.
 * 
 */
export default class Graph {


    // data set (nodes + edges)
    private graphDataSet = {
        nodes: new DataSet<Node>({}),
        edges: new DataSet<Edge>({})
    };


    // graph network
    private network: Network = null;



    private random: Chance = new Chance('NiceSeed');




    //-------- Retrieve Operation --------//



    /**
     * Return all nodes of this graph
     */
    public getAllNodes(): DataSet<Node> {

        return this.graphDataSet.nodes;

    }


    /**
     * Return shuffled all nodes of this graph
     * 
     * @param shuffleSeed 
     * @returns 
     */
    public getShuffledAllNodes(shuffleSeed: string): Array<Node> {

        let shuffler: Chance = new Chance(shuffleSeed);

        return shuffler.shuffle(this.graphDataSet.nodes.get());

    }


    /**
     * Return a matched node object by node ID
     * 
     * @param nodeId 
     */
    public getNode(nodeId: string | number): Node {

        return <Node>this.graphDataSet.nodes.get(nodeId);

    }



    public getAllEdges(): DataSet<Edge> {

        return this.graphDataSet.edges;

    }



    /**
     * Return shuffled all edges of this graph
     * 
     * @param shuffleSeed 
     * @returns 
     */
    public getShuffledAllEdges(shuffleSeed: string): Array<Edge> {

        let shuffler: Chance = new Chance(shuffleSeed);

        return shuffler.shuffle(this.graphDataSet.edges.get());

    }



    /**
     * Return a matched edge object by edge ID 
     * 
     * @param edgeId 
     */
    public getEdge(edgeId: string | number): Edge {

        return <Edge>this.graphDataSet.edges.get(edgeId);

    }


    /**
     * Return connected nodes of arg node
     * 
     * @param nodeId 
     */
    public getNeighborNodesOf(nodeId: string | number): Array<Node> {

        let adjacentNodes = new Array<Node>();

        // by linear search
        this.graphDataSet.edges.forEach((edge: Edge) => {

            if (edge.from == nodeId) {
                adjacentNodes.push(this.getNode(edge.to));
            }

            if (edge.to == nodeId) {
                adjacentNodes.push(this.getNode(edge.from));
            }

        })

        return adjacentNodes;

    }



    /**
     * Return connected edges of arg node
     * 
     * @param nodeId 
     */
    public getNeighborEdgesOf(nodeId: string | number): Array<Edge> {

        let neighborEdges = new Array<Edge>();

        // by linear search
        this.graphDataSet.edges.forEach((edge: Edge) => {

            if (edge.from == nodeId || edge.to == nodeId) {
                neighborEdges.push(edge);
            }

        })

        return neighborEdges;

    }


    public getNeighborInEdgesOf(nodeId: string | number): Array<Edge> {

        let neighborEdges = new Array<Edge>();

        // by linear search
        this.graphDataSet.edges.forEach((edge: Edge) => {

            if (edge.to == nodeId) {
                neighborEdges.push(edge);
            }

        })

        return neighborEdges;

    }



    public getNeighborOutEdgesOf(nodeId: string | number): Array<Edge> {

        let neighborEdges = new Array<Edge>();

        // by linear search
        this.graphDataSet.edges.forEach((edge: Edge) => {

            if (edge.from == nodeId) {
                neighborEdges.push(edge);
            }

        })

        return neighborEdges;

    }



    /**
     * Return a opposite side node from arg node on arg edge. 
     * 
     * @param edgeId 
     * @param nodeId 
     */
    public getOppositeSideNode(edgeId: string | number, nodeId: string | number): Node {

        let edge = this.getEdge(edgeId);

        if (edge.from == nodeId) {
            return this.getNode(edge.to);
        } else if (edge.to == nodeId) {
            return this.getNode(edge.from);
        } else {
            return {}
        }

    }





    //-------- Manipulation Operation --------//



    /**
     * Add node
     * 
     * @param content node object 
     */
    public addNode(content: any) {

        this.graphDataSet.nodes.add(content);

    }


    /**
     * Add edge
     * 
     * @param content edge object
     */
    public addEdge(content: any) {

        this.graphDataSet.edges.add(content);

    }



    /**
     * Put a property for node
     * 
     * @param nodeId node ID
     * @param name target property name
     * @param value target property value
     * 
     */
    public putNodeProperty(nodeId: string | number, name: string, value: any): void {

        let updateContent: any = {}
        updateContent.id = nodeId;
        updateContent[name] = value;

        this.graphDataSet.nodes.update(updateContent);

    }



    /**
     * Put a node color property
     * 
     * @param nodeId 
     * @param color 
     */
    public putNodeColor(nodeId: string | number, color: string) {

        this.putNodeProperty(nodeId, 'color', color);

    }



    /**
     * Put a node shape property
     * 
     * @param nodeId 
     * @param color 
     */
    public putNodeShape(nodeId: string | number, shape: string) {

        this.putNodeProperty(nodeId, 'shape', shape);

    }



    /**
     * Put a node size property
     * 
     * @param nodeId 
     * @param color 
     */
    public putNodeSize(nodeId: string | number, size: number) {

        this.putNodeProperty(nodeId, 'size', size);

    }



    /**
     * Put a node label property
     * 
     * @param nodeId 
     * @param label 
     */
    public putNodeText(nodeId: string | number, labelText: string) {

        this.putNodeProperty(nodeId, 'label', labelText);

    }


    /**
     * Append a node label property
     * 
     * @param nodeId 
     * @param appendLabelText 
     */
    public putNodeTextAppend(nodeId: string | number, appendLabelText: string) {

        this.putNodeProperty(nodeId, 'label', this.getNode(nodeId).label + appendLabelText);

    }



    /**
     * Put a node font property
     * 
     * @param nodeId 
     * @param label 
     */
    public putNodeFont(nodeId: string | number, label: string) {

        this.putNodeProperty(nodeId, 'font', label);

    }




    /**
     * 
     * @param nodeId 
     */
    public decorateAsStartNode(nodeId: string | number) {

        this.putNodeColor(nodeId, 'dodgerblue');
        this.putNodeShape(nodeId, 'star');
        this.putNodeText(nodeId, 'Start');
        this.putNodeFont(nodeId, '24px arial dodgerblue');

    }



    /**
     * 
     * @param nodeId 
     */
    public decorateAsGoalNode(nodeId: string | number) {

        this.putNodeColor(nodeId, 'dodgerblue');
        this.putNodeShape(nodeId, 'star');
        this.putNodeText(nodeId, 'Goal');
        this.putNodeFont(nodeId, '24px arial dodgerblue');

    }



    /**
     * Put a property for all nodes
     * 
     * @param name 
     * @param value 
     */
    public putAllNodeProperty(name: string, value: any): void {

        this.graphDataSet.nodes.forEach((node: Node) => {
            this.putNodeProperty(node.id, name, value);
        });

    }


    /**
     * Put a property for edge
     * 
     * @param edgeId edge ID
     * @param name target property name
     * @param value target property value
     * 
     */
    public putEdgeProperty(edgeId: string | number, name: string, value: any): void {

        let updateContent: any = {}
        updateContent.id = edgeId;
        updateContent[name] = value;

        this.graphDataSet.edges.update(updateContent);

    }



    /**
     * Put a property for all edges
     * 
     * @param name 
     * @param value 
     */
    public putAllEdgeProperty(name: string, value: any): void {

        this.graphDataSet.edges.forEach((edge: Edge) => {
            this.putEdgeProperty(edge.id, name, value);
        });

    }



    /**
     * Put a edge label property
     * 
     * @param edgeId 
     * @param label 
     */
    public putEdgeText(edgeId: string | number, labelText: string) {

        this.putEdgeProperty(edgeId, 'label', labelText);

    }



    /**
     * Put a edge color property
     * 
     * @param edgeId 
     * @param color 
     */
    public putEdgeColor(edgeId: string | number, color: string) {

        this.putEdgeProperty(edgeId, 'color', color);

    }



    /**
     * 
     * Assign Euclid distance property on edge, calculating by x and y properties
     * 
     * @param distancePropertyName 
     */
    public assignEdgeLength(distancePropertyName: string): void {

        this.graphDataSet.edges.forEach((edge: Edge) => {

            let fromNode = <Node>this.graphDataSet.nodes.get(<string>edge.from);
            let toNode = <Node>this.graphDataSet.nodes.get(<string>edge.to);

            let distance = <number>Math.sqrt(((<number>fromNode.x - <number>toNode.x) ** 2) + ((<number>fromNode.y - <number>toNode.y) ** 2));

            this.putEdgeProperty(<string>edge.id, distancePropertyName, Math.round(distance));

        })

    }


    /**
     * Assign id-text as node displayed text
     */
    public assignNodeTextById(): void {

        this.getAllNodes().forEach((node: Node) => this.putNodeText(node.id, node.id.toString()));

    }



    //-------- Drawing Operation --------//



    /**
     * Draw this network (nodes assignment is static)
     * 
     * @param domElementId 
     */
    public drawAt(domElementId: string): void {

        this.draw(domElementId, false);

    }



    /**
     * Draw this network (nodes assignment is dynamic)
     * 
     * @param domElementId 
     */
    public drawPhysicallyAt(domElementId: string): void {

        this.draw(domElementId, true);

    }



    /**
     * Draw this network
     * 
     * 
     * @param domElementId 
     * @param physics 
     */
    private draw(domElementId: string, physics: boolean): void {

        let options = {
            layout: {
                randomSeed: 1234,
            },
            nodes: {
                shape: 'dot',
                size: 7,
                shadow: true,
                color: {
                    background: 'silver',
                    border: 'gray',
                },
                borderWidth: 2.5,
                font: {
                    size: 18
                },
            },
            edges: {
                shadow: true,
                color: {
                    inherit: false
                },
                font: {
                    size: 18
                },
            },
            physics: {
                enabled: physics,
                solver: 'forceAtlas2Based'
            },
            interaction: {
                navigationButtons: true,
                hideEdgesOnDrag: true,
                //keyboard: true,
            },
        };


        let container: any = null;
        container = document.getElementById(domElementId);

        this.network = new Network(container, this.graphDataSet, options);

    }



    /**
     * Stop rendering network 
     */
    public offRendering(): void {

        if (this.network) {
            this.network.destroy();
        }

    }



    /**
     * Trace path from a given node and give a color to the trace path.
     * 
     * @param nodeId 
     * @param traceEdgePropName 
     * @param traceNodePropName 
     * @param isSetWidth 
     * @param width 
     * @param isSetColor 
     * @param color 
     */
    public tracePath(nodeId: number | string, traceEdgePropName: string, traceNodePropName: string,
        isSetWidth: boolean = true, width: number = 7, isSetColor: boolean = true, color: string = 'orange') {

        this.traceToNext(nodeId, traceEdgePropName, traceNodePropName, isSetWidth, width, isSetColor, color);

    }



    /**
     * Hop to next edge and node to give a color.
     * 
     * @param nextNodeId 
     * @param traceEdgePropName 
     * @param traceNodePropName 
     * @param isSetWidth 
     * @param width 
     * @param isSetColor 
     * @param color 
     */
    private traceToNext(nextNodeId: number | string, traceEdgePropName: string, traceNodePropName: string,
        isSetWidth: boolean = true, width: number = 7, isSetColor: boolean = true, color: string = 'orange') {

        let nextNode: Node = this.getNode(nextNodeId);

        let nextEdge: Edge = this.getEdge(nextNode[traceEdgePropName]);

        // marking a edge on shortest pass
        if (isSetColor) this.putEdgeProperty(nextEdge.id, 'color', { color: color });
        if (isSetWidth) this.putEdgeProperty(nextEdge.id, 'width', width);

        if (nextNode[traceNodePropName]) {
            this.traceToNext(nextNode[traceNodePropName], traceEdgePropName, traceNodePropName,
                isSetWidth, width, isSetColor, color);
        }

    }






    //-------- Random Operation --------//


    /**
     * Chose a node of this graph by uniform random
     * 
     * @param givenRandom 
     */
    public choseRandomNode(givenRandom: Chance = this.random): Node | null {
        return <Node>this.choseRandomFrom(this.graphDataSet.nodes.get(), givenRandom);
    }



    /**
     * Chose a edge of this graph by uniform random
     * 
     * @param givenRandom 
     */
    public choseRandomEdge(givenRandom: Chance = this.random): Edge | null {
        return <Edge>this.choseRandomFrom(this.graphDataSet.edges.get(), givenRandom);
    }



    /**
     * Chose a node from the given node array by uniform random
     * 
     * @param population 
     * @param givenRandom 
     */
    public choseRandomNodeFrom(population: Array<Node>, givenRandom: Chance = this.random): Node | null {
        return <Node>this.choseRandomFrom(population, givenRandom);
    }



    /**
     * Chose a edge from the given node array by uniform random
     * 
     * @param population 
     * @param givenRandom 
     */
    public choseRandomEdgeFrom(population: Array<Edge>, givenRandom: Chance = this.random): Edge | null {
        return <Edge>this.choseRandomFrom(population, givenRandom);
    }



    /**
     * Chose a node or edge from the given node/edge array by uniform random
     * 
     * @param population 
     * @param givenRandom 
     */
    public choseRandomFrom(population: Array<Node | Edge>, givenRandom: Chance = this.random): Node | Edge | null {

        if (population == null || population.length == 0) {
            return null;
        }

        if (population.length == 1) { // this handling is for avoiding chance-js arg: "max-value must be greater than min"
            return population[0];
        }

        let randomIndex = givenRandom.integer({ min: 0, max: (population.length - 1) });

        return population[randomIndex];

    }



    /**
     * Chose a node from the given node array, except the 2nd given node array, by uniform random
     * 
     * @param population 
     * @param exceptNodeIdList 
     * @param givenRandom 
     */
    public choseRandomNodeFromAndExcept(population: Array<Node>, exceptNodeIdList: Array<number | string>, givenRandom: Chance = this.random): Node | null {
        return <Node>this.choseRandomFromAndExcept(population, exceptNodeIdList, givenRandom);
    }



    /**
     * Chose a edge from the given edge array, except the 2nd given edge array, by uniform random
     * 
     * @param population 
     * @param exceptEdgeIdList 
     * @param givenRandom 
     */
    public choseRandomEdgeFromAndExcept(population: Array<Edge>, exceptEdgeIdList: Array<number | string>, givenRandom: Chance = this.random): Edge | null {
        return <Edge>this.choseRandomFromAndExcept(population, exceptEdgeIdList, givenRandom);
    }



    /**
     * Chose a node or edge from the given node/edge array, except the 2nd given node/edge array, by uniform random
     * 
     * @param population 
     * @param exceptIdList 
     * @param givenRandom 
     */
    public choseRandomFromAndExcept(population: Array<Node | Edge>, exceptIdList: Array<number | string>, givenRandom: Chance = this.random): Node | Edge | null {

        let availablePopulation = this.excludeElementFromOriginal(population, exceptIdList);

        return this.choseRandomFrom(availablePopulation, givenRandom);

    }




    /**
     * Chose a node or edge from the given node/edge array, 
     * by the probability following a proportional relationship of property value.
     * 
     * @param population 
     * @param proportionalProp 
     * @param givenRandom 
     */
    public choseProbabilisticallyFrom(population: Array<Node | Edge>, proportionalProp: string, givenRandom: Chance = this.random): Node | Edge | null {

        if (population == null || population.length == 0) {
            return null;
        }

        // this total value will be a denominator of proportional value
        let totalProportionalValue = population.reduce((sum, element) => sum + element[proportionalProp], 0.0001); // 0.0001 for avoiding zero division, afterward.


        // setup a roulette table whose range is separated by proportional relationship of property value
        let rouletteTable: Array<any> = [];
        let currentProbabilityBoundary: number = 0;

        population.forEach(element => {

            // calc a proportional value and setup a range.
            let probabilityLength = element[proportionalProp] / totalProportionalValue
            let probabilityRange = { from: currentProbabilityBoundary, to: currentProbabilityBoundary + probabilityLength }

            rouletteTable.push(probabilityRange);

            currentProbabilityBoundary = probabilityRange.to;

        });

        rouletteTable[rouletteTable.length - 1]['to'] = 1; // Forcibly correct rounding error

        // throw a dice (setup a roulette value)
        let rouletteValue: number = givenRandom.floating({ min: 0, max: 1 });
        let chosenElement: Node | Edge = {};

        // specify the element which has the roulette range that the roulette value points
        for (let rouletteIndex = 0; rouletteIndex < rouletteTable.length; rouletteIndex++) {

            let range = rouletteTable[rouletteIndex];

            if (range.from <= rouletteValue && rouletteValue <= range.to) { // both from and to boundary include =, because rouletteValue might be just 0 or 1.
                // bingo!
                chosenElement = population[rouletteIndex];
                break;
            }

        }

        return chosenElement;


    }



    /**
     * Chose a node from the given node array, except the 2nd given node array
     * by the probability following a proportional relationship of property value.
     * 
     * @param population 
     * @param proportionalProp 
     * @param exceptIdList 
     * @param givenRandom 
     */
    public choseProbabilisticallyNodeFromAndExcept(population: Array<Node>, proportionalProp: string, exceptIdList: Array<number | string>, givenRandom: Chance = this.random): Node | null {

        let availablePopulation = this.excludeElementFromOriginal(population, exceptIdList);

        return <Node>this.choseProbabilisticallyFrom(availablePopulation, proportionalProp, givenRandom);

    }



    /**
     * Chose a edge from the given edge array, except the 2nd given edge array
     * by the probability following a proportional relationship of property value.
     * 
     * @param population 
     * @param proportionalProp 
     * @param exceptIdList 
     * @param givenRandom 
     */
    public choseProbabilisticallyEdgeFromAndExcept(population: Array<Edge>, proportionalProp: string, exceptIdList: Array<number | string>, givenRandom: Chance = this.random): Edge | null {

        let availablePopulation = this.excludeElementFromOriginal(population, exceptIdList);

        return <Edge>this.choseProbabilisticallyFrom(availablePopulation, proportionalProp, givenRandom);

    }



    /**
     * Chose a node or edge from the given node/edge array, except the 2nd given node/edge array
     * by the probability following a proportional relationship of property value.
     * 
     * @param population 
     * @param proportionalProp 
     * @param exceptIdList 
     * @param givenRandom 
     */
    public choseProbabilisticallyFromAndExcept(population: Array<Node | Edge>, proportionalProp: string, exceptIdList: Array<number | string>, givenRandom: Chance = this.random): Node | Edge | null {

        let availablePopulation = this.excludeElementFromOriginal(population, exceptIdList);

        return this.choseProbabilisticallyFrom(availablePopulation, proportionalProp, givenRandom);

    }



    /**
     * Remove the 2nd given elements from the 1st given elements, then return it.
     * 
     * @param original 
     * @param exceptIdList 
     */
    private excludeElementFromOriginal(original: Array<Node | Edge>, exceptIdList: Array<number | string>): Array<Node | Edge> {

        if (original == null || original.length == 0) {
            return null;
        }

        let exceptIdSet: Set<number | string> = new Set(exceptIdList);

        let availablePopulation = original.filter((element: Node | Edge) => {
            return !exceptIdSet.has(element.id)
        });

        return availablePopulation;

    }



}