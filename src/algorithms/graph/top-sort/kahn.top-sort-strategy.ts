import { DirectedGraph, Queue } from '@root/data-structures';
import { TopSortStrategy_Interface } from './top-sort-strategy.interface';

export class Kahn_TopSortStrategy implements TopSortStrategy_Interface {
  /**
   * Construct topology order using kahn's algorithm
   * @param graph
   * @returns The topology order
   * 
   * This algorithm is very easy to understand and
   * implement. And it has a huge advantage compare
   * to the dfs version since it will return an empty
   * array if there is a cycle inside the graph
   */
  execute(graph: DirectedGraph): number[] {
    // Variable for in-degrees
    const inDegrees: number[] = Array.from({ length: graph.size() }, () => 0);

    // Initialize base graph node's in-degrees
    for (let vertex = 0; vertex < graph.size(); vertex++) {
      for (const neighbor of graph.neighbors(vertex)) {
        inDegrees[neighbor]++;
      }
    }

    // Variable for traversal and calculate result
    const order: number[] = [];
    const queue: Queue<number> = new Queue();

    // Queue 0 in-degree nodes
    for (let vertex = 0; vertex < graph.size(); vertex++) {
      if (inDegrees[vertex] === 0) queue.enqueue(vertex);
    }

    // Construct topology order from 0 in-degree nodes
    while (queue.size() > 0) {
      const vertex = queue.dequeue() as number;
      order.push(vertex);

      // Recalculate node's neighbors's in-degree
      for (const neighbor of graph.neighbors(vertex)) {
        inDegrees[neighbor]--;

        // Enqueue new 0 in-degree nodes
        if (inDegrees[neighbor] === 0) {
          queue.enqueue(neighbor);
        }
      }
    }

    // Return empty array if there are cycles in the graph
    if (order.length !== graph.size()) return [];

    return order;
  }
}
