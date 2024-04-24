import { GraphStorage_Interface } from './graph-storage.interface';

export class AdjacencyMatrix_GraphStorage implements GraphStorage_Interface {
  private vertices: number;

  private adjacencyMatrix: Array<Array<number>>;

  constructor(size?: number) {
    this.vertices = size ?? 0;
    this.adjacencyMatrix = new Array(size)
      .fill(undefined)
      .map(() => new Array(size).fill(Infinity));
  }

  size(): number {
    return this.vertices;
  }

  setVertex(vertex: number): void {
    if (vertex < 0) {
      throw new Error('Negative vertex is not allowed');
    }

    const lastIndex = this.size() - 1;

    if (lastIndex < vertex) {
      for (let i = 0; i <= vertex; i++) {
        if (i <= lastIndex) {
          for (let j = lastIndex + 1; j <= vertex; j++) {
            this.adjacencyMatrix[i][j] = Infinity;
          }
        } else {
          this.adjacencyMatrix[i] = new Array(vertex + 1).fill(Infinity);
        }
      }

      this.vertices = vertex + 1;
    }
  }

  setEdge(source: number, destination: number, weight?: number): void {
    if (source < 0 || destination < 0) {
      throw new Error('Negative vertex is not allowed');
    }

    const greaterIndex = Math.max(source, destination);

    this.setVertex(greaterIndex);

    weight = (weight ?? 1) as number;
    this.adjacencyMatrix[source][destination] = weight;
  }

  weight(source: number, destination: number): number {
    const lastIndex = this.size() - 1;

    if (source > lastIndex || destination > lastIndex) {
      throw new Error('Out of graph bound');
    }

    return this.adjacencyMatrix[source][destination];
  }

  neighbors(vertex: number): number[] {
    const lastIndex = this.size() - 1;

    if (vertex > lastIndex) {
      throw new Error('Out of graph bound');
    }

    return this.adjacencyMatrix[vertex].flatMap((weight, i) =>
      weight !== Infinity ? i : [],
    );
  }
}
