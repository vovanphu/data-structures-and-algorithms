export class WeightedGraph {
  private vertices: number;
  private adjacencyList: Map<number, Map<number, number>>;

  constructor(vertices: number) {
    this.vertices = vertices;
    this.adjacencyList = new Map();
    for (let i = 0; i < vertices; i++) {
      this.adjacencyList.set(i, new Map());
    }
  }

  size(): number {
    return this.vertices;
  }

  addEdge(source: number, destination: number, weight: number = 0) {
    if (source > this.vertices || destination > this.vertices) {
      throw new Error('Out of graph bound');
    }
    const edges = this.adjacencyList.get(source) || new Map();
    edges.set(destination, weight);
  }

  neighbors(vertex: number): number[] {
    return Array.from(this.adjacencyList.get(vertex)?.keys() || []);
  }

  weight(source: number, destination: number): number {
    if (!this.adjacencyList.get(source)?.has(destination)) return Infinity;
    return this.adjacencyList.get(source)?.get(destination) as number;
  }
}
