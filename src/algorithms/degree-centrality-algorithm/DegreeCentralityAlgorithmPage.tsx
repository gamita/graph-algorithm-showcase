import { FC } from 'react';
import { DegreeCentralityAlgorithm } from 'algorithms/degree-centrality-algorithm/DegreeCentralityAlgorithm'
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const DegreeCentralityAlgorithmPage: FC = () => {

    const degreeCentralityAlgorithm = new DegreeCentralityAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="Degree Centrality Algorithm" wikiUrl="https://en.wikipedia.org/wiki/Centrality#Degree_centrality" />
            <AlgorithmButtonGroup
                showEvent={() => degreeCentralityAlgorithm.createGraph()}
                runEvent={() => degreeCentralityAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}