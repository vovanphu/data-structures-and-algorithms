import { topSortRecursive, topSortKahn } from './top-sort';

describe('Topological Sort (Recursive)', () => {
  test('should return the correct topological order for a given graph', () => {
    const graph = new Map<number, number[]>();
    graph.set(0, [1, 2]);
    graph.set(1, [3]);
    graph.set(2, [3]);
    graph.set(3, [4]);
    graph.set(4, []);
    const validResults = [
      [0, 1, 2, 3, 4],
      [0, 2, 1, 3, 4],
    ];
    const result = topSortRecursive(graph);
    expect(result).toBeOneOf(validResults);
  });

  test('should handle an empty graph', () => {
    const graph = new Map<number, number[]>();
    const result = topSortRecursive(graph);
    expect(result).toEqual([]);
  });

  test('should handle a graph with a single vertex', () => {
    const graph = new Map<number, number[]>();
    graph.set(0, []);
    const result = topSortRecursive(graph);
    expect(result).toEqual([0]);
  });
});

describe("Topological Sort (Kahn's algorithm)", () => {
  test('should return the correct topological order for a given graph', () => {
    const graph = new Map<number, number[]>();
    graph.set(0, [1, 2]);
    graph.set(1, [3]);
    graph.set(2, [3]);
    graph.set(3, [4]);
    graph.set(4, []);
    const validResults = [
      [0, 1, 2, 3, 4],
      [0, 2, 1, 3, 4],
    ];
    const result = topSortKahn(graph);
    expect(result).toBeOneOf(validResults);
  });

  test('should handle an empty graph', () => {
    const graph = new Map<number, number[]>();
    const result = topSortKahn(graph);
    expect(result).toEqual([]);
  });

  test('should handle a graph with a single vertex', () => {
    const graph = new Map<number, number[]>();
    graph.set(0, []);
    const result = topSortKahn(graph);
    expect(result).toEqual([0]);
  });
});
