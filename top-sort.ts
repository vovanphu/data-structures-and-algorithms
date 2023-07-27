export function topSortRecursive(graph: Map<number, number[]>): number[] {
  const ordering: number[] = [];
  const visited: boolean[] = new Array(graph.size);
  let rIndex = graph.size - 1;
  for (let i = 0; i < visited.length; i++) {
    if (visited[i]) continue;
    rIndex = _topSortRecursive(rIndex, i, visited, ordering, graph);
  }
  return ordering;
}

function _topSortRecursive(
  rIndex: number,
  i: number,
  visited: boolean[],
  ordering: number[],
  graph: Map<number, number[]>,
): number {
  visited[i] = true;
  const neighbors = graph.get(i) || [];
  for (const neighbor of neighbors) {
    if (visited[neighbor]) continue;
    rIndex = _topSortRecursive(rIndex, neighbor, visited, ordering, graph);
  }
  ordering[rIndex] = i;
  return rIndex - 1;
}

export function topSortKahn(graph: Map<number, number[]>): number[] {
  const ordering: number[] = [];
  const queue: number[] = [];
  const inDegrees: number[] = new Array(graph.size).fill(0);
  for (const neighbors of graph.values()) {
    for (const neighbor of neighbors) {
      inDegrees[neighbor]++;
    }
  }
  for (const inDegree of inDegrees) {
    if (inDegree === 0) queue.push(inDegree);
  }
  while (queue.length > 0) {
    const vertext = queue.shift() as number;
    ordering.push(vertext);
    const neighbors = graph.get(vertext) || [];
    for (const neighbor of neighbors) {
      inDegrees[neighbor]--;
      if (inDegrees[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  return ordering;
}
