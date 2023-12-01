import { Graph, GraphStorage_Interface } from '@root/data-structures';

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

describe('Graph', () => {
  let graph: Graph;
  let mockGraphStorage: MockGraphStorage;

  beforeEach(() => {
    mockGraphStorage = new MockGraphStorage();
    graph = new Graph(undefined, mockGraphStorage);
  });

  test('should set vertex correctly', () => {
    graph.set(1);
    mockGraphStorage.vertices.has(1);
    expect(mockGraphStorage.size()).toBe(1);
  });

  test('should set edge correctly', () => {
    graph.set(1, 2, 5);
    expect(mockGraphStorage.weight(1, 2)).toBe(5);
  });

  it('should get weight correctly', () => {
    mockGraphStorage.setEdge(1, 2, 3);
    expect(graph.get(1, 2)).toBe(3);
  });

  it('should get neighbors correctly', () => {
    graph.set(1, 2);
    graph.set(1, 3);
    expect(graph.neighbors(1)).toEqual([2, 3]);
  });

  it('should handle undefined source in set', () => {
    graph.set(undefined as any, 2, 3);
    expect(mockGraphStorage.size()).toBe(0);
  });

  it('should handle initial with edges correctly', () => {
    const edges = [[1, 2], [], [1, 3], [2, 4, 4]];
    const graph = new Graph(edges, mockGraphStorage);
    expect(graph.get(1, 2)).toEqual(0);
    expect(graph.get(2, 4)).toEqual(4);
    expect(graph.get(1, 4)).toEqual(Infinity);
    expect(graph.neighbors(1)).toEqual([2, 3]);
  });
});
