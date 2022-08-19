import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import App from './App';
import { BreadthFirstSearchAlgorithmPage } from 'algorithms/breadth-first-search-algorithm/BreadthFirstSearchAlgorithmPage';
import { DijkstraAlgorithmPage } from 'algorithms/dijkstra-algorithm/DijkstraAlgorithmPage';
import { BidirectionalDijkstraAlgorithmPage } from 'algorithms/bidirectional-dijkstra-algorithm/BidirectionalDijkstraAlgorithmPage';
import { AStartAlgorithmPage } from 'algorithms/astar-algorithm/AStarAlgorithmPage';
import { BellmanFordAlgorithmPage } from 'algorithms/bellman-ford-algorithm/BellmanFordAlgorithmPage';
import { AntColonyOptimizationAlgorithmPage } from 'algorithms/ant-colony-optimization-algorithm/AntColonyOptimizationAlgorithmPage';
import { FattestPathAlgorithmPage } from 'algorithms/fattest-path-algorithm/FattestPathAlgorithmPage';
import { PrimAlgorithmPage } from 'algorithms/prim-algorithm/PrimAlgorithmPage';
import { LabelPropagationAlgorithmPage } from 'algorithms/label-propagation-algorithm/LabelPropagationAlgorithmPage';
import { DegreeCentralityAlgorithmPage } from 'algorithms/degree-centrality-algorithm/DegreeCentralityAlgorithmPage';
import { PageRankAlgorithmPage } from 'algorithms/pagerank-algorithm/PageRankAlgorithmPage';
import { TopologicalSortAlgorithmPage } from 'algorithms/topological-sort-algorithm/TopologicalSortAlgorithmPage';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/breadth-first-search-algorithm" element={<BreadthFirstSearchAlgorithmPage />} />
        <Route path="/dijkstra-algorithm" element={<DijkstraAlgorithmPage />} />
        <Route path="/bidirectional-dijkstra-algorithm" element={<BidirectionalDijkstraAlgorithmPage />} />
        <Route path="/astar-algorithm" element={<AStartAlgorithmPage />} />
        <Route path="/bellman-ford-algorithm" element={<BellmanFordAlgorithmPage />} />
        <Route path="/ant-colony-optimization-algorithm" element={<AntColonyOptimizationAlgorithmPage />} />
        <Route path="/fattest-path-algorithm" element={<FattestPathAlgorithmPage />} />
        <Route path="/label-propagation-algorithm" element={<LabelPropagationAlgorithmPage />} />
        <Route path="/prim-algorithm" element={<PrimAlgorithmPage />} />
        <Route path="/degree-centrality-algorithm" element={<DegreeCentralityAlgorithmPage />} />
        <Route path="/pagerank-algorithm" element={<PageRankAlgorithmPage />} />
        <Route path="/topological-sort-algorithm" element={<TopologicalSortAlgorithmPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
