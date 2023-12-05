import { Graph } from '@root/data-structures';
import { dagShortest } from './dag-shortest';

describe('DAG Shortest Path', () => {
  test('should calculate the shortest paths in a DAG', () => {
    const graph = new Graph([
      [0, 1, 3],
      [0, 2, 5],
      [1, 3, 2],
      [2, 3, 4],
      [3, 4, 1],
    ]);
    const startVertex = 0;
    const result = dagShortest(graph, startVertex);
    expect(result).toEqual([0, 3, 5, 5, 6]);
  });

  test('should handle an empty graph', () => {
    const graph = new Graph();
    const startVertex = 0;
    expect(() => dagShortest(graph, startVertex)).toThrow(
      'Invalid input parameters',
    );
  });

  test('should handle unreachable vertices', () => {
    const graph = new Graph([
      [0, 1, 3],
      [0, 2, 5],
      [1, 3, 2],
      [2, 3, 4],
      [3, 4, 1],
      [5],
    ]);
    const startVertex = 5; // Unreachable vertex
    const result = dagShortest(graph, startVertex);
    expect(result).toEqual([
      Infinity,
      Infinity,
      Infinity,
      Infinity,
      Infinity,
      0,
    ]);
  });
});
