import { FC } from 'react';
import { PageRankAlgorithm } from 'algorithms/pagerank-algorithm/PageRankAlgorithm'
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const PageRankAlgorithmPage: FC = () => {

    const pageRankAlgorithm = new PageRankAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="PageRank Algorithm" wikiUrl="https://en.wikipedia.org/wiki/Centrality#PageRank_centrality" />
            <AlgorithmButtonGroup
                showEvent={() => pageRankAlgorithm.createGraph()}
                runButtonName="+ 1 Iteration"
                oneTimeRun={false}
                runEvent={() => pageRankAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}