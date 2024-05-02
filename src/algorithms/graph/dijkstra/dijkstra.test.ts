import { Graph } from '@root/data-structures';
import { dijkstra } from './dijkstra';

describe('Dijkstra Algorithm', () => {
  test('Shortest path from start node to other nodes', () => {
    const graph = new Graph();
    graph.set(0, 1, 5);
    graph.set(0, 2, 1);
    graph.set(1, 2, 2);
    graph.set(1, 3, 3);
    graph.set(1, 4, 20);
    graph.set(2, 1, 3);
    graph.set(2, 4, 12);
    graph.set(3, 2, 3);
    graph.set(3, 4, 2);
    graph.set(3, 5, 6);
    graph.set(4, 5, 1);

    // Calculate shortest path from node 0
    const [_, prev] = dijkstra(graph, 0);

    // Verify the shortest paths from node 0 to other nodes
    expect(prev).toEqual([undefined, 2, 0, 1, 3, 4]);
  });

  test('Start index out of bounds', () => {
    const graph = new Graph();
    const [_, prev] = dijkstra(graph, 10);

    expect(prev).toEqual([]);
  });
});
