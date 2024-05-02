import { Graph, IndexedPriorityQueue } from '@root/data-structures';

export function dijkstra(
  graph: Graph,
  startIndex: number,
): [number[], number[]] {
  // Variables used for resulting
  const dist: number[] = new Array(graph.size()).fill(Infinity);
  const prev: number[] = new Array(graph.size());

  if (startIndex < 0 || startIndex >= graph.size()) {
    return [dist, prev];
  }

  // Variables used for comparing, traversing
  const visited: boolean[] = new Array(graph.size()).fill(false);
  const priorityQueue = new IndexedPriorityQueue<number>();

  // Add starting node to the queue
  dist[startIndex] = 0;
  priorityQueue.enqueue(startIndex, 0);

  while (priorityQueue.size() > 0) {
    const [vertex, distance] = priorityQueue.dequeue() as [number, number];
    visited[vertex] = true;

    // Ignore if we already find a better route
    // this step may doesn't required since
    // indexed priority queue already overwrite
    // existing vertex when we enqueue duplicates
    if (dist[vertex] < distance) continue;

    // Loop through each neighbors to relaxing the dist
    // and add more vertices to priority queue for next traversing
    for (const neighbor of graph.neighbors(vertex)) {
      if (visited[neighbor]) continue;

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

  return [dist, prev];
}
