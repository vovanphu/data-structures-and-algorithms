import { bellmanFord } from './bellman-ford';
import { Graph } from '@root/data-structures';

describe('Bellman-Ford Algorithm', () => {
  test('Shortest path from start node to other nodes', () => {
    const graph = new Graph();
    graph.set(0, 1, 2);
    graph.set(0, 2, 4);
    graph.set(1, 2, 1);
    graph.set(1, 3, 7);
    graph.set(2, 4, 3);
    graph.set(3, 4, 1);

    // Calculate shortest paths from node 0
    const [shortestPaths] = bellmanFord(graph, 0);

    // Verify the shortest paths from node 0 to other nodes
    expect(shortestPaths).toEqual([0, 2, 3, 9, 6]);
  });

  test('Graph with negative cycle', () => {
    const graph = new Graph();
    graph.set(0, 1, 2);
    graph.set(1, 2, 3);
    graph.set(2, 3, -7);
    graph.set(3, 0, 1);

    // Calculate shortest paths from node 0
    const [shortestPaths] = bellmanFord(graph, 0);

    // Expect -Infinity for distances affected by negative cycle
    expect(shortestPaths).toEqual([-Infinity, -Infinity, -Infinity, -Infinity]);
  });

  test('Start index out of bounds', () => {
    const graph = new Graph();
    graph.set(4);

    const expectedPrev = Array.from({ length: 5 });
    const [_, prev] = bellmanFord(graph, 10);

    // Expect all distances to be Infinity
    expect(prev).toEqual(expectedPrev);
  });
});
