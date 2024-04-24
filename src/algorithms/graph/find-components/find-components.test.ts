import { DirectedGraph, UndirectedGraph } from '@root/data-structures';
import { findComponents } from '.';

describe('findComponents', () => {
  describe('on directed graph', () => {
    test('handle no group or empty graph', () => {
      const graph = new DirectedGraph();
      const result = findComponents(graph);
      expect(result).toEqual([]);
    });

    test('handle one group of components', () => {
      const graph = new DirectedGraph([
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [3, 4],
      ]);
      const validResult = [[0, 1, 2, 3, 4]];
      const result = findComponents(graph);
      validResult.forEach((group, i) => {
        expect(result[i]).toEqual(expect.arrayContaining(group));
      });
    });

    test('handle more than one group', () => {
      const graph = new DirectedGraph([
        [0, 1],
        [0, 2],
        [3, 4],
      ]);
      const validResult = [
        [0, 1, 2],
        [3, 4],
      ];
      const result = findComponents(graph);
      validResult.forEach((group, i) => {
        expect(result[i]).toEqual(expect.arrayContaining(group));
      });
    });

    test('handle directed separate group', () => {
      const graph = new DirectedGraph([
        [0, 1],
        [0, 2],
        [3, 2],
        [3, 4],
      ]);
      const validResult = [
        [0, 1, 2],
        [3, 2, 4],
      ];
      const result = findComponents(graph);
      validResult.forEach((group, i) => {
        expect(result[i]).toEqual(expect.arrayContaining(group));
      });
    });
  });

  describe('on undirected graph', () => {
    test('handle no group or empty graph', () => {
      const graph = new UndirectedGraph();
      const result = findComponents(graph);
      expect(result).toEqual([]);
    });

    test('handle one group of components', () => {
      const graph = new UndirectedGraph([
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [3, 4],
      ]);
      const validResult = [[0, 1, 2, 3, 4]];
      const result = findComponents(graph);
      validResult.forEach((group, i) => {
        expect(result[i]).toEqual(expect.arrayContaining(group));
      });
    });

    test('handle more than one group', () => {
      const graph = new UndirectedGraph([[0, 1], [0, 2], [3, 4], [3, 5], [6]]);
      const validResult = [[0, 1, 2], [3, 4, 5], [6]];
      const result = findComponents(graph);
      validResult.forEach((group, i) => {
        expect(result[i]).toEqual(expect.arrayContaining(group));
      });
    });
  });
});
