import { DirectedGraph, Queue } from '@root/data-structures';
import { FindAugmentingPathStrategy_Interface } from './find-augmenting-path-strategy.interface';

export class EdmondsKarp_FindAugmentingPathStrategy
  implements FindAugmentingPathStrategy_Interface
{
  execute(residual: DirectedGraph, start: number, end: number): number[] {
    const prev: number[] = Array.from({ length: residual.size() });
    const visited: boolean[] = Array.from(
      { length: residual.size() },
      () => false,
    );
    const queue: Queue<number> = new Queue();
    queue.enqueue(start);
    visited[start] = true;

    while (queue.size() > 0) {
      const vertex = queue.dequeue() as number;

      if (vertex === end) return prev;

      for (const neighbor of residual.neighbors(vertex)) {
        if (visited[neighbor]) continue;
        if (residual.get(vertex, neighbor) <= 0) continue;

        prev[neighbor] = vertex;
        queue.enqueue(neighbor);
        visited[neighbor] = true;
      }
    }

    return prev;
  }
}
