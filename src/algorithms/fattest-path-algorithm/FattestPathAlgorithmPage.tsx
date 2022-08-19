import { FC } from 'react';
import { FattestPathAlgorithm } from 'algorithms/fattest-path-algorithm/FattestPathAlgorithm';
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmDescription } from 'ui-components/AlgorithmDescription';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const FattestPathAlgorithmPage: FC = () => {

    const fattestPathAlgorithm = new FattestPathAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="Fattest Path Algorithm" wikiUrl="https://en.wikipedia.org/wiki/Widest_path_problem" />
            <AlgorithmDescription>
                This demo visualizes a process of Fattest Path Algorithm (Please click Step 1 "Graph" button, then click Step2 "Run" button).
                This path finding algorithm is not for "Shortest" path, this is for "Fattest" path.
                To find the fattest path, that is to say, to find a path whose the narrowest edge is the fattest than any other paths in the graph.
                Therefore, this algorithm focuses on width of edges, not length of edges.
                One of motivations to find the fattest path is to find max capacity on the path to the goal node (e.g. logistics, transportation, transmission),
                even if that path is long path.
                The number emerging below each node is the max capacity on the way from the start node to its node.
                For more detail, please check the above wiki link.
            </AlgorithmDescription>
            <AlgorithmButtonGroup
                showEvent={() => fattestPathAlgorithm.createGraph()}
                runEvent={() => fattestPathAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}