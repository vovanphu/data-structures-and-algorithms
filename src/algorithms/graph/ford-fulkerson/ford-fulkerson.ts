import { DirectedGraph } from '@root/data-structures';

/**
 * Function calculate and return maximum flow of a given flow network (a directed graph)
 * using ford fulkerson method
 *
 * This version use dfs to find augmenting path, then calculate the bottleneck,
 * distribute bottleneck value to a residual network graph
 * to calculate total maximum flow value of given flow network
 * @param graph
 * @param start
 * @param end
 * @returns The maximum network flow value
 */
export function fordFulkerson(
  graph: DirectedGraph,
  start: number,
  end: number,
): number {
  // Basic error handling
  if (start < 0 || start >= graph.size() || end >= graph.size()) {
    throw new Error('Out of graph bound');
  }

  /**
   * The maximum network flow value of the given input
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

  /**
   * Function utilize dfs to find augmenting path
   * @param residual
   * @param start
   * @param end
   * @param prev
   * @param visited
   * @returns
   */
  const dfs = (
    residual: DirectedGraph,
    start: number,
    end: number,
    prev: number[] = Array.from({ length: residual.size() }),
    visited: boolean[] = Array.from({ length: residual.size() }, () => false),
  ): number[] => {
    visited[start] = true;

    if (start === end) return prev;

    for (const neighbor of residual.neighbors(start)) {
      if (visited[neighbor] === true) continue;
      if (residual.get(start, neighbor) <= 0) continue;

      prev[neighbor] = start;
      dfs(residual, neighbor, end, prev, visited);
    }

    return prev;
  };

  /**
   * Function used to calculate the maximum flow
   * of the current augmenting path from `start` to `end` vertex
   * represented by `prev` array
   * @param residual
   * @param start
   * @param end
   * @param prev
   * @returns
   */
  const calculateBottleneck = (
    residual: DirectedGraph,
    start: number,
    end: number,
    prev: number[],
  ): number => {
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
  };

  /**
   * Function to update the bottleneck value of the current
   * augmenting path from `start` to `end` into residual graph
   * @param residual
   * @param start
   * @param end
   * @param prev
   * @param bottleneck
   * @returns
   */
  const updateResidual = (
    residual: DirectedGraph,
    start: number,
    end: number,
    prev: number[],
    bottleneck: number,
  ) => {
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
  };

  let augmentingPath = dfs(residual, start, end);
  let bottleneck = calculateBottleneck(residual, start, end, augmentingPath);

  while (bottleneck > 0) {
    maximumNetworkFlow += bottleneck;
    updateResidual(residual, start, end, augmentingPath, bottleneck);
    augmentingPath = dfs(residual, start, end);
    bottleneck = calculateBottleneck(residual, start, end, augmentingPath);
  }

  return maximumNetworkFlow;
}
