import "../css/application.css";
import BreadthFirstSearchAlgorithm from './algorithms/BreadthFirstSearchAlgorithm'
import DijkstraAlgorithm from './algorithms/DijkstraAlgorithm'
import BidirectionalDijkstraAlgorithm from './algorithms/BidirectionalDijkstraAlgorithm'
import AStarAlgorithm from './algorithms/AStarAlgorithm'
import BellmanFordAlgorithm from './algorithms/BellmanFordAlgorithm'
import AntColonyOptimizationAlgorithm from './algorithms/AntColonyOptimizationAlgorithm'
import PrimAlgorithm from './algorithms/PrimAlgorithm'
import FattestPathAlgorithm from './algorithms/FattestPathAlgorithm'
import TopologicalSortAlgorithm from './algorithms/TopologicalSortAlgorithm'


export var breadthFirstSearch = new BreadthFirstSearchAlgorithm();


export var dijkstra = new DijkstraAlgorithm();


export var bidirectionalDijkstra = new BidirectionalDijkstraAlgorithm();


export var astar = new AStarAlgorithm();


export var bellmanFord = new BellmanFordAlgorithm();


export var antColony = new AntColonyOptimizationAlgorithm();


export var prim = new PrimAlgorithm();


export var fattestPath = new FattestPathAlgorithm();


export var topologicalSort = new TopologicalSortAlgorithm();