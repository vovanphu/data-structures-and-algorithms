import { Graph } from '@root/data-structures';

/**
 * Compute all-pairs-shortest-paths for the input graph
 * @param graph
 * @returns `[dists, prevs]`
 * In this algorithm, I make some modified to return the result
 * as prevs (array of previous node) insteads of nexts(array of next node)
 * like the traditional algorithm, intented to use the result with
 * function `recontructPath`
 *
 * For example
 * ```ts
 * const [dists, prevs] = floydWarshall(graph);
 * const shortestPath03 = reconstructPath(prevs[0], 0, 3);
 * ```
 */
export function floydWarshall(
  graph: Graph,
): [Array<Array<number>>, Array<Array<number | undefined>>] {
  // Dynamic programming table
  const tabular: Array<Array<number>> = Array.from(
    { length: graph.size() },
    (_, i) => Array.from({ length: graph.size() }, (_, j) => graph.get(i, j)),
  );

  // Prevs for shortest path
  const prevs: Array<Array<number | undefined>> = Array.from(
    { length: graph.size() },
    (_, i) =>
      Array.from({ length: graph.size() }, (_, j) =>
        i === j ? undefined : graph.get(i, j) === Infinity ? undefined : i,
      ),
  );

  // Iterations to improve estimate in tabular
  for (let k = 0; k < graph.size(); k++) {
    for (let i = 0; i < graph.size(); i++) {
      for (let j = 0; j < graph.size(); j++) {
        const oldDist = tabular[i][j];
        const newDist = tabular[i][k] + tabular[k][j];
        if (newDist < oldDist) {
          tabular[i][j] = newDist;
          prevs[i][j] = prevs[k][j];
        }
      }
    }
  }

  // Detect negative cycles
  for (let k = 0; k < graph.size(); k++) {
    for (let i = 0; i < graph.size(); i++) {
      for (let j = 0; j < graph.size(); j++) {
        const oldDist = tabular[i][j];
        const newDist = tabular[i][k] + tabular[k][j];
        if (newDist < oldDist) {
          tabular[i][j] = -Infinity;
          prevs[i][j] = -1;
        }
      }
    }
  }

  return [tabular, prevs];
}
