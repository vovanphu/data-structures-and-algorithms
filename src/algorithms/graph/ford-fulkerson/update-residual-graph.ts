import { DirectedGraph } from '@root/data-structures';

/**
 * Function to update the bottleneck value of the current augmenting path
 * from `start` to `end` into the input residual graph
 * @param residual
 * @param start
 * @param end
 * @param prev
 * @param bottleneck
 */
export function updateResidualGraph(
  residual: DirectedGraph,
  start: number,
  end: number,
  prev: number[],
  bottleneck: number,
): void {
  let vertex = end;
  let parent = prev[vertex];

  if (parent === undefined) return;

  while (parent !== undefined) {
    const currentCapacity = residual.get(parent, vertex);
    residual.set(parent, vertex, currentCapacity - bottleneck);

    const currentResidual = residual.get(vertex, parent);
    residual.set(vertex, parent, currentResidual + bottleneck);

    vertex = parent;
    parent = prev[vertex];

    if (vertex === start) break;
  }
}
