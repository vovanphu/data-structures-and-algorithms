import { DirectedGraph } from '@root/data-structures';
import { EdmondsKarp_FordFulkersonStrategy } from './edmonds-karp.ford-fulkerson-strategy';

describe('EdmondsKarp_FordFulkersonStrategy', () => {
  const strategy = new EdmondsKarp_FordFulkersonStrategy();

  test('should return the right maximum network flow from a simple weighted directed graph', () => {
    const graph = new DirectedGraph([
      [0, 1, 10],
      [0, 2, 15],
      [1, 3, 10],
      [1, 4, 5],
      [2, 1, 15],
      [2, 3, 5],
      [3, 4, 10],
    ]);

    const result = strategy.execute(graph, 0, 4);
    const expectedResult = 15;

    expect(result).toBe(expectedResult);
  });

  test('should throw error if start and end input out of graph', () => {
    const graph = new DirectedGraph([[0, 1, 10]]);

    expect(() => strategy.execute(graph, -1, 0)).toThrow('Out of graph bound');
    expect(() => strategy.execute(graph, 0, 2)).toThrow('Out of graph bound');
    expect(() => strategy.execute(graph, 3, 0)).toThrow('Out of graph bound');
  });

  test('should return the right maximum network flow of a join graph', () => {
    const graph = new DirectedGraph([
      [0, 1, 2],
      [0, 2, 1],
      [1, 2, 3],
      [1, 4, 1],
      [2, 4, 2],
    ]);

    const result = strategy.execute(graph, 0, 4);
    const expectedResult = 3;

    expect(result).toBe(expectedResult);
  });

  test('should return the right maximum network flow of a more complex graph', () => {
    const graph = new DirectedGraph([
      [0, 1, 7],
      [0, 2, 2],
      [0, 3, 1],
      [1, 4, 2],
      [1, 5, 4],
      [2, 5, 5],
      [2, 6, 6],
      [3, 4, 4],
      [3, 8, 8],
      [4, 7, 7],
      [4, 8, 1],
      [5, 7, 3],
      [5, 9, 3],
      [5, 6, 8],
      [6, 9, 3],
      [7, 10, 1],
      [8, 10, 3],
      [9, 10, 4],
    ]);

    const result = strategy.execute(graph, 0, 10);
    const expectedResult = 7;

    expect(result).toBe(expectedResult);
  });

  test('should return 0 if there is no path from start to end', () => {
    const graph = new DirectedGraph([
      [0, 1, 10],
      [0, 2, 15],
      [1, 3, 10],
      [1, 4, 5],
      [2, 1, 15],
      [2, 3, 5],
      [3, 4, 10],
      [5, 0, 3],
    ]);

    const result = strategy.execute(graph, 0, 5);
    const expectedResult = 0;

    expect(result).toBe(expectedResult);
  });
});
