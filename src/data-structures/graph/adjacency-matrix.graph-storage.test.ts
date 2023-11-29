import { AdjacencyMatrix_GraphStorage } from '@root/data-structures';

describe('AdjacencyMatrix_GraphStorage', () => {
  let graph: AdjacencyMatrix_GraphStorage;

  beforeEach(() => {
    graph = new AdjacencyMatrix_GraphStorage();
  });

  test('create a new graph', () => {
    expect(graph).toBeInstanceOf(AdjacencyMatrix_GraphStorage);
    expect(graph.size()).toEqual(0);
  });

  test('should support initialize with size', () => {
    const graph = new AdjacencyMatrix_GraphStorage(8);
    expect(graph.size()).toEqual(8);
    expect(graph.weight(0, 7)).toEqual(Infinity);
  });

  test('should return exactly size', () => {
    graph.setEdge(0, 1);
    graph.setEdge(1, 2);
    graph.setEdge(1, 3);
    graph.setEdge(2, 5);

    expect(graph.size()).toEqual(6);
  });

  test('should able to set a vertex', () => {
    graph.setVertex(9);
    expect(graph.weight(0, 9)).toEqual(Infinity);
  });

  test('should be able to set edge between two vertices', () => {
    graph.setEdge(1, 2);
    expect(graph.weight(1, 2)).toEqual(0);
  });

  test('should return Infinity if there is no edge between two vertices', () => {
    graph.setEdge(0, 1);
    graph.setEdge(1, 2);
    graph.setEdge(1, 3);
    graph.setEdge(2, 5);

    expect(graph.weight(1, 5)).toEqual(Infinity);
  });

  test('should return 0 as weight in case unweighted graph', () => {
    graph.setEdge(0, 1);
    graph.setEdge(1, 2);
    graph.setEdge(1, 3);
    graph.setEdge(2, 5);

    expect(graph.weight(1, 3)).toEqual(0);
  });

  test('should support weighted graph', () => {
    graph.setEdge(0, 1, 3);
    expect(graph.weight(0, 1)).toBe(3);
  });

  test('should handle negative vertex indices', () => {
    expect(() => graph.setVertex(-1)).toThrow('Negative vertex is not allowed');
    expect(() => graph.setEdge(-1, 2)).toThrow(
      'Negative vertex is not allowed',
    );
  });

  test('should throw an error for out-of-bound vertices', () => {
    expect(() => graph.weight(5, 2)).toThrow('Out of graph bound');
    expect(() => graph.neighbors(5)).toThrow('Out of graph bound');
  });
});
