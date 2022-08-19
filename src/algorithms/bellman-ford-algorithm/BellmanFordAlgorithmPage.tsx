import { FC } from 'react';
import { BellmanFordAlgorithm } from 'algorithms/bellman-ford-algorithm/BellmanFordAlgorithm';
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmDescription } from 'ui-components/AlgorithmDescription';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const BellmanFordAlgorithmPage: FC = () => {

    const bellmanFordAlgorithm = new BellmanFordAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="Bellman-Ford Algorithm" wikiUrl="https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm" />
            <AlgorithmDescription>
                This demo visualizes a process of Bellman-Ford Algorithm (Please click Step 1 "Graph" button, then click Step2 "Run" button).
                Dijkstra's Algorithm can be applied to only graphs including non-negative length (weight) edges,
                while Bellman-Ford Algorithm can be applied to graphs even including negative length (weight) edges.
                This demo use the following directed graph has length - 100 edges (dot-line), and does not have cycles with negative length.
                The number emerging below each node is the updated shortest distance between the start node and its node.
                For more detail, please check the above wiki link.
            </AlgorithmDescription>
            <AlgorithmButtonGroup
                showEvent={() => bellmanFordAlgorithm.createGraph()}
                runEvent={() => bellmanFordAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}