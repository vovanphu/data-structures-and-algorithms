import { Graph, Queue } from '@root/data-structures';

/**
 * Construct topology order using depth-first-search method
 * @param graph 
 * @returns The topology order
 */
export function topSortRecursive(graph: Graph): number[] {
  const ordering: number[] = [];
  const visited: boolean[] = Array.from({ length: graph.size() }, () => false);
  let currentIndex = graph.size() - 1;

  for (let vertex = 0; vertex < graph.size(); vertex++) {
    if (visited[vertex]) continue;
    visited[vertex] = true;
    _topSortRecursive(graph, vertex, visited, ordering, currentIndex);
  }

  return ordering;
}

function _topSortRecursive(
  graph: Graph,
  vertex: number,
  visited: boolean[],
  ordering: number[],
  currentIndex: number,
): number {
  for (const neighbor of graph.neighbors(vertex)) {
    if (visited[neighbor]) continue;
    visited[neighbor] = true;
    currentIndex = _topSortRecursive(
      graph,
      neighbor,
      visited,
      ordering,
      currentIndex,
    );
  }

  // Construct topology in reversed order
  ordering[currentIndex] = vertex;

  return currentIndex - 1;
}

/**
 * Construct topology order using kahn's algorithm
 * @param graph
 * @returns The topology order
 * 
 * This algorithm is very easy to understand and
 * implement. And it has a huge advantage compare
 * to the dfs version since it will return an empty
 * array if there are cycles inside the graph
 */
export function topSortKahn(graph: Graph): number[] {
  const order: number[] = [];
  const queue: Queue<number> = new Queue();
  const inDegrees: number[] = Array.from({ length: graph.size() }, () => 0);

  // Initialize base graph node's in-degrees
  for (let vertex = 0; vertex < graph.size(); vertex++) {
    for (const neighbor of graph.neighbors(vertex)) {
      inDegrees[neighbor]++;
    }
  }

  // Queue 0 in-degree nodes
  for (const inDegree of inDegrees) {
    if (inDegree === 0) queue.enqueue(inDegree);
  }

  // Construct topology order from 0 in-degree nodes
  while (queue.size() > 0) {
    const vertext = queue.dequeue() as number;
    order.push(vertext);

    // Recalculate node's neighbors's in-degree
    for (const neighbor of graph.neighbors(vertext)) {
      inDegrees[neighbor]--;

      if (inDegrees[neighbor] === 0) {
        queue.enqueue(neighbor);
      }
    }
  }

  // There are cycles in this graph
  if (order.length !== graph.size()) return [];

  return order;
}
