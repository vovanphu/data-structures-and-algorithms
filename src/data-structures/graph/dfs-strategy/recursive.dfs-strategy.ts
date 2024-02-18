import { DfsStrategy_Interface } from './dfs-strategy.interface';
import { Graph } from '../graph.class';

export class Recursive_DfsStrategy implements DfsStrategy_Interface {
  execute(
    graph: Graph,
    startingVertex: number,
    callback: Function,
    visited: boolean[] = new Array(graph.size()).fill(false),
  ): void {
    if (visited[startingVertex]) return;

    visited[startingVertex] = true;
    callback(startingVertex);

    const neighbors = graph.neighbors(startingVertex);

    for (const neighbor of neighbors) {
      this.execute(graph, neighbor, callback, visited);
    }
  }
}
