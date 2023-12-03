import { Graph } from './graph.class';
import { Recursive_BfsStrategy } from './recursive.bfs-strategy';

describe('Recursive_BfsStrategy', () => {
  describe('handle bfs', () => {
    const bfsStrategy = new Recursive_BfsStrategy();
    let output: number[] = [];
    const callback = jest.fn((vertex: number) => output.push(vertex));

    beforeEach(() => {
      output = [];
    });

    test('should handle empty graph', () => {
      const graph = new Graph();
      expect(() => bfsStrategy.execute(graph, 0, callback)).toThrow(
        'Out of graph bound',
      );
    });

    test('should handle 1 item graph', () => {
      const graph = new Graph([[0]]);
      const validResult = [0];
      bfsStrategy.execute(graph, 0, callback);
      expect(output).toEqual(validResult);
    });

    test('should handle bfs traverse order', () => {
      const graph = new Graph([
        [0, 1],
        [0, 2],
        [1, 3],
        [1, 4],
        [2, 5],
      ]);
      const validResult = [0, 1, 2, 3, 4, 5];
      bfsStrategy.execute(graph, 0, callback);
      expect(output).toEqual(validResult);
    });
  });
});
