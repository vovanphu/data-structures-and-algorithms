import { WeightedGraph } from './weighted-graph.class';
import { IndexedPriorityQueue } from './src/data-structures/queue/indexed-priority-queue.class';

export function dijkstra(graph: WeightedGraph, startIndex: number): number[] {
  const dist: number[] = new Array(graph.size()).fill(Infinity);
  if (startIndex >= graph.size()) return dist;
  const visited: boolean[] = new Array(graph.size()).fill(false);
  const priorityQueue = new IndexedPriorityQueue<number>();
  dist[startIndex] = 0;
  priorityQueue.enqueue(startIndex, 0);
  while (priorityQueue.size() > 0) {
    const [vertex, distance] = priorityQueue.dequeue() as [number, number];
    if (visited[vertex]) continue;
    visited[vertex] = true;
    if (dist[vertex] < distance) continue;
    const neighbors = graph.neighbors(vertex);
    for (const neighbor of neighbors) {
      const weight = graph.weight(vertex, neighbor);
      const oldDist = dist[neighbor];
      const newDist = dist[vertex] + weight;
      if (newDist < oldDist) {
        dist[neighbor] = newDist;
      }
      if (priorityQueue.findIndex(neighbor) === -1 || newDist < oldDist) {
        priorityQueue.enqueue(neighbor, newDist);
      }
    }
  }
  return dist;
}
