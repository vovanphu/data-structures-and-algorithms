import { WeightedGraph } from './src/data-structures/graph/weighted-graph.class.deprecated';
import { dijkstra } from './dijkstra';

describe('Dijkstra Algorithm', () => {
  test('Shortest path from start node to other nodes', () => {
    const graph = new WeightedGraph(6);
    graph.addEdge(0, 1, 5);
    graph.addEdge(0, 2, 1);
    graph.addEdge(1, 2, 2);
    graph.addEdge(1, 3, 3);
    graph.addEdge(1, 4, 20);
    graph.addEdge(2, 1, 3);
    graph.addEdge(2, 4, 12);
    graph.addEdge(3, 2, 3);
    graph.addEdge(3, 4, 2);
    graph.addEdge(3, 5, 6);
    graph.addEdge(4, 5, 1);

    // Calculate shortest path from node 0
    const shortestPaths = dijkstra(graph, 0);

    // Verify the shortest paths from node 0 to other nodes
    expect(shortestPaths).toEqual([0, 4, 1, 7, 9, 10]);
  });

  test('Start index out of bounds', () => {
    const graph = new WeightedGraph(5);

    // Try to calculate shortest path with start index out of bounds
    const shortestPaths = dijkstra(graph, 10);

    // Expect all distances to be Infinity
    expect(shortestPaths).toEqual([
      Infinity,
      Infinity,
      Infinity,
      Infinity,
      Infinity,
    ]);
  });
});
