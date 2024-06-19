import { UndirectedGraph } from '@root/data-structures';
import { findArticulationPoints } from './find-articulation-points';

describe('findArticulationPoints', () => {
  test('Find articulation points in a simple graph', () => {
    // Graph:
    // 0---1---2
    //     |   |
    //     3---4

    const graph = new UndirectedGraph([
      [0, 1],
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 4],
    ]);

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

    const graph = new UndirectedGraph([
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 3],
      [2, 5],
      [3, 4],
      [5, 6],
      [5, 8],
      [6, 7],
      [7, 8],
    ]);

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

    const graph = new UndirectedGraph([
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
      [3, 5],
      [4, 5],
    ]);

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

    const graph = new UndirectedGraph([
      [0, 1],
      [0, 2],
      [1, 2],
    ]);

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

    const graph = new UndirectedGraph([
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 3],
      [2, 4],
      [3, 4],
    ]);

    const articulationPoints = findArticulationPoints(graph);
    expect(articulationPoints).toEqual([false, false, true, false, false]);
  });
});
