import { findBridges } from './find-bridges';

describe('findBridges', () => {
  test('Find bridges in a simple graph', () => {
    // Create a simple graph represented as an adjacency list
    const graph = new Map<number, number[]>();
    graph.set(0, [1, 2]);
    graph.set(1, [0, 2]);
    graph.set(2, [0, 1, 3]);
    graph.set(3, [2, 4]);
    graph.set(4, [3]);

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
    const graph = new Map<number, number[]>();
    graph.set(0, [1, 2]);
    graph.set(1, [0, 2]);
    graph.set(2, [0, 1]);

    const bridges = findBridges(graph);

    // There should be no bridges in this graph
    expect(bridges).toHaveLength(0);
  });

  test('Find bridges in a graph with a single bridge', () => {
    // Create a graph with a single bridge
    const graph = new Map<number, number[]>();
    graph.set(0, [1, 2]);
    graph.set(1, [0, 2]);
    graph.set(2, [0, 1, 3]);
    graph.set(3, [2]);
    graph.set(4, [3]);

    const bridges = findBridges(graph);

    // There should be one bridge in this graph: [2, 3]
    expect(bridges).toEqual(expect.arrayContaining([[2, 3]]));
    expect(bridges.length).toBe(1);
  });
});
