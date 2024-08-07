import { DirectedGraph } from '@root/data-structures';
import { FordFulkersonStrategy_Interface } from './ford-fulkerson-strategy.interface';
import {
  EdmondsKarp_FindAugmentingPathStrategy,
  findAugmentingPath,
} from '../find-augmenting-path';
import { calculateAugmentingPathBottleneck } from '../calculate-augmenting-path-bottleneck';
import { updateResidualGraph } from '../update-residual-graph';

export class EdmondsKarp_FordFulkersonStrategy
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
   * This version use bfs to find Augmenting Path
   *
   * @param graph
   * @param start
   * @param end
   */
  execute(graph: DirectedGraph, start: number, end: number): number {
    // Basic error handling
    if (start < 0 || start >= graph.size() || end >= graph.size()) {
      throw new Error('Out of graph bound');
    }

    /**
     * The maximum network flow of the given input
     */
    let maximumNetworkFlow = 0;

    /**
     * Residual graph used to store current flow and residual values
     */
    const residual = new DirectedGraph();

    // Initialize residual graph
    for (let vertex = 0; vertex < graph.size(); vertex++) {
      for (const neighbor of graph.neighbors(vertex)) {
        residual.set(vertex, neighbor, graph.get(vertex, neighbor));
        residual.set(neighbor, vertex, 0);
      }
    }

    let augmentingPath = findAugmentingPath(
      residual,
      start,
      end,
      EdmondsKarp_FindAugmentingPathStrategy,
    );

    let bottleneck = calculateAugmentingPathBottleneck(
      residual,
      start,
      end,
      augmentingPath,
    );

    while (bottleneck > 0) {
      maximumNetworkFlow += bottleneck;
      updateResidualGraph(residual, start, end, augmentingPath, bottleneck);

      augmentingPath = findAugmentingPath(
        residual,
        start,
        end,
        EdmondsKarp_FindAugmentingPathStrategy,
      );

      bottleneck = calculateAugmentingPathBottleneck(
        residual,
        start,
        end,
        augmentingPath,
      );
    }

    return maximumNetworkFlow;
  }
}
