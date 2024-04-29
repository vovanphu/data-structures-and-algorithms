import { DirectedGraph } from '@root/data-structures';
import { Kahn_TopSortStrategy } from './kahn.top-sort-strategy';

describe("Topological Sort (Kahn's algorithm)", () => {
  test('should return the correct topological order for a given graph', () => {
    const graph = new DirectedGraph([
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 4],
    ]);
    const validResults = [
      [0, 1, 2, 3, 4],
      [0, 2, 1, 3, 4],
    ];
    const result = new Kahn_TopSortStrategy().execute(graph);
    expect(result).toBeOneOf(validResults);
  });

  test('should handle an empty graph', () => {
    const graph = new DirectedGraph();
    const result = new Kahn_TopSortStrategy().execute(graph);
    expect(result).toEqual([]);
  });

  test('should handle a graph with a single vertex', () => {
    const graph = new DirectedGraph([[0]]);
    const result = new Kahn_TopSortStrategy().execute(graph);
    expect(result).toEqual([0]);
  });

  test('should handle a graph with circle', () => {
    const graph = new DirectedGraph([
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 1],
    ]);

    const result = new Kahn_TopSortStrategy().execute(graph);
    expect(result).toEqual([]);
  });
});
