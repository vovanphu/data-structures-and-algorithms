import { dagShortestPath } from './dag-shortest-path.bk';

describe('DAG Shortest Path', () => {
  it('should calculate the shortest paths in a DAG', () => {
    const graph = new Map<number, Map<number, number>>();
    graph.set(
      0,
      new Map([
        [1, 3],
        [2, 5],
      ]),
    );
    graph.set(1, new Map([[3, 2]]));
    graph.set(2, new Map([[3, 4]]));
    graph.set(3, new Map([[4, 1]]));
    graph.set(4, new Map());
    const startVertex = 0;
    const result = dagShortestPath(graph, startVertex);
    expect(result).toEqual([0, 3, 5, 5, 6]);
  });

  it('should handle an empty graph', () => {
    const graph = new Map<number, Map<number, number>>();
    const startVertex = 0;
    const result = dagShortestPath(graph, startVertex);
    expect(result).toEqual([]);
  });

  it('should handle unreachable vertices', () => {
    const graph = new Map<number, Map<number, number>>();
    graph.set(
      0,
      new Map([
        [1, 3],
        [2, 5],
      ]),
    );
    graph.set(1, new Map([[3, 2]]));
    graph.set(2, new Map([[3, 4]]));
    graph.set(3, new Map([[4, 1]]));
    graph.set(4, new Map());
    const startVertex = 5; // Unreachable vertex
    const result = dagShortestPath(graph, startVertex);
    expect(result).toEqual([Infinity, Infinity, Infinity, Infinity, Infinity]);
  });
});
