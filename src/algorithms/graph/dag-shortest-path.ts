import { Graph } from '@root/data-structures';
import { topSort } from './top-sort';

/**
 * Compute the shortest distance from
 * starting node to each node in a DAG
 * @param graph
 * @param startingVertex
 * @returns The shortest distance from
 * starting node to each node
 *
 * This algorithm use topology order as
 * barebone for traversal and relaxing
 * each node by compare the current
 * shortest with new distance
 */
export function dagShortestPath(
  graph: Graph,
  startingVertex: number,
): number[] {
  if (!graph || startingVertex < 0 || startingVertex >= graph.size()) {
    throw new Error('Invalid input parameters');
  }

  // Variables for result
  const dist: number[] = Array.from({ length: graph.size() }, () => Infinity);

  // Variables for traversal
  const topOrder = topSort(graph);

  // Starting always 0
  dist[startingVertex] = 0;

  // Traversing and relaxing node
  for (const vertex of topOrder) {
    if (dist[vertex] === Infinity) continue;

    // Relaxing by compare shortest distances
    // between the starting node with current neighbor
    // or total distance from starting node to
    // current vertex and current neigbor
    for (const neighbor of graph.neighbors(vertex)) {
      const weight = graph.get(vertex, neighbor);
      dist[neighbor] = Math.min(dist[neighbor], dist[vertex] + weight);
    }
  }

  return dist;
}
