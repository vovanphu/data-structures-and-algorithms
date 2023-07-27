import { floydWarshall } from './floyd-warshall';

describe('Floyd-Warshall Algorithm', () => {
  test('Shortest paths for a simple graph', () => {
    const graph = [
      [0, 3, Infinity, 7],
      [8, 0, 2, Infinity],
      [5, Infinity, 0, 1],
      [2, Infinity, Infinity, 0],
    ];

    const expectedShortestPaths = [
      [0, 3, 5, 6],
      [5, 0, 2, 3],
      [3, 6, 0, 1],
      [2, 5, 7, 0],
    ];

    expect(floydWarshall(graph)).toEqual(expectedShortestPaths);
  });

  test('Graph with negative cycles', () => {
    const graph = [
      [0, 1, Infinity],
      [Infinity, 0, -4],
      [2, Infinity, 0],
    ];

    // The graph has a negative cycle, expect all distances to be -Infinity
    const expectedShortestPaths = [
      [-Infinity, -Infinity, -Infinity],
      [-Infinity, -Infinity, -Infinity],
      [-Infinity, -Infinity, -Infinity],
    ];
    expect(floydWarshall(graph)).toEqual(expectedShortestPaths);
  });

  test('Graph with no negative cycles', () => {
    const graph = [
      [0, 3, 6, 15],
      [Infinity, 0, -2, Infinity],
      [Infinity, Infinity, 0, 2],
      [1, 7, 3, 0],
    ];

    const expectedShortestPaths = [
      [0, 3, 1, 3],
      [1, 0, -2, 0],
      [3, 6, 0, 2],
      [1, 4, 2, 0],
    ];

    expect(floydWarshall(graph)).toEqual(expectedShortestPaths);
  });
});
