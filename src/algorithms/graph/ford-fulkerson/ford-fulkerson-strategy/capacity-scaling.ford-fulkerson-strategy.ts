import { DirectedGraph } from '@root/data-structures';
import { FordFulkersonStrategy_Interface } from './ford-fulkerson-strategy.interface';
import { calculateAugmentingPathBottleneck } from '../calculate-augmenting-path-bottleneck';
import { updateResidualGraph } from '../update-residual-graph';

export class CapacityScaling_FordFulkersonStrategy
  implements FordFulkersonStrategy_Interface
{
  /**
   * Calculate and return maximum flow of a given flow network (a directed graph)
   * using ford fulkerson method:
   * - Repeatly find augmenting path
   * - Calculate bottle neck value for each augmenting path
   * - Use the bottle neck value to update residual network graph
   * and calculate maximum flow
   *
   * This version use capacity scaling heuristic and dfs to find Augmenting Path
   *
   * @param graph
   * @param start
   * @param end
   */
  execute(graph: DirectedGraph, start: number, end: number): number {
    if (start < 0 || end < 0 || start >= graph.size() || end >= graph.size()) {
      throw new Error('Out of graph bound');
    }

    /**
     * The maxium network flow of the given input
     */
    let maximumNetworkFlow = 0;

    /**
     * Residual graph used to store flows and residual values
     */
    const residual = new DirectedGraph();

    /**
     * The largest capacity in the initial graph
     */
    let maxCapacity = 0;

    // Initialize residual graph
    for (let vertex = 0; vertex < graph.size(); vertex++) {
      for (const neighbor of graph.neighbors(vertex)) {
        residual.set(vertex, neighbor, graph.get(vertex, neighbor));
        residual.set(neighbor, vertex, 0);

        maxCapacity = Math.max(maxCapacity, residual.get(vertex, neighbor));
      }
    }

    /**
     * The delta used as threshold when selecting augmenting path
     */
    let delta = Math.floor(Math.log(maxCapacity) / Math.log(2));

    for (; delta > 0; delta /= 2) {
      let augmentingPath = this.findAugmentingPath(residual, start, end, delta);

      let bottleneck = calculateAugmentingPathBottleneck(
        residual,
        start,
        end,
        augmentingPath,
      );

      while (bottleneck > 0) {
        maximumNetworkFlow += bottleneck;
        updateResidualGraph(residual, start, end, augmentingPath, bottleneck);

        augmentingPath = this.findAugmentingPath(residual, start, end, delta);

        bottleneck = calculateAugmentingPathBottleneck(
          residual,
          start,
          end,
          augmentingPath,
        );
      }
    }

    return maximumNetworkFlow;
  }

  /**
   * A modified version of findAugmentingPath support choosing edges
   * using a threshold `delta`
   * @param residual
   * @param start
   * @param end
   * @param delta
   * @param prev
   * @param visited
   * @returns
   */
  findAugmentingPath(
    residual: DirectedGraph,
    start: number,
    end: number,
    delta: number,
    prev: number[] = Array.from({ length: residual.size() }),
    visited: boolean[] = Array.from({ length: residual.size() }, () => false),
  ): number[] {
    visited[start] = true;

    if (start === end) return prev;
    if (delta <= 0) return prev;

    for (const neighbor of residual.neighbors(start)) {
      if (visited[neighbor] === true) continue;

      const capacity = residual.get(start, neighbor);

      if (capacity < delta) continue;
      if (capacity <= 0) continue;

      prev[neighbor] = start;
      this.findAugmentingPath(residual, neighbor, end, delta, prev, visited);
    }

    return prev;
  }
}
