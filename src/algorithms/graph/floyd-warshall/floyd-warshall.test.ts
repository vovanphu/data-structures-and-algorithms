import { Graph } from '@root/data-structures';
import { floydWarshall } from './floyd-warshall';

describe('Floyd-Warshall Algorithm', () => {
  test('Shortest paths for a simple graph', () => {
    const graph = new Graph([
      [0, 1, 3],
      [0, 3, 7],
      [1, 0, 8],
      [1, 2, 2],
      [2, 0, 5],
      [2, 3, 1],
      [3, 0, 2],
    ]);

    const expectedShortestPaths = [
      [0, 3, 5, 6],
      [5, 0, 2, 3],
      [3, 6, 0, 1],
      [2, 5, 7, 0],
    ];

    const [result] = floydWarshall(graph);

    expect(result).toEqual(expectedShortestPaths);
  });

  test('Graph with negative cycles', () => {
    const graph = new Graph([
      [0, 1, 1],
      [1, 2, -4],
      [2, 0, 2],
    ]);

    // The graph has a negative cycle, expect all distances to be -Infinity
    const expectedShortestPaths = [
      [-Infinity, -Infinity, -Infinity],
      [-Infinity, -Infinity, -Infinity],
      [-Infinity, -Infinity, -Infinity],
    ];

    const [result] = floydWarshall(graph);

    expect(result).toEqual(expectedShortestPaths);
  });

  test('Graph with no negative cycles', () => {
    const graph = new Graph([
      [0, 1, 3],
      [0, 2, 6],
      [0, 3, 15],
      [1, 2, -2],
      [2, 3, 2],
      [3, 0, 1],
      [3, 1, 7],
      [3, 2, 3],
    ]);

    const expectedShortestPaths = [
      [0, 3, 1, 3],
      [1, 0, -2, 0],
      [3, 6, 0, 2],
      [1, 4, 2, 0],
    ];

    const [result] = floydWarshall(graph);

    expect(result).toEqual(expectedShortestPaths);
  });
});
