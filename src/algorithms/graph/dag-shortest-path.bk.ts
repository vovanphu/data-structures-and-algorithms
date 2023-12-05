function topologicalSort(graph: Map<number, Map<number, number>>): number[] {
  const ordering: number[] = [];
  const inDegrees: number[] = new Array(graph.size).fill(0);
  const queue: number[] = [];
  for (const edges of graph.values()) {
    for (const neighbor of edges.keys()) {
      inDegrees[neighbor]++;
    }
  }
  for (let i = 0; i < inDegrees.length; i++) {
    if (inDegrees[i] === 0) {
      queue.push(i);
    }
  }
  while (queue.length > 0) {
    const vertex = queue.shift() as number;
    ordering.push(vertex);
    const edges: Map<number, number> = graph.get(vertex) || new Map();
    for (const neighbor of edges.keys()) {
      inDegrees[neighbor]--;
      if (inDegrees[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  return ordering;
}

export function dagShortestPath(
  graph: Map<number, Map<number, number>>,
  start: number,
): number[] {
  const dist: number[] = new Array(graph.size).fill(Infinity);
  const topSort = topologicalSort(graph);
  if (start < graph.size) dist[start] = 0;
  for (const vertex of topSort) {
    if (dist[vertex] === Infinity) continue;
    const edges: Map<number, number> = graph.get(vertex) || new Map();
    for (const neighbor of edges.keys()) {
      const neighborEdge = edges.get(neighbor) as number;
      dist[neighbor] = Math.min(dist[neighbor], dist[vertex] + neighborEdge);
    }
  }
  return dist;
}
