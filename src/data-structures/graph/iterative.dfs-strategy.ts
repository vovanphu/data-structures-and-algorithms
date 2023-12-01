import { DfsStrategy_Interface, Graph } from '@root/data-structures';

export class Iterative_DfsStrategy implements DfsStrategy_Interface {
  execute(graph: Graph, startingVertex: number, callback: Function): void {
    const visited: boolean[] = new Array(graph.size()).fill(false);
    const stack: number[] = new Array<number>();

    stack.push(startingVertex);

    while (stack.length > 0) {
      const vertex: number = stack.pop() as number;

      if (visited[vertex]) continue;

      visited[vertex] = true;
      callback(vertex);

      const neighbors = graph.neighbors(vertex);

      for (let i = neighbors.length - 1; i > -1; i--) {
        const neighbor = neighbors[i];
        stack.push(neighbor);
      }
    }
  }
}
