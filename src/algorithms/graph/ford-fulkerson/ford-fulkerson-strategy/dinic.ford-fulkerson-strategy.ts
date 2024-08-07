import { DirectedGraph, Queue } from '@root/data-structures';
import { FordFulkersonStrategy_Interface } from './ford-fulkerson-strategy.interface';
import { calculateAugmentingPathBottleneck } from '../calculate-augmenting-path-bottleneck';
import { updateResidualGraph } from '../update-residual-graph';

export class Dinic_FordFulkersonStrategy
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
   * This version use dinic algorithm, a combination of bfs and dfs
   * to find Augmenting Path
   *
   * @param graph
   * @param start
   * @param end
   */
  execute(graph: DirectedGraph, start: number, end: number): number {
    // Basic error handling
    if (start < 0 || end < 0 || start >= graph.size() || end >= graph.size()) {
      throw new Error('Out of graph bound');
    }

    /**
     * The maximum network flow of the given input
     */
    let maximumNetworkFlow = 0;

    /**
     * Residual graph used to store flows and residual values
     */
    const residual = new DirectedGraph();

    // Initialize the residual graph
    for (let vertex = 0; vertex < graph.size(); vertex++) {
      for (const neighbor of graph.neighbors(vertex)) {
        residual.set(vertex, neighbor, graph.get(vertex, neighbor));
        residual.set(neighbor, vertex, 0);
      }
    }

    /**
     * Array store levels of each node in the graph
     */
    let levels = this.calculateNodeLevels(residual, start);

    /**
     * Array store the last visited neighbors to ignore
     * already explore dead-end, gonna reset along with levels array
     */
    let nexts: number[] = Array.from({ length: residual.size() }, () => 0);

    while (levels[end] !== -1) {
      let augmentingPath = this.findAugmentingPath(
        residual,
        start,
        end,
        levels,
        nexts,
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

        augmentingPath = this.findAugmentingPath(
          residual,
          start,
          end,
          levels,
          nexts,
        );

        bottleneck = calculateAugmentingPathBottleneck(
          residual,
          start,
          end,
          augmentingPath,
        );
      }

      levels = this.calculateNodeLevels(residual, start);
      nexts = Array.from({ length: residual.size() }, () => 0);
    }

    return maximumNetworkFlow;
  }

  /**
   * Method use bfs to calculate depth level for each node in the graph
   * @param residual
   * @param start
   * @param end
   * @returns
   */
  calculateNodeLevels(residual: DirectedGraph, start: number) {
    const levels: number[] = Array.from({ length: residual.size() }, () => -1);
    const queue: Queue<number> = new Queue();

    const visited: boolean[] = Array.from(
      { length: residual.size() },
      () => false,
    );

    visited[start] = true;
    queue.enqueue(start);
    levels[start] = 0;

    while (queue.size() > 0) {
      const vertex = queue.dequeue() as number;

      for (const neighbor of residual.neighbors(vertex)) {
        if (visited[neighbor] === true) continue;
        if (residual.get(vertex, neighbor) <= 0) continue;

        visited[neighbor] = true;
        queue.enqueue(neighbor);
        levels[neighbor] = levels[vertex] + 1;
      }
    }

    return levels;
  }

  /**
   * A modified version of findAugmentingPath support choosing edges
   * by level which progress toward the end node
   * @param residual
   * @param start
   * @param end
   * @param levels
   * @param prev
   * @param visited
   * @returns
   */
  findAugmentingPath(
    residual: DirectedGraph,
    start: number,
    end: number,
    levels: number[],
    nexts: number[],
    prev: number[] = Array.from({ length: residual.size() }),
    visited: boolean[] = Array.from({ length: residual.size() }, () => false),
  ) {
    visited[start] = true;

    if (start === end) return prev;

    const neighbors = residual.neighbors(start);

    for (; nexts[start] < neighbors.length; nexts[start]++) {
      const neighbor = neighbors[nexts[start]];

      if (visited[neighbor] === true) continue;
      if (residual.get(start, neighbor) <= 0) continue;
      if (levels[start] >= levels[neighbor]) continue;

      visited[neighbor] = true;
      prev[neighbor] = start;

      this.findAugmentingPath(
        residual,
        neighbor,
        end,
        levels,
        nexts,
        prev,
        visited,
      );
    }

    return prev;
  }
}
