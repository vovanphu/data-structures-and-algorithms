import { DirectedGraph } from '@root/data-structures';
import { FindAugmentingPathStrategy_Interface } from './find-augmenting-path-strategy.interface';

export class Dfs_FindAugmentingPathStrategy
  implements FindAugmentingPathStrategy_Interface
{
  execute(
    residual: DirectedGraph,
    start: number,
    end: number,
    prev: number[] = Array.from({ length: residual.size() }),
    visited: boolean[] = Array.from({ length: residual.size() }, () => false),
  ): number[] {
    visited[start] = true;

    if (start === end) return prev;

    for (const neighbor of residual.neighbors(start)) {
      if (visited[neighbor]) continue;
      if (residual.get(start, neighbor) <= 0) continue;

      prev[neighbor] = start;
      this.execute(residual, neighbor, end, prev, visited);
    }

    return prev;
  }
}
