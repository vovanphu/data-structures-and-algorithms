export function findArticulationPoints(
  graph: Map<number, number[]>,
): boolean[] {
  const articulationPoints: boolean[] = Array(graph.size).fill(false);
  const ids: number[] = [];
  const lowLinks: number[] = [];
  const visited: boolean[] = [];
  let id = 0;
  const bfs = (start: number, parent: number) => {
    let outEdgeCount = 0;
    visited[start] = true;
    ids[start] = lowLinks[start] = ++id;
    const neighbors = graph.get(start) || [];
    for (const neighbor of neighbors) {
      if (neighbor === parent) continue;
      if (!visited[neighbor]) {
        outEdgeCount++;
        bfs(neighbor, start);
        lowLinks[start] = Math.min(lowLinks[start], lowLinks[neighbor]);
        if (ids[start] <= lowLinks[neighbor]) {
          articulationPoints[start] = true;
        }
      } else {
        lowLinks[start] = Math.min(lowLinks[start], ids[neighbor]);
      }
    }
    articulationPoints[start] = outEdgeCount > 1;
  };
  for (let i = 0; i < graph.size; i++) {
    if (!visited[i]) {
      bfs(i, i);
    }
  }
  return articulationPoints;
}

// TODO: Something wrong with outEdgeCount logic
// and i could not figure it out myself
// for now
