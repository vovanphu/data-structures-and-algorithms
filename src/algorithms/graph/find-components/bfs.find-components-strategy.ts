import { Graph } from '@root/data-structures';
import { FindComponentsStrategy_Interface } from './find-component-strategy.interface';

export class Bfs_FindComponentsStrategy
  implements FindComponentsStrategy_Interface
{
  execute(graph: Graph): Array<Array<number>> {
    const visited: boolean[] = new Array(graph.size()).fill(false);
    let count = 0;
    const components: Array<Array<number>> = [];

    visited.forEach((isVisited, vertex) => {
      if (isVisited) return;

      graph.bfs(vertex, (v: number) => {
        visited[v] = true;

        if (components[count] === undefined) components[count] = [];
        components[count].push(v);
      });

      count++;
    });

    return components;
  }
}
