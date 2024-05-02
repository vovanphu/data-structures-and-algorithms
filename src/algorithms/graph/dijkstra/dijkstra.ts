import { Graph, IndexedPriorityQueue } from '@root/data-structures';

export function dijkstra(graph: Graph, startIndex: number): number[] {
  if (startIndex < 0 || startIndex >= graph.size()) {
    throw Error('Out of graph bound');
  }

  // Variables used for comparing, traversing, resulting
  const visited: boolean[] = new Array(graph.size()).fill(false);
  const dist: number[] = new Array(graph.size()).fill(Infinity);
  const priorityQueue = new IndexedPriorityQueue<number>();
  const prev: number[] = new Array(graph.size());

  // Add starting node to the queue
  dist[startIndex] = 0;
  priorityQueue.enqueue(startIndex, 0);

  while (priorityQueue.size() > 0) {
    const [vertex, distance] = priorityQueue.dequeue() as [number, number];

    if (visited[vertex]) continue;
    visited[vertex] = true;

    // Ignore if we already find a better route
    // this step may doesn't required since
    // indexed priority queue already overwrite
    // existing vertex when we enqueue duplicates
    if (dist[vertex] < distance) continue;

    // Loop through each neighbors to relaxing the dist
    // and add more vertices to priority queue for next traversing
    for (const neighbor of graph.neighbors(vertex)) {
      const weight = graph.get(vertex, neighbor);
      const oldDist = dist[neighbor];
      const newDist = dist[vertex] + weight;

      if (newDist < oldDist) {
        dist[neighbor] = newDist;
        priorityQueue.decreaseKey(neighbor, newDist);
        prev[neighbor] = vertex;
      }
    }
  }

  return prev;
}
