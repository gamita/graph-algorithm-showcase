import { FC } from 'react';
import { LabelPropagationAlgorithm } from 'algorithms/label-propagation-algorithm/LabelPropagationAlgorithm'
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmDescription } from 'ui-components/AlgorithmDescription';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const LabelPropagationAlgorithmPage: FC = () => {

    const labelPropagationAlgorithm = new LabelPropagationAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="Label Propagation Algorithm" wikiUrl="https://en.wikipedia.org/wiki/Label_propagation_algorithm" />
            <AlgorithmDescription>
                This demo visualizes a process of Label Propagation Algorithm (Please click Step 1 "Graph" button, then click Step2 "+ 1 Iteration" button several times).
                Label Propagation Algorithm is one of Community Detection algorithms, this algorithm determines which community (cluster) each node belongs to.
                This demo shows that community determining process.
                In this demo, each color of nodes represents belonging community color.
                Before starting iterations, all nodes belong to all different communities (colors).
                As iterations progress (click Step2 button again and again), communities are gradually being unified upto the convergence.
                For more detail, please check the above wiki link.
            </AlgorithmDescription>
            <AlgorithmButtonGroup
                showEvent={() => labelPropagationAlgorithm.createGraph()}
                runButtonName="+ 1 Iteration"
                oneTimeRun={false}
                runEvent={() => labelPropagationAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}