import { Graph } from '@root/data-structures';
import { dagShortestPath } from './dag-shortest-path';

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
    const [_, result] = dagShortestPath(graph, startVertex);
    expect(result).toEqual([undefined, 0, 0, 1, 3]);
  });

  test('should handle an empty graph', () => {
    const graph = new Graph();
    const startVertex = 0;
    const [_, result] = dagShortestPath(graph, startVertex);
    expect(result).toEqual([]);
  });

  test('should handle out of graph bound', () => {
    const graph = new Graph([
      [0, 1, 3],
      [0, 2, 5],
      [1, 3, 2],
      [2, 3, 4],
      [3, 4, 1],
      [5],
    ]);
    const expectedResult = Array.from({ length: 6 });
    expect(dagShortestPath(graph, -1)[1]).toEqual(expectedResult);
    expect(dagShortestPath(graph, 6)[1]).toEqual(expectedResult);
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
    const expectedResult = Array.from({ length: 6 });
    const [_, result] = dagShortestPath(graph, startVertex);
    expect(result).toEqual(expectedResult);
  });
});
