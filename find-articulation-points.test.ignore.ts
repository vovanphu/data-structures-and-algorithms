import { findArticulationPoints } from './find-articulation-points';

describe('findArticulationPoints', () => {
  test('Find articulation points in a simple graph', () => {
    // Graph:
    // 0---1---2
    //     |   |
    //     3---4

    const graph = new Map<number, number[]>();
    graph.set(0, [1]);
    graph.set(1, [0, 2, 3]);
    graph.set(2, [1, 4]);
    graph.set(3, [1, 4]);
    graph.set(4, [2, 3]);

    const articulationPoints = findArticulationPoints(graph);
    expect(articulationPoints).toEqual([false, true, false, false, false]);
  });

  test('Find articulation points in a graph with more vertexs', () => {
    // Graph:
    //             6
    //           /   \
    // 0---1   5       7
    //   \ | /   \   /
    //     2---3   8
    //         |
    //         4

    const graph = new Map<number, number[]>();
    graph.set(0, [1, 2]);
    graph.set(1, [0, 2]);
    graph.set(2, [0, 1, 3, 5]);
    graph.set(3, [2, 4]);
    graph.set(4, [3]);
    graph.set(5, [2, 6, 8]);
    graph.set(6, [5, 7]);
    graph.set(7, [6, 8]);
    graph.set(8, [5, 7]);

    const articulationPoints = findArticulationPoints(graph);
    expect(articulationPoints).toEqual([
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      false,
    ]);
  });

  test('Find articulation points in a graph with multiple articulation points', () => {
    // Graph:
    // 0---1---2---3
    //         |   |
    //         4---5

    const graph = new Map<number, number[]>();
    graph.set(0, [1]);
    graph.set(1, [0, 2]);
    graph.set(2, [1, 3, 4]);
    graph.set(3, [2, 5]);
    graph.set(4, [2, 5]);
    graph.set(5, [3, 4]);

    const articulationPoints = findArticulationPoints(graph);
    expect(articulationPoints).toEqual([
      false,
      true,
      true,
      false,
      false,
      false,
    ]);
  });

  test('Find articulation points in a graph with no articulation points', () => {
    // Graph:
    // 0---1
    //   \ |
    //     2

    const graph = new Map<number, number[]>();
    graph.set(0, [1, 2]);
    graph.set(1, [0, 2]);
    graph.set(2, [0, 1]);

    const articulationPoints = findArticulationPoints(graph);
    expect(articulationPoints).toEqual([false, false, false]);
  });

  test('Find articulatin points in a graph has no bridges', () => {
    // Graph:
    // 0   3
    // |\ /|
    // | 2 |
    // |/ \|
    // 1   4

    const graph = new Map<number, number[]>();
    graph.set(0, [1, 2]);
    graph.set(1, [0, 2]);
    graph.set(2, [0, 1, 3, 4]);
    graph.set(3, [2, 4]);
    graph.set(4, [2, 3]);

    const articulationPoints = findArticulationPoints(graph);
    expect(articulationPoints).toEqual([false, false, true, false, false]);
  });
});
