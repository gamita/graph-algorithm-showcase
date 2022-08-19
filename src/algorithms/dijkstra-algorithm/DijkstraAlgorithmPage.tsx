import { FC } from 'react';
import { DijkstraAlgorithm } from 'algorithms/dijkstra-algorithm/DijkstraAlgorithm';
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmDescription } from 'ui-components/AlgorithmDescription';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const DijkstraAlgorithmPage: FC = () => {

    const dijkstraAlgorithm = new DijkstraAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="Dijkstra's Algorithm" wikiUrl="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm" />
            <AlgorithmDescription>
                This demo visualizes a process of Dijkstra's Algorithm (Please click Step 1 "Graph" button, then click Step2 "Run" button).
                Dijkstra's algorithm step-wisely determines the shortest distances between the start node and other nodes.
                At first, the shortest distance of neighbor node of the start node is determined.
                After that, the shortest distance is continuously determined in order of near nodes from the start node, one by one.
                The range of distance determined nodes spreads, finally when the shortest distance between start node and goal nodes is determined, the process is finished.
                This demo shows that distance determining process.
                The number emerging below each blue node is the shortest distance between the start node and its node.
                For more detail, please check the above wiki link.
            </AlgorithmDescription>
            <AlgorithmButtonGroup
                showEvent={() => dijkstraAlgorithm.createGraph()}
                runEvent={() => dijkstraAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}