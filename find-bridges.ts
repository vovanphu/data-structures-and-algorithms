export function findBridges(graph: Map<number, number[]>): number[][] {
  const bridges: number[][] = [];
  const ids: number[] = [];
  const lows: number[] = [];
  const visited: boolean[] = Array(graph.size).fill(false);
  let id = 0;
  const dfs = (start: number, parent: number) => {
    if (visited[start]) return;
    visited[start] = true;
    ids[start] = lows[start] = ++id;
    const neighbors = graph.get(start) || [];
    for (const neighbor of neighbors) {
      if (neighbor === parent) continue;
      if (!visited[neighbor]) {
        dfs(neighbor, start);
        lows[start] = Math.min(lows[start], lows[neighbor]);
        if (ids[start] < lows[neighbor]) {
          bridges.push([start, neighbor]);
        }
      } else {
        lows[start] = Math.min(lows[start], ids[neighbor]);
      }
    }
  };
  for (let i = 0; i < graph.size; i++) {
    dfs(i, -1);
  }
  return bridges;
}
