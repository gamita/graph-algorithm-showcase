import { FC } from 'react';
import { AStartAlgorithm } from 'algorithms/astar-algorithm/AStarAlgorithm'
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmDescription } from 'ui-components/AlgorithmDescription';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const AStartAlgorithmPage: FC = () => {

    const astartAlgorithm = new AStartAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="A* Algorithm" wikiUrl="https://en.wikipedia.org/wiki/A*_search_algorithm" />
            <AlgorithmDescription>
                This demo visualizes a process of A* (A-start) Algorithm (Please click Step 1 "Graph" button, then click Step2 "Run" button).
                A* algorithm step-wisely determines the shortest distances between the start node and other nodes as well as Dijkstra's Algorithm.
                Dijkstra's Algorithm determines the shortest distance from neighbors of the start node, spreading surround the start node.
                On the other hand, A* algorithm determines the shortest distance, spreading toward the goal node.
                So, the range of distance explore can possibly capture the goal node earlier than Dijkstra's Algorithm.
                This demo shows that distance determining process.
                The number emerging below each blue node is the shortest distance between the start node and its node.
                You can see that blue nodes spread toward the goal node.
                For more detail, please check the above wiki link.
            </AlgorithmDescription>
            <AlgorithmButtonGroup
                showEvent={() => astartAlgorithm.createGraph()}
                runEvent={() => astartAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}