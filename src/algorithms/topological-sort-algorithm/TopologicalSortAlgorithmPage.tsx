import { FC } from 'react';
import { TopologicalSortAlgorithm } from 'algorithms/topological-sort-algorithm/TopologicalSortAlgorithm';
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmDescription } from 'ui-components/AlgorithmDescription';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const TopologicalSortAlgorithmPage: FC = () => {

    const topologicalSortAlgorithm = new TopologicalSortAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="Topological Sort Algorithm" wikiUrl="https://en.wikipedia.org/wiki/Topological_sorting" />
            <AlgorithmDescription>
                This demo visualizes a process of Topological Sort Algorithm (Please click Step 1 "Graph" button, then click Step2 "Run" button).
                The following nodes and edges in the graph mean tasks (nodes) and its dependencies (edge).
                For instance, (A) -&gt; (B) -&gt; (C) &lt;- (D) means that Task-B, D must be done in advance to execute Task-C, Task-A must be done in advance to execute Task-B.
                In short, there are dependencies (edges) among Task A, B, C, D (Node A, B, C, D).
                In such cases, Topological Sort gives the task (node) order, satisfying the dependency relations.
                By using Topological Sort, we can find from which task node to start at first and which task node is its next.
                Topological Sort can give the node order if only if a given graph is DAG (Directed Acyclic Graph).
                Conversely, we can find whether a given graph is DAG or not, by applying Topological Sort to a graph.
                This demo shows a task-order allocation process for the following graph step by step.
                For more detail, please check the above wiki link.
            </AlgorithmDescription>
            <AlgorithmButtonGroup
                showEvent={() => topologicalSortAlgorithm.createGraph()}
                runEvent={() => topologicalSortAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}