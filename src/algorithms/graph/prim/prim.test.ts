import { UndirectedGraph } from '@root/data-structures';
import { prim } from './prim';

describe('prim', () => {
  test('should return the correct MST for a simple graph', () => {
    const graph = new UndirectedGraph([
      [0, 1, 1],
      [0, 2, 2],
      [1, 2, 1],
      [1, 3, 3],
      [2, 3, 2],
    ]);

    const result = prim(graph);
    const expectedResult = [
      [0, 1, 1],
      [1, 2, 1],
      [2, 3, 2],
    ];

    expect(result).toEqual(expectedResult);
  });

  test('should return an empty array for an empty graph', () => {
    const graph = new UndirectedGraph([]);

    const mst = prim(graph);

    expect(mst).toEqual([]);
  });

  test('should return an empty array for a disconnected graph', () => {
    const graph = new UndirectedGraph([
      [0, 1, 1],
      [2, 3, 1],
    ]);

    const mst = prim(graph);

    expect(mst).toEqual([]);
  });

  test('should return the correct MST for a more complex graph', () => {
    const graph = new UndirectedGraph([
      [0, 1, 10],
      [0, 2, 6],
      [0, 3, 5],
      [1, 3, 15],
      [2, 3, 4],
    ]);

    const result = prim(graph);

    expect(result).toEqual(
      expect.arrayContaining([
        [0, 3, 5],
        [3, 2, 4],
        [0, 1, 10],
      ]),
    );

    expect(result.length).toBe(graph.size() - 1);
  });

  test('should return the correct MST for a graph with equal edge weights', () => {
    const graph = new UndirectedGraph([
      [0, 1, 1],
      [0, 2, 1],
      [1, 2, 1],
      [1, 3, 1],
      [2, 3, 1],
    ]);

    const mst = prim(graph);

    expect(mst).toEqual(
      expect.arrayContaining([
        [0, 1, 1],
        [0, 2, 1],
        [1, 3, 1],
      ]),
    );
    expect(mst.length).toBe(graph.size() - 1);
  });
});
