import { GraphStorage_Interface } from '@root/data-structures';

export class AdjacencyList_GraphStorage implements GraphStorage_Interface {
  private vertices: number;

  private adjacencyList: Map<number, Map<number, number>>;

  constructor(size?: number) {
    this.vertices = size ?? 0;
    this.adjacencyList = new Map<number, Map<number, number>>();
  }

  size(): number {
    return this.vertices;
  }

  setVertex(vertex: number): void {
    if (vertex < 0) {
      throw new Error('Negative vertex is not allowed');
    }

    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Map<number, number>());
    }

    this.vertices = Math.max(this.vertices, vertex + 1);
  }

  setEdge(
    source: number,
    destination: number,
    weight?: number | undefined,
  ): void {
    if (source < 0 || destination < 0) {
      throw new Error('Negative vertex is not allowed');
    }

    if (!this.adjacencyList.has(source)) {
      this.adjacencyList.set(source, new Map<number, number>());
    }

    if (weight !== undefined) {
      this.adjacencyList.get(source)?.set(destination, weight as number);
    } else {
      this.adjacencyList.get(source)?.set(destination, 0);
    }

    this.vertices = Math.max(this.vertices, source + 1, destination + 1);
  }

  weight(source: number, destination: number): number {
    const lastIndex = this.size() - 1;

    if (source > lastIndex || destination > lastIndex) {
      throw new Error('Out of graph bound');
    }

    if (!this.adjacencyList.get(source)?.has(destination)) return Infinity;
    return this.adjacencyList.get(source)?.get(destination) as number;
  }

  neighbors(vertex: number): number[] {
    const lastIndex = this.size() - 1;

    if (vertex > lastIndex) {
      throw new Error('Out of graph bound');
    }

    return Array.from(this.adjacencyList.get(vertex)?.keys() || []);
  }
}
