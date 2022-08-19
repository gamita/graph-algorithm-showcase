import { FC } from 'react';
import { BidirectionalDijkstraAlgorithm } from 'algorithms/bidirectional-dijkstra-algorithm/BidirectionalDijkstraAlgorithm'
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmDescription } from 'ui-components/AlgorithmDescription';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const BidirectionalDijkstraAlgorithmPage: FC = () => {

    const bidirectionalDijkstraAlgorithm = new BidirectionalDijkstraAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="Bidirectional Dijkstra's Algorithm" wikiUrl="https://en.wikipedia.org/wiki/Bidirectional_search" />
            <AlgorithmDescription>
                This demo visualizes a process of Bidirectional Dijkstra's Algorithm (Please click Step 1 "Graph" button, then click Step2 "Run" button).
                Ordinary Dijkstra's algorithm determines the shortest distances from neighbor nodes of the start node.
                Bidirectional Dijkstra's Algorithm simultaneously executes Dijkstra's algorithm process from both the start node and the goal node.
                By simultaneously executing from the start node and goal node, it usually makes the range of distance exploration narrow down.
                Eventually, we can find the shortest path earlier than ordinary Dijkstra's algorithm.
                This demo shows that distance determining process from both the stat node and the goal node.
                The blue/green number emerging below each node is the shortest distance between the start/goal node and its node.
                For more detail, please check the above wiki link.
            </AlgorithmDescription>
            <AlgorithmButtonGroup
                showEvent={() => bidirectionalDijkstraAlgorithm.createGraph()}
                runEvent={() => bidirectionalDijkstraAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}