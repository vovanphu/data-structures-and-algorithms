import { DfsStrategy_Interface } from './dfs-strategy.interface';
import { Graph } from '../graph.class';

export class Iterative_DfsStrategy implements DfsStrategy_Interface {
  execute(graph: Graph, startingVertex: number, callback: Function): void {
    const visited: boolean[] = new Array(graph.size()).fill(false);
    const stack: number[] = new Array<number>();

    stack.push(startingVertex);

    while (stack.length > 0) {
      const vertex: number = stack.pop() as number;

      visited[vertex] = true;
      callback(vertex);

      const neighbors = graph.neighbors(vertex);

      for (let i = neighbors.length - 1; i > -1; i--) {
        const neighbor = neighbors[i];
        if (visited[neighbor]) continue;
        stack.push(neighbor);
      }
    }
  }
}
