import { IndexedPriorityQueue, UndirectedGraph } from '@root/data-structures';

/**
 * Function to find minimum spanding tree of a weighted undirected graph by
 * using prim's algorithm, works by utilize indexed priority queue to enable
 * greedy approach to choose next most promissing edge of the mst
 * @param graph
 * @returns
 */
export function prim(graph: UndirectedGraph): number[][] {
  // Base case for empty graph
  if (graph.size() === 0) return [];

  /**
   * Edges of the mst
   */
  const edges: number[][] = [];

  /**
   * Variable to tracking visited
   */
  const visited: boolean[] = Array.from({ length: graph.size() }, () => false);

  /**
   * Indexed priority queue supports choosing the next most potential incomming edge base on weight
   */
  const priorityQueue = new IndexedPriorityQueue();

  // Add starting point's edges to priority queue
  for (const neighbor of graph.neighbors(0)) {
    const weight = graph.get(0, neighbor);
    const key = JSON.stringify([0, neighbor, weight]);

    priorityQueue.enqueue(key, weight);
  }

  visited[0] = true;

  while (priorityQueue.size() > 0 && edges.length !== graph.size() - 1) {
    console.log(priorityQueue.peek());
    const [key] = priorityQueue.dequeue() as any;
    const [source, destination, weight]: number[] = JSON.parse(key);

    if (visited[destination] === true) continue;

    edges.push([source, destination, weight]);
    visited[destination] = true;

    for (const neighbor of graph.neighbors(destination)) {
      const weight = graph.get(destination, neighbor);
      const key = JSON.stringify([destination, neighbor, weight]);

      if (visited[neighbor] === false) priorityQueue.enqueue(key, weight);
    }
  }

  if (edges.length !== graph.size() - 1) return [];

  return edges;
}
