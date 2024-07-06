import { DirectedGraph } from '@root/data-structures';
import { findEulerianPath } from './find-eulerian-path';

describe('findEulerianPath', () => {
  test('simple eulerian path problem', () => {
    const graph = new DirectedGraph([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
    ]);

    const eulerianPath = findEulerianPath(graph);
    const expectedResult = [0, 1, 2, 3, 0];

    expect(eulerianPath).toEqual(expectedResult);
  });

  test('handle eulerian path with some branches', () => {
    const graph = new DirectedGraph([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 2],
      [2, 4],
      [4, 5],
      [5, 6],
      [6, 5],
      [5, 4],
      [4, 7],
      [7, 8],
    ]);

    const eulerianPath = findEulerianPath(graph);
    const expectedResult = [0, 1, 2, 3, 2, 4, 5, 6, 5, 4, 7, 8];

    expect(eulerianPath).toEqual(expectedResult);
  });

  test('handle empty graph', () => {
    const graph = new DirectedGraph();

    const eulerianPath = findEulerianPath(graph);
    const expectedResult: number[] = [];

    expect(eulerianPath).toEqual(expectedResult);
  });

  test('handle graph with no eulerian path', () => {
    const graph = new DirectedGraph([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
      [6, 3], // Creates an imbalance in degrees
      [4, 7],
      [7, 8],
      [8, 7],
    ]);

    const eulerianPath = findEulerianPath(graph);
    const expectedResult: number[] = [];

    expect(eulerianPath).toEqual(expectedResult);
  });
});
