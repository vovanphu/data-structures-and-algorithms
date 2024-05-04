import { Graph } from '@root/data-structures';

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
        graph.get(i, j) === Infinity ? undefined : i,
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
          prevs[i][j] = prevs[i][k];
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
