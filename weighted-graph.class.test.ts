import { WeightedGraph } from './weighted-graph.class';

describe('Weighted Graph', () => {
  it('should add edges with weights', () => {
    const graph = new WeightedGraph(5);
    graph.addEdge(0, 1, 3);
    graph.addEdge(0, 2, 5);
    graph.addEdge(1, 3, 2);
    graph.addEdge(2, 3, 4);
    graph.addEdge(3, 4, 1);

    expect(graph.weight(0, 1)).toBe(3);
    expect(graph.weight(0, 2)).toBe(5);
    expect(graph.weight(1, 3)).toBe(2);
    expect(graph.weight(2, 3)).toBe(4);
    expect(graph.weight(3, 4)).toBe(1);
  });

  it('should throw an error for out-of-bounds vertices', () => {
    const graph = new WeightedGraph(3);

    expect(() => graph.addEdge(0, 4, 5)).toThrowError('Out of graph bound');
    expect(() => graph.addEdge(5, 2, 3)).toThrowError('Out of graph bound');
  });

  it('should return the weight of an existing edge', () => {
    const graph = new WeightedGraph(4);
    graph.addEdge(0, 1, 5);
    graph.addEdge(1, 2, 3);
    graph.addEdge(2, 3, 2);

    expect(graph.weight(0, 1)).toBe(5);
    expect(graph.weight(1, 2)).toBe(3);
    expect(graph.weight(2, 3)).toBe(2);
  });

  it('should return Infinity for non-existent edge', () => {
    const graph = new WeightedGraph(4);
    graph.addEdge(0, 1, 5);
    graph.addEdge(1, 2, 3);

    expect(graph.weight(0, 2)).toBe(Infinity);
    expect(graph.weight(2, 0)).toBe(Infinity);
    expect(graph.weight(1, 3)).toBe(Infinity);
  });

  it('should return neighboring vertices', () => {
    const graph = new WeightedGraph(5);
    graph.addEdge(0, 1, 3);
    graph.addEdge(0, 2, 5);
    graph.addEdge(1, 3, 2);
    graph.addEdge(2, 3, 4);
    graph.addEdge(3, 4, 1);

    expect(graph.neighbors(0)).toEqual([1, 2]);
    expect(graph.neighbors(1)).toEqual([3]);
    expect(graph.neighbors(2)).toEqual([3]);
    expect(graph.neighbors(3)).toEqual([4]);
    expect(graph.neighbors(4)).toEqual([]);
  });
});
