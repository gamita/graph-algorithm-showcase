import { FC } from 'react';
import { AntColonyOptimizationAlgorithm } from 'algorithms/ant-colony-optimization-algorithm/AntColonyOptimizationAlgorithm';
import { AlgorithmPageTitle } from 'ui-components/AlgorithmPageTitle';
import { AlgorithmDescription } from 'ui-components/AlgorithmDescription';
import { AlgorithmButtonGroup } from 'ui-components/AlgorithmButtonGroup';
import { GraphBoard } from 'ui-components/GraphBoard';

export const AntColonyOptimizationAlgorithmPage: FC = () => {

    const antColonyOptimizationAlgorithm = new AntColonyOptimizationAlgorithm();

    return (
        <>
            <AlgorithmPageTitle title="Ant Colony Optimization" wikiUrl="https://en.wikipedia.org/wiki/Ant_colony_optimization_algorithms" />
            <AlgorithmDescription>
                This demo visualizes a process of Ant Colony Optimization (Please click Step 1 "Graph" button, then click Step2 "Run" button).
                Ant Colony Optimization is based on ant behavior in nature world.
                When ants find their foods, they brings it back to their nest as emitting their pheromone on the path.
                The pheromone volatilizes with time.
                Hence, if the way to food (our goal node) is longer distance, the pheromone volatilizes much more,
                the rest of pheromone on the path reduces.
                Ants tend to prefer stronger pheromone path, it means ants collect around shorter path.
                If some of those ants finds new shorter path than known paths, a stronger pheromone path is gotten.
                The rest is just a repetition.
                This demo simulates ant's pheromone amount (yellow background) on the path, and the shortest path (red line) that ants have found so far.
                The number emerging below the goal node is a distance of the shortest path that ants have found as of the time.
                For more detail, please check the above wiki link.
            </AlgorithmDescription>
            <AlgorithmButtonGroup
                showEvent={() => antColonyOptimizationAlgorithm.createGraph()}
                runEvent={() => antColonyOptimizationAlgorithm.run()} />
            <GraphBoard id="graph" />
        </>);
}