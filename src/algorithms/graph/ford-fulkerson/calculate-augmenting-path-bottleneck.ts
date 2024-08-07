import { DirectedGraph } from '@root/data-structures';

/**
 * function used to calculate the maximum flow of the current augmenting path
 * from `start` to `end` vertex represented by `prev` array
 * @param residual
 * @param start
 * @param end
 * @param prev
 */
export function calculateAugmentingPathBottleneck(
  residual: DirectedGraph,
  start: number,
  end: number,
  prev: number[],
): number {
  let vertex = end;
  let parent = prev[vertex];
  let bottleneck = Infinity;

  if (parent === undefined) return 0;

  while (parent !== undefined) {
    bottleneck = Math.min(bottleneck, residual.get(parent, vertex));
    vertex = parent;
    parent = prev[vertex];

    if (vertex === start) break;
  }

  return bottleneck;
}
