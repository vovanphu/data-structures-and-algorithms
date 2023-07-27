export function heldKarp(
  graph: number[][],
  start: number,
  path: number[] = [],
): number {
  const memo: number[][] = Array(1 << graph.length)
    .fill(null)
    .map(() => Array(graph.length).fill(Infinity));
  for (let end = 0; end < graph.length; end++) {
    if (end === start) continue;
    memo[(1 << start) | (1 << end)][end] = graph[start][end];
  }
  for (let subset = 0; subset < 1 << graph.length; subset++) {
    for (let j = 0; j < graph.length; j++) {
      if ((subset & (1 << j)) === 0 || j === start) continue;
      for (let k = 0; k < graph.length; k++) {
        if ((subset & (1 << k)) === 0 || k === j || k === start) continue;
        const prevSubset = subset ^ (1 << j);
        const prevDistance = memo[prevSubset][k];
        const currDistance = prevDistance + graph[k][j];
        if (currDistance < memo[subset][j]) {
          memo[subset][j] = currDistance;
        }
      }
    }
  }
  let minDistance = Infinity;
  for (let j = 0; j < graph.length; j++) {
    if (j === start) continue;
    const currDistance = memo[(1 << graph.length) - 1][j] + graph[j][start];
    if (currDistance < minDistance) {
      minDistance = currDistance;
    }
  }
  let lastIndex = start;
  let subset = (1 << graph.length) - 1;
  path.push(start);
  for (let i = 1; i < graph.length; i++) {
    let index = -1;
    for (let j = 0; j < graph.length; j++) {
      if (j === start || (subset & (1 << j)) === 0) continue;
      if (index === -1) index = j;
      const prevDist = memo[subset][index] + graph[index][lastIndex];
      const newDist = memo[subset][j] + graph[j][lastIndex];
      if (newDist < prevDist) {
        index = j;
      }
    }
    path.push(index);
    lastIndex = index;
    subset ^= 1 << index;
  }
  path.push(start);
  path.reverse();
  return minDistance;
}

/**
 * The algorithm's description and pseudocode can be found here:
 * https://en.wikipedia.org/wiki/Held%E2%80%93Karp_algorithm
 */
