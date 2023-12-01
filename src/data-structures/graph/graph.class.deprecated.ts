/**
 * @deprecated
 */
export class Graph {
  vertices: number;
  adjacencyList: Map<number, number[]>;

  constructor(vertices: number) {
    this.vertices = vertices;
    this.adjacencyList = new Map();
  }

  size() {
    return this.vertices;
  }

  addEdge(source: number, destination: number) {
    if (source > this.vertices) return false;
    if (destination > this.vertices) return false;
    if (!this.adjacencyList.has(source)) {
      this.adjacencyList.set(source, []);
    }
    if (!this.adjacencyList.get(source)?.includes(destination)) {
      this.adjacencyList.get(source)?.push(destination);
    }
    return true;
  }

  neighbors(vertex: number): number[] {
    return this.adjacencyList.get(vertex) || [];
  }

  dfsRecursive(
    startingVertex: number,
    callback: Function = console.log,
    visited: boolean[] = new Array(this.vertices).fill(false),
  ) {
    if (visited[startingVertex]) return;
    visited[startingVertex] = true;
    callback(startingVertex);
    const neighbors = this.adjacencyList.get(startingVertex) || [];
    for (const neighbor of neighbors) {
      this.dfsRecursive(neighbor, callback, visited);
    }
  }

  dfsIterative(startingVertex: number, callback: Function = console.log) {
    const visited: boolean[] = new Array(this.vertices).fill(false);
    const stack: number[] = [];
    stack.push(startingVertex);
    while (stack.length > 0) {
      const vertex: number = stack.pop() as number;
      if (visited[vertex]) continue;
      visited[vertex] = true;
      callback(vertex);
      const neighbors = this.adjacencyList.get(vertex) || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neighbor = neighbors[i];
        stack.push(neighbor);
      }
    }
  }

  bfsRecursive(startingVertex: number, callback: Function = console.log) {
    this._bfsRecursive(callback, [startingVertex]);
  }

  private _bfsRecursive(
    callback: Function = console.log,
    queue: number[] = [],
    visited: boolean[] = new Array(this.vertices).fill(false),
  ) {
    if (queue.length === 0) return;
    const vertex = queue.shift() as number;
    if (!visited[vertex]) {
      visited[vertex] = true;
      callback(vertex);
      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors) {
        queue.push(neighbor);
      }
    }
    this._bfsRecursive(callback, queue, visited);
  }

  bfsIterative(startingVertex: number, callback: Function = console.log) {
    const visited: boolean[] = new Array(this.vertices).fill(false);
    const queue: number[] = [];
    queue.push(startingVertex);
    while (queue.length > 0) {
      const vertex = queue.shift() as number;
      if (visited[vertex]) continue;
      callback(vertex);
      const neighbors = this.adjacencyList.get(vertex) || [];
      for (const neighbor of neighbors) {
        queue.push(neighbor);
      }
    }
  }
}
