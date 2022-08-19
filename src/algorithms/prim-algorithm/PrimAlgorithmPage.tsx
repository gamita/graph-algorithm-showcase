import { FC } from 'react';
import { PrimAlgorithm } from 'algorithms/prim-algorithm/PrimAlgorithm';
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmDescription } from 'ui-components/AlgorithmDescription';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const PrimAlgorithmPage: FC = () => {

    const primAlgorithm = new PrimAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="Minimum Spanning Tree: Prim Algorithm" wikiUrl="https://en.wikipedia.org/wiki/Prim%27s_algorithm" />
            <AlgorithmDescription>
                This demo visualizes a process of Prim Algorithm (Please click Step 1 "Graph" button, then click Step2 "Run" button).
                Prim Algorithm finds a minimum spanning tree (MST) from given graph.
                Minimum spanning tree is a tree which connects among all nodes with minimum sum of edge weight.
                This demo shows edge choice process of minimum spanning tree step by step from the following graph.
                Finally, the set of orange edges is a minimum spanning tree of the graph, which means that all nodes are connected by orange edges with minimum total length.
                For more detail, please check the above wiki link.
            </AlgorithmDescription>
            <AlgorithmButtonGroup
                showEvent={() => primAlgorithm.createGraph()}
                runEvent={() => primAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}