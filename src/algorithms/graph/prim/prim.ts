import { IndexedPriorityQueue, UndirectedGraph } from '@root/data-structures';

export function prim(graph: UndirectedGraph): number[][] {
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

  return [];
}
