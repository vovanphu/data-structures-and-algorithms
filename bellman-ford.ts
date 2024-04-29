import { WeightedGraph } from './src/data-structures/graph/weighted-graph.class.deprecated';

export function bellmanFord(
  graph: WeightedGraph,
  startIndex: number,
): number[] {
  const dist: number[] = new Array(graph.size()).fill(Infinity);
  if (startIndex >= graph.size()) return dist;
  dist[startIndex] = 0;
  for (let i = 0; i < graph.size() - 1; i++) {
    for (let vertex = 0; vertex < graph.size(); vertex++) {
      for (const neighbor of graph.neighbors(vertex)) {
        const oldDist = dist[neighbor];
        const newDist = dist[vertex] + graph.weight(vertex, neighbor);
        dist[neighbor] = Math.min(oldDist, newDist);
      }
    }
  }
  for (let vertex = 0; vertex < graph.size(); vertex++) {
    for (const neighbor of graph.neighbors(vertex)) {
      const oldDist = dist[neighbor];
      const newDist = dist[vertex] + graph.weight(vertex, neighbor);
      if (newDist < oldDist) {
        dist[neighbor] = -Infinity;
      }
    }
  }
  return dist;
}
