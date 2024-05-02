import { Graph } from '@root/data-structures';
import { topSort } from '../top-sort';

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
 * shortest with new distance.
 *
 * Note: This algorithm works well with DAG
 * and it can handle negative edges
 *
 * Time complexity: `O(V + E)`
 * Since it visit every vertices
 * and every edges of the graph
 */
export function dagShortestPath(
  graph: Graph,
  startingVertex: number,
): [number[], number[]] {
  // Variables for result
  const dist: number[] = Array.from({ length: graph.size() }, () => Infinity);
  const prev: number[] = Array.from({ length: graph.size() });

  if (startingVertex < 0 || startingVertex >= graph.size()) {
    return [dist, prev];
  }

  // Variables for traversal
  const topOrder = topSort(graph);

  // Starting always 0
  dist[startingVertex] = 0;

  // Traversing and relaxing node
  for (const vertex of topOrder) {
    // Encounter Infinity distance node on topo sort means
    // there are no path from the starting node to this node
    if (dist[vertex] === Infinity) continue;

    // Relaxing by compare shortest distances
    // between the starting node with current neighbor
    // or total distance from starting node to
    // current vertex and current neigbor
    for (const neighbor of graph.neighbors(vertex)) {
      const weight = graph.get(vertex, neighbor);
      if (dist[vertex] + weight < dist[neighbor]) {
        dist[neighbor] = dist[vertex] + weight;
        prev[neighbor] = vertex;
      }
    }
  }

  return [dist, prev];
}
