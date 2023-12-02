import { GraphStorage_Interface } from './graph-storage.inferface';
import { Recursive_DfsStrategy } from './recursive.dfs-strategy';
import { UndirectedGraph } from './undirected-graph.class';

class MockGraphStorage implements GraphStorage_Interface {
  vertices: Set<number> = new Set<number>();
  edges: Map<number, Map<number, number>> = new Map<
    number,
    Map<number, number>
  >();

  setVertex(vertex: number): void {
    this.vertices.add(vertex);
  }

  setEdge(source: number, destination: number, weight?: number): void {
    if (!this.edges.has(source)) {
      this.edges.set(source, new Map());
    }
    this.edges.get(source)?.set(destination, weight || 0);
  }

  weight(source: number, destination: number): number {
    if (!this.edges.get(source)?.has(destination)) return Infinity;
    return this.edges.get(source)?.get(destination) as number;
  }

  size(): number {
    return this.vertices.size;
  }

  neighbors(vertex: number): number[] {
    return Array.from(this.edges.get(vertex)?.keys() || []);
  }
}

jest.mock('./recursive.dfs-strategy');

describe('UndirectedGraph', () => {
  let graph: UndirectedGraph;
  let mockGraphStorage: MockGraphStorage;

  beforeEach(() => {
    jest.mocked(Recursive_DfsStrategy).mockClear();
    mockGraphStorage = new MockGraphStorage();
    graph = new UndirectedGraph(undefined, mockGraphStorage);
  });

  test('should set vertex correctly', () => {
    graph.set(1);
    mockGraphStorage.vertices.has(1);
    expect(mockGraphStorage.size()).toBe(1);
  });

  test('should set edge correctly', () => {
    graph.set(1, 2, 5);
    expect(mockGraphStorage.weight(1, 2)).toBe(5);
    expect(mockGraphStorage.weight(2, 1)).toBe(5);
  });

  it('should get weight correctly', () => {
    graph.set(1, 2, 3);
    expect(graph.get(1, 2)).toBe(3);
    expect(graph.get(2, 1)).toBe(3);
  });

  it('should get neighbors correctly', () => {
    graph.set(1, 2);
    graph.set(1, 3);
    expect(graph.neighbors(1)).toEqual([2, 3]);
    expect(graph.neighbors(2)).toEqual([1]);
    expect(graph.neighbors(3)).toEqual([1]);
  });

  it('should handle initial with edges correctly', () => {
    const edges = [[1, 2], [], [1, 3], [2, 4, 4]];
    const graph = new UndirectedGraph(edges, mockGraphStorage);
    expect(graph.get(1, 2)).toEqual(0);
    expect(graph.get(2, 1)).toEqual(0);
    expect(graph.get(2, 4)).toEqual(4);
    expect(graph.get(4, 2)).toEqual(4);
    expect(graph.get(1, 4)).toEqual(Infinity);
    expect(graph.get(4, 1)).toEqual(Infinity);
    expect(graph.neighbors(1)).toEqual([2, 3]);
    expect(graph.neighbors(2)).toEqual([1, 4]);
  });

  it('should call the execute method of the dfsStrategy with the correct arguments', () => {
    const callback = jest.fn();
    graph.dfs(0, callback);
    const dfsStrategy = jest.mocked(Recursive_DfsStrategy).mock.instances[0];
    expect(jest.mocked(Recursive_DfsStrategy)).toHaveBeenCalledOnce();
    expect(dfsStrategy.execute).toHaveBeenCalledWith(graph, 0, callback);
  });
});
