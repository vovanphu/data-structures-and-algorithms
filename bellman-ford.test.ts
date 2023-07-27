import { bellmanFord } from './bellman-ford';
import { WeightedGraph } from './weighted-graph.class';

describe('Bellman-Ford Algorithm', () => {
  test('Shortest path from start node to other nodes', () => {
    const graph = new WeightedGraph(5);
    graph.addEdge(0, 1, 2);
    graph.addEdge(0, 2, 4);
    graph.addEdge(1, 2, 1);
    graph.addEdge(1, 3, 7);
    graph.addEdge(2, 4, 3);
    graph.addEdge(3, 4, 1);

    // Calculate shortest paths from node 0
    const shortestPaths = bellmanFord(graph, 0);

    // Verify the shortest paths from node 0 to other nodes
    expect(shortestPaths).toEqual([0, 2, 3, 9, 6]);
  });

  test('Graph with negative cycle', () => {
    const graph = new WeightedGraph(4);
    graph.addEdge(0, 1, 2);
    graph.addEdge(1, 2, 3);
    graph.addEdge(2, 3, -7);
    graph.addEdge(3, 0, 1);

    // Calculate shortest paths from node 0
    const shortestPaths = bellmanFord(graph, 0);

    // Expect -Infinity for distances affected by negative cycle
    expect(shortestPaths).toEqual([-Infinity, -Infinity, -Infinity, -Infinity]);
  });

  test('Start index out of bounds', () => {
    const graph = new WeightedGraph(5);

    // Try to calculate shortest path with start index out of bounds
    const shortestPaths = bellmanFord(graph, 10);

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
