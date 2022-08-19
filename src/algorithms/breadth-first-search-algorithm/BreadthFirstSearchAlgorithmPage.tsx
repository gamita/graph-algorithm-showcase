import { FC } from 'react';
import { BreadthFirstSearchAlgorithm } from 'algorithms/breadth-first-search-algorithm/BreadthFirstSearchAlgorithm'
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmDescription } from 'ui-components/AlgorithmDescription';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const BreadthFirstSearchAlgorithmPage: FC = () => {

    const breadthFirstSearchAlgorithm = new BreadthFirstSearchAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="Breadth First Search Algorithm" wikiUrl="https://en.wikipedia.org/wiki/Breadth-first_search" />
            <AlgorithmDescription>
                This demo visualizes a process of Breadth First Search Algorithm (Please click Step 1 "Graph" button, then click Step2 "Run" button).
                Breadth First Search Algorithm is a algorithm which efficiently explores all nodes in graph.
                But, only for graph whose all edges are the same length, Breadth First Search Algorithm can work as shortest path finding algorithm.
                In that case, the shortest (distance) path means the shortest hop path.
                This demo uses the following ladder graph whose all edges is the same length.
                The number emerging below each blue node is the shortest distance between the start node and its node.
                For more detail, please check the above wiki link.
            </AlgorithmDescription>
            <AlgorithmButtonGroup
                showEvent={() => breadthFirstSearchAlgorithm.createGraph()}
                runEvent={() => breadthFirstSearchAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}