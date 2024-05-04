import { UndirectedGraph } from '@root/data-structures';
import { findBridges } from './find-bridges';

describe('findBridges', () => {
  test('Find bridges in a simple graph', () => {
    // Create a simple graph represented as an adjacency list
    const graph = new UndirectedGraph([
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 3],
      [3, 4],
    ]);

    const bridges = findBridges(graph);

    // There should be two bridges in this graph: [2, 3] and [3, 4]
    expect(bridges).toEqual(
      expect.arrayContaining([
        [2, 3],
        [3, 4],
      ]),
    );
    expect(bridges.length).toBe(2);
  });

  test('Find bridges in a graph with no bridges', () => {
    // Create a graph with no bridges (a cycle)
    const graph = new UndirectedGraph([
      [0, 1],
      [0, 2],
      [1, 2],
    ]);

    const bridges = findBridges(graph);

    // There should be no bridges in this graph
    expect(bridges).toHaveLength(0);
  });

  test('Find bridges in a graph with a single bridge', () => {
    // Create a graph with a single bridge
    const graph = new UndirectedGraph([
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 3],
      [3, 4],
      [3, 5],
      [4, 5],
    ]);

    const bridges = findBridges(graph);

    // There should be one bridge in this graph: [2, 3]
    expect(bridges).toEqual(expect.arrayContaining([[2, 3]]));
    expect(bridges.length).toBe(1);
  });
});
